import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, Observable, of, switchMap, tap, throwError, map, retry } from 'rxjs';
import { Router } from '@angular/router';
import { UserEntity } from '../../models/model/user-entity.model';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  UserCredential,
  onAuthStateChanged,
  RecaptchaVerifier,
  User as FirebaseUser,
  ConfirmationResult,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  signInWithRedirect,
  getRedirectResult,
  UserProfile,
  getIdToken,
  deleteUser,
  User,
  updateProfile
} from 'firebase/auth';
import { Environment } from '../../../../environment';
import { UserRole } from '../../enums/user-role.enum';
import { ToasterNotificationsService } from '../notifications/toaster-notifications.service';
import { UserProfileResponse } from '../../models/dto/user-profile-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // * auth endpoints
  private _apiUrlPost = '/api/auth';
  private _apiUrlGet = '/api/auth';

  private _app: FirebaseApp;
  private _auth: Auth;

  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);
  private _appSettings: SettingsService = inject(SettingsService);
  private _toasterNotificationService = inject(ToasterNotificationsService);

  private _currentUserSubject = new BehaviorSubject<FirebaseUser | null>(null);
  private _userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  private _recaptchaVerifier: RecaptchaVerifier | undefined;

  public currentUser$: Observable<FirebaseUser | null> = this._currentUserSubject.asObservable();
  public userProfile$: Observable<any | null> = this._userProfileSubject.asObservable();

  constructor() {
    this._app = initializeApp(Environment.firebaseConfig);
    this._auth = getAuth(this._app);

    onAuthStateChanged(this._auth, (user) => {
      this._currentUserSubject.next(user);

      if (user) {
        this.fetchAndSetUserProfile(user.uid).subscribe({
          next: (profile) => {
            if (profile) {
              this._userProfileSubject.next(profile);
            } else {
              this._userProfileSubject.next(null);
            }
          },
          error: (err) => {
            this._userProfileSubject.next(null);
          }
        });
      } else {
        this._userProfileSubject.next(null);
      }
    });
  }

  register(formData: UserEntity) {
    let firebaseUser: User | null = null;

    return from(
      createUserWithEmailAndPassword(this._auth, formData.email, formData.password)
    ).pipe(
      switchMap((userCredential) => {
        firebaseUser = userCredential.user;

        return from(updateProfile(firebaseUser, {
          displayName: `${formData.firstName} ${formData.lastName}`,
          photoURL: formData.photoUrl || null
        })).pipe(
          map(() => userCredential)
        );
      }),
      switchMap((userCredential) => {
        const user = userCredential.user;

        return from(user.getIdToken())
          .pipe(
            map((token: string) => {
              return { user, token };
            })
          );
      }),
      switchMap(({ user }) => {
        const registerDto = {
          ...formData,
          firebaseUid: user.uid
        };

        return this._http.post<any>(
          `${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlPost}/register`,
          registerDto
        ).pipe(
          catchError((error) => {
            if (firebaseUser) {
              return from(deleteUser(firebaseUser)).pipe(
                switchMap(() => {
                  this._toasterNotificationService.showError('Fail', 'Registration failed');
                  return throwError(() => error);
                }),
                catchError(() => {
                  this._toasterNotificationService.showError('Fail', 'Registration failed');
                  return throwError(() => error);
                })
              );
            }
            this._toasterNotificationService.showError('Fail', 'Registration failed');
            return throwError(() => error);
          })
        )
      })
    );
  }

  login(creds: { email: string; password: string }): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(
        this._auth,
        creds.email,
        creds.password
      )
    );
  }

  setupRecaptcha(elementId: string) {
    if (this._recaptchaVerifier) {
      this._recaptchaVerifier.clear();
    }
    this._recaptchaVerifier = new RecaptchaVerifier(this._auth, elementId, {
      'size': 'invisible',
      'callback': () => { },
      'expired-callback': () => { }
    });
  }

  getEmailByIdentity(identity: string): Observable<{ email: string }> {
    const url = `${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlGet}/get-email-by-identity?identity=${identity}`;
    return this._http.get<{ email: string }>(url);
  }

  checkUserExistsInBackend(firebaseUid: string): Observable<boolean> {
    const url = `${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlGet}/exists/${firebaseUid}`;
    return this._http.get<any>(url).pipe(
      switchMap(() => of(true)),
      catchError(error => {
        if (error.status === 404) {
          return of(false);
        }
        return throwError(() => error);
      })
    )
  }

  syncUserWithBackend(firebaseUser: FirebaseUser, role: UserRole): Observable<UserProfile> {
    const names = firebaseUser.displayName ? firebaseUser.displayName.split(' ') : ['User', ''];

    const registerDto = {
      email: firebaseUser.email,
      firstName: names[0],
      lastName: names.length > 1 ? names.slice(1).join(' ') : '',
      firebaseUid: firebaseUser.uid,
      role: role
    };

    return this._http.post<UserProfile>(
      `${this._appSettings.serviceUrl}/api/auth/register`,
      registerDto
    ).pipe(
      tap(profile => this._userProfileSubject.next(profile))
    );
  }

  handleRedirectResult(): Promise<UserCredential | null> {
    return getRedirectResult(this._auth);
  }

  getUserRole(uid: string) {
    if (!uid) {
      return of(null);
    }

    return this._http.get<UserProfileResponse>(
      `${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlGet}/users/${uid}`).pipe(
        retry(2),
        map((response: UserProfileResponse) => {
          const role = response.role as UserRole;

          if (Object.values(UserRole).includes(role)) {
            return role;
          }

          return null;
        }),
        catchError(() => of(null))
      )
  }

  async signInWithEmail(email: string, password: string): Promise<UserCredential> {
    const credential = await signInWithEmailAndPassword(this._auth, email, password);
    return credential;
  }

  async sendSmsCode(phoneNumber: string): Promise<ConfirmationResult> {
    const confirmationResult = await signInWithPhoneNumber(
      this._auth,
      phoneNumber,
      this._recaptchaVerifier
    );
    return confirmationResult;
  }

  async signInWithPhone(phoneNumber: string): Promise<ConfirmationResult> {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    if (!this._recaptchaVerifier) {
      this.setupRecaptcha('recaptcha-container');
    }

    const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(
      this._auth,
      formattedPhone,
      this._recaptchaVerifier
    );

    return confirmationResult;
  }

  async verifyPhoneCode(confirmationResult: ConfirmationResult, code: string): Promise<UserCredential> {
    const credential = await confirmationResult.confirm(code);
    return credential;
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    await signInWithRedirect(this._auth, provider);
  }

  async signInWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    provider.addScope('email');

    const credential = await signInWithRedirect(this._auth, provider);
    return credential;
  }

  async signInWithGithub(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();
    provider.addScope('user:email');

    const credential = await signInWithRedirect(this._auth, provider);
    return credential;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this._auth, email);
  }

  async signOut(): Promise<void> {
    await this._auth.signOut();
    this._router.navigate(['/']);
  }

  private fetchAndSetUserProfile(firebaseUid: string): Observable<UserProfile | null> {
    const url = `${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlGet}/profile/${firebaseUid}`;

    return this._http.get<UserProfile>(url).pipe(
      tap(profile => {
        this._userProfileSubject.next(profile);
      }),
      catchError(error => {
        this._userProfileSubject.next(null);
        return of(null);
      })
    );
  }

  get isAuthenticated(): boolean {
    return !!this._currentUserSubject.value;
  }

  get currentUserProfile(): UserProfile | null {
    return this._userProfileSubject.value;
  }

  get apiToken(): Observable<string | null> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return from(getIdToken(user));
        }

        return of(null);
      })
    );
  }
}
