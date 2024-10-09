import { Injectable } from "@angular/core";

import { ModalController } from "@ionic/angular/standalone";

import { ModalInfo } from "./modal-info";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private readonly modalController: ModalController) {}

  public async openModal<
    TTData,
    TComponent extends BaseModalFormComponent<TTData>,
  >(info: ModalInfo<TTData, TComponent>): Promise<TTData> {
    const modal = await this.modalController.create({
      component: info.component,
      cssClass: info.cssClass,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss<TTData>();
    return data!;
  }
}
