import { Directive } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Directive()
export abstract class BaseModalFormComponent {
  constructor(protected readonly modalController: ModalController) {}

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }
}
