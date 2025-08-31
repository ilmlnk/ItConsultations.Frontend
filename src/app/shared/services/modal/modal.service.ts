export interface ModalConfig {
  id?: string;
  data?: any;
  closable?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventCloseOnDirtyForm?: boolean;
}

export interface ModalRef {
  id: string;
  isOpen: boolean;
  close: (result?: any) => void;
  dismiss: (reason?: any) => void;
  result: Promise<any>;
}

export interface ModalData {
  modalRef: ModalRef;
  [key: string]: any;
}

import { ApplicationRef, createComponent, EmbeddedViewRef, EnvironmentInjector, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalWindowComponent } from '../../components/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals = new Map<string, any>();
  private modalStack: string[] = [];

  private modalStateSubject = new BehaviorSubject<ModalRef[]>([]);

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<T>(component: any, config: ModalConfig = {}): ModalRef {
    const modalId = config.id || this.generateId();
    
    if (this.modals.has(modalId)) {
      return this.modals.get(modalId).modalRef;
    }

    const resultSubject = new Subject<any>();
    
    const modalRef: ModalRef = {
      id: modalId,
      isOpen: true,
      close: (result?: any) => this.close(modalId, result),
      dismiss: (reason?: any) => this.dismiss(modalId, reason),
      result: resultSubject.asObservable().toPromise()
    };

    const componentRef = createComponent(component, {
      environmentInjector: this.injector,
      hostElement: document.body
    });

    if (componentRef.instance) {
      Object.assign(componentRef.instance, {
        modalRef,
        ...config.data
      });

      if (typeof (componentRef.instance as ModalWindowComponent).showWindow === 'function') {
        (componentRef.instance as ModalWindowComponent).showWindow();
      } else {
        (componentRef.instance as ModalWindowComponent).isOpen = true;
      }
    }

    if ((componentRef.instance as ModalWindowComponent).close) {
      (componentRef.instance as ModalWindowComponent).close.subscribe(() => {
        this.close(modalId);
      });
    }

    this.modals.set(modalId, {
      componentRef,
      resultSubject,
      modalRef,
      config
    });
    
    this.modalStack.push(modalId);
    this.appRef.attachView(componentRef.hostView);
    this.updateModalState();
    
    return modalRef;
  }

  isModalOpen(modalId: string): boolean {
    return this.modals.has(modalId);
  }

  getActiveModals(): string[] {
    return [...this.modalStack];
  }

  closeAll() {
    [...this.modalStack].forEach(id => this.close(id));
  }

  close(modalId: string, result?: any) {
    const modal = this.modals.get(modalId);
    if (modal) {
      const instance = modal.componentRef.instance;
      
      if (typeof instance.hideWindow === 'function') {
        instance.hideWindow();
      } else {
        instance.isOpen = false;
      }

      modal.resultSubject.next(result);
      modal.resultSubject.complete();
      
      setTimeout(() => {
        this.destroyModal(modalId);
      }, 300);
    }
  }

  dismiss(modalId: string, reason?: any) {
    const modal = this.modals.get(modalId);
    if (modal) {
      const instance = modal.componentRef.instance;
      
      if (typeof instance.hideWindow === 'function') {
        instance.hideWindow();
      } else {
        instance.isOpen = false;
      }

      modal.resultSubject.error(reason || 'dismissed');
      
      setTimeout(() => {
        this.destroyModal(modalId);
      }, 300);
    }
  }

  private destroyModal(modalId: string) {
    const modal = this.modals.get(modalId);
    if (modal) {
      this.appRef.detachView(modal.componentRef.hostView);
      modal.componentRef.destroy();
      
      this.modals.delete(modalId);
      const stackIndex = this.modalStack.indexOf(modalId);
      if (stackIndex > -1) {
        this.modalStack.splice(stackIndex, 1);
      }
      
      this.updateModalState();
    }
  }

  private updateModalState() {
    const state = Array.from(this.modals.values()).map(modal => ({
      ...modal.modalRef,
      isOpen: modal.modalRef.isOpen
    }));
    this.modalStateSubject.next(state);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
