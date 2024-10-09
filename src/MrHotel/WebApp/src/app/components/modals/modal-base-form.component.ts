import { Directive } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Directive()
export abstract class BaseModalFormComponent<TData> {
  constructor(protected readonly modalController: ModalController) {}

  public dismissModal(data: TData): void {
    this.modalController.dismiss(data);
  }
}
