import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Subscription, switchMap, take } from 'rxjs';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ToasterNotificationsService } from '../../../shared/services/notifications/toaster-notifications.service';
import { UserCredential } from 'firebase/auth';
import { UserRole } from '../../../shared/enums/user-role';

@Component({
  selector: 'cons-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  currentStep = 'Login';

  private _tempUserCredential: UserCredential;
  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _toasterNotificationsService: ToasterNotificationsService = inject(ToasterNotificationsService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _authSubscription: Subscription | null = null;

  async ngOnInit() {
    this.initLoginForm();
    this.checkRedirect();
  }

  ngOnDestroy() {
    this._authSubscription?.unsubscribe();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onExampleError() {
    this._toasterNotificationsService.showError('Error', 'Error message');
  }

  async thirdPartyLogin(provider: string) {
    this.currentStep = 'Loading';
    this._cdr.detectChanges();

    try {
      switch (provider) {
        case 'google':
          await this._authService.signInWithGoogle();
          break;
        case 'facebook':
          await this._authService.signInWithFacebook();
          break;
        case 'github':
          await this._authService.signInWithGithub();
          break;
        default:
          return;
      }
    } catch (error) {
      this._toasterNotificationsService.showError('Error', 'Error message');
      this.currentStep = 'Login';
      this._cdr.detectChanges();
    }
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.currentStep = 'Loading';
    this._cdr.detectChanges();

    const { loginIdentity, password } = this.loginForm.value;

    this._authService.getEmailByIdentity(loginIdentity).pipe(
      switchMap((response: { email: string }) => {
        return this._authService.login({ email: response.email, password: password });
      })
    ).subscribe({
      next: (userCredential) => {
        this.handleSuccessfulLogin(userCredential);
      },
      error: (error) => {
        console.error('Email/Password Login failed:', error);
        this._toasterNotificationsService.showError('Login Failed', 'Invalid credentials or user not found.');
        this.currentStep = 'Login';
        this._cdr.detectChanges();
      }
    });
  }

  async onRoleSelected(role: UserRole) {
    if (!this._tempUserCredential) {
      this._toasterNotificationsService.showError('Error', 'User data is missing. Please try logging in again.');
      this.currentStep = 'Login';
      this._cdr.detectChanges();
      return;
    }

    this.currentStep = 'Loading';
    this._cdr.detectChanges();

    try {
      await this._authService.syncUserWithBackend(this._tempUserCredential, role);
      this._toasterNotificationsService.showSuccess('Success', 'Profile created');
      this.navigateToDashboardBasedOnRole(this._tempUserCredential.user.uid, role);
    } catch (error) {
      this._toasterNotificationsService.showError('Profile Creation Failed', 'Could not create profile. Please try again.');
      this.currentStep = 'RoleSelection';
      this._cdr.detectChanges();
    }
  }

  public isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    
    if (!control) {
      return false;
    }

    return control.invalid && (control.dirty || control.touched);
  }

  private initLoginForm() {
    this.loginForm = this._fb.group({
      loginIdentity: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  private async checkRedirect() {
    this.currentStep = 'Loading';
    this._cdr.detectChanges();
    try {
      const userCredential = await this._authService.handleRedirectResult();
      console.log('Redirect Result Credential:', userCredential);

      if (userCredential) {
        this.handleSuccessfulLogin(userCredential);
      } else {
        this._authSubscription = this._authService.currentUser$.pipe(
          take(1)
        ).subscribe(user => {
          if (user) {
            console.log('User already logged in:', user.uid);
            this.navigateToDashboardBasedOnRole(user.uid);
          } else {
            console.log('No user session found. Showing login form.');
            this.currentStep = 'Login';
            this._cdr.detectChanges();
          }
        });
      }
    } catch (error: any) {
      console.error('Error during redirect check:', error);
      this._toasterNotificationsService.showError('Login Error', 'Could not complete login. Please try again.');
      this.currentStep = 'Login';
      this._cdr.detectChanges();
    }
  }

  private handleSuccessfulLogin(userCredential: UserCredential) {
    const firebaseUid = userCredential.user.uid;
    this.currentStep = 'Loading';
    this._cdr.detectChanges();
    this._authService.checkUserExistsInBackend(firebaseUid).subscribe({
      next: (exists) => {
        if (exists) {
          this._toasterNotificationsService.showInfo('Welcome back!', 'Logged in successfully.');
          this.navigateToDashboardBasedOnRole(firebaseUid);
        } else {
          this._tempUserCredential = userCredential;
          this.currentStep = 'RoleSelection';
        }
        this._cdr.detectChanges();
      },
      error: (err) => {
        this._toasterNotificationsService.showError('Error', 'Could not verify user profile. Please try again.');
        this.currentStep = 'Login';
        this._cdr.detectChanges();
      }
    });
  }

  private navigateToDashboardBasedOnRole(firebaseUid: string, selectedRole?: UserRole) {
    const roleToUse = selectedRole;

    if (!roleToUse && !selectedRole) {
      this._router.navigate(['/navigate']);
      return;
    }

    const redirectPath = roleToUse === UserRole.Student ? '/student-dashboard' : '/coach-dashboard';
    this._router.navigate([redirectPath]);
  }

  get studentRole() {
    return UserRole.Student;
  }

  get coachRole() {
    return UserRole.Coach;
  }

  faGoogle = faGoogle;
  faGithub = faGithub;
  faFacebook = faFacebook;
}
