import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[consCursorEffect]',
  standalone: false
})
export class CursorEffectDirective implements AfterViewInit, OnDestroy {
  private glowElement?: HTMLElement;
  private mouseEnterListener?: () => void;
  private mouseLeaveListener?: () => void;
  private mouseMoveListener?: (e: MouseEvent) => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.createGlowEffect();
    this.initCursorEffect();
  }

  ngOnDestroy() {
    this.removeEventListeners();
    if (this.glowElement) {
      this.renderer.removeChild(this.el.nativeElement, this.glowElement);
    }
  }

  private createGlowEffect() {
    this.glowElement = this.renderer.createElement('div');
    this.renderer.addClass(this.glowElement, 'glow-effect');
    this.renderer.appendChild(this.el.nativeElement, this.glowElement);
  }

  private initCursorEffect() {
    const menu = this.el.nativeElement;

    this.mouseEnterListener = () => {
      this.renderer.setStyle(menu, '--cursor-opacity', '1');
    };

    this.mouseLeaveListener = () => {
      this.renderer.setStyle(menu, '--cursor-opacity', '0');
      if (this.glowElement) {
        this.renderer.setStyle(this.glowElement, 'opacity', '0');
      }
    };

    this.mouseMoveListener = (e: MouseEvent) => {
      const rect = menu.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      this.renderer.setStyle(menu, '--cursor-x', percentX + '%');
      this.renderer.setStyle(menu, '--cursor-y', percentY + '%');

      if (this.glowElement) {
        this.renderer.setStyle(this.glowElement, 'left', x + 'px');
        this.renderer.setStyle(this.glowElement, 'top', y + 'px');
        this.renderer.setStyle(this.glowElement, 'opacity', '1');
        
        this.renderer.setStyle(this.glowElement, 'animation', 'none');
        setTimeout(() => {
          if (this.glowElement) {
            this.renderer.setStyle(this.glowElement, 'animation', 'pulseGlow 2s infinite');
          }
        }, 10);
      }
    };

    menu.addEventListener('mouseenter', this.mouseEnterListener);
    menu.addEventListener('mouseleave', this.mouseLeaveListener);
    menu.addEventListener('mousemove', this.mouseMoveListener);
  }

  private removeEventListeners() {
    const menu = this.el.nativeElement;

    if (this.mouseEnterListener) {
      menu.removeEventListener('mouseenter', this.mouseEnterListener);
    }
    if (this.mouseLeaveListener) {
      menu.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
    if (this.mouseMoveListener) {
      menu.removeEventListener('mousemove', this.mouseMoveListener);
    }
  }
}
