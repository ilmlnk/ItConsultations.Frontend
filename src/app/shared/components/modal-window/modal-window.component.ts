import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  standalone: false,
  
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  protected _isOpen = false;
  protected _isLoading = false;

  constructor() {}

  ngOnInit() {
    this.initializeModal();
  }

  ngOnDestroy() {
    this.cleanupModal();
  }

  public showWindow(): void {
    this._isOpen = true;
    this.isOpen = true;
    this.onModalOpen();
    this.modalOpened.emit();
  }

  public hideWindow(): void {
    this._isOpen = false;
    this.isOpen = false;
    this.onModalClose();
    this.modalClosed.emit();
  }

  get isModalOpen(): boolean {
    return this._isOpen;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  public onOverlayClick(): void {
    if (this.canCloseOnOverlayClick()) {
      this.close.emit();
      this.hideWindow();
    }
  }

  public toggleWindow(): void {
    if (this._isOpen) {
      this.hideWindow();
    } else {
      this.showWindow();
    }
  }

  public onModalClick(event: Event): void {
    event.stopPropagation();
  }

  public onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.canCloseOnEscape()) {
      this.close.emit();
      this.hideWindow();
    }
  }

  protected onModalOpen(): void {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  protected onModalClose(): void {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  protected setLoading(loading: boolean): void {
    this._isLoading = loading;
  }

  protected initializeModal(): void {};
  protected cleanupModal(): void {};

  protected canCloseOnOverlayClick(): boolean {
    return true;
  }

  protected canCloseOnEscape(): boolean {
    return true;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.onEscapeKey(event);
  }
}
