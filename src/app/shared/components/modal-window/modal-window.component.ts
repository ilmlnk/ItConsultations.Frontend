import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalRef } from '../../services/modal/modal.service';

@Component({
  selector: 'cons-modal-window',
  standalone: false,
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.8) translateY(-20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('void => *', [
        animate('300ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('* => void', [
        animate('200ms cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ])
  ]
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() modalRef?: ModalRef;

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

  @HostListener('document:keydown', ['$event'])
  public onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.canCloseOnEscape() && this._isOpen) {
      this.handleClose();
    }
  }

  public onOverlayClick(): void {
    if (this.canCloseOnOverlayClick()) {
      this.handleClose();
    }
  }

  public toggleWindow(): void {
    if (this._isOpen) {
      this.hideWindow();
    } else {
      this.showWindow();
    }
  }

  protected handleClose(): void {
    if (this.modalRef) {
      this.modalRef.dismiss('user-action');
    } else {
      this.close.emit();
      this.hideWindow();
    }
  }

  public onModalClick(event: Event): void {
    event.stopPropagation();
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
