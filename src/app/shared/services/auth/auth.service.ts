import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, from, Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserRegisterModel } from '../../models/user-register-model';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings.service';
import { ConsultationsMapper } from '../../mappers/consultations-mapper';
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
  User,
  ConfirmationResult,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { Environment } from '../../../../environment';
import { UserRole } from '../../enums/user-role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // * auth endpoints
  private _apiUrlPost = '/api/auth';
  private _apiUrlGet = '/api/auth';
  private _apiUrlPut = '/api/auth';
  private _apiUrlDelete = '/api/auth';

  private _app: FirebaseApp;
  private _auth: Auth;
  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);
  private _appSettings: SettingsService = inject(SettingsService);
  private _currentUserSubject = new BehaviorSubject<User | null>(null);
  private _recaptchaVerifier: RecaptchaVerifier | undefined;

  public currentUser$: Observable<User | null> = this._currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this._currentUserSubject.value;
  }

  constructor() {
    this._app = initializeApp(Environment.firebaseConfig);
    this._auth = getAuth(this._app);

    onAuthStateChanged(this._auth, (user) => {
      this._currentUserSubject.next(user);
    });
  }

  register(formData: UserRegisterModel) {
    return from(
      createUserWithEmailAndPassword(this._auth, formData.email, formData.password)
    ).pipe(
      switchMap((userCredential) => {
        const dto = ConsultationsMapper.mapUserRegistrationModel(formData, userCredential);
        return this._http.post<User>(`${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlPost}/register`, dto);
      })
    )
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

  async syncUserWithBackend(
    userCredential: UserCredential,
    role: UserRole
  ): Promise<void> {
    const user = userCredential.user;

    const firstName = user.displayName?.split(' ')[0] || '';
    const lastName = user.displayName?.split(' ').slice(1).join(' ') || '';

    const dto = {
      firebaseUid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      role: role
    }

    const registerUrl = `${this._appSettings.currentAppSettings.serviceUrl}${this._apiUrlPost}/register`; // Use your register endpoint

    try {
      await firstValueFrom(this._http.post<any>(registerUrl, dto));
    } catch (backendError) {
      console.error('Backend sync failed: ', backendError);
      const message = (backendError as any)?.error?.message;
      throw new Error(message);
    }
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

  async getIdToken(): Promise<string | null> {
    if (this.currentUser) {
      return await this.currentUser.getIdToken();
    }

    return null;
  }

  async updateProfile(displayName: string, photoUrl: string): Promise<void> {
    if (this.currentUser) {
      const { updateProfile } = await import('firebase/auth');
      await updateProfile(this.currentUser, {
        displayName: displayName || this.currentUser.displayName,
        photoURL: photoUrl || this.currentUser.photoURL
      })
    }
  }

  handleRedirectResult(): Promise<UserCredential | null> {
    return getRedirectResult(this._auth);
  }

  get isAuthenticated(): boolean {
    return !!this._currentUserSubject.value;
  }
}
