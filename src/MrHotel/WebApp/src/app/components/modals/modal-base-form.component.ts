import { Directive } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Directive()
export abstract class BaseModalFormComponent<Tinput, TOutput> {
  public readonly input!: Tinput;

  constructor(protected readonly modalController: ModalController) {}

  public submitModal(output: TOutput): void {
    this.modalController.dismiss(output);
  }

  public dismissModal(): void {
    this.modalController.dismiss(null);
  }
}
