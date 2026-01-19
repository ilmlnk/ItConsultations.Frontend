import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'cons-landing-header',
  standalone: false,
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss'
})
export class LandingHeaderComponent implements OnInit {
    @ViewChild('op') op!: OverlayPanel;
    @ViewChild('userMenu') userMenu!: Menu;

    useCases: any[] = [];
    isAuthorized: boolean = false;
    userAvatar: string = 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
    userName: string = 'Amy Elsner';

    private hideTimeout: any;
    private _authService = inject(AuthService);

    constructor() {}

    ngOnInit() {
        this.isAuthorized = this._authService.isAuthenticated;
    }

    @HostListener('window:scroll')
    onWindowScroll() {
        this.op?.hide();
        this.userMenu?.hide();
    }

    showOverlay(event: Event) {
        this.clearHideTimeout();
        this.op.show(event);
    }

    hideOverlay() {
        this.hideTimeout = setTimeout(() => {
            this.op.hide();
        }, 150);
    }

    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
}
