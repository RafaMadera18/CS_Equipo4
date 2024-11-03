import { Injectable } from "@angular/core";

import { ModalController } from "@ionic/angular/standalone";

import { ModalInfo } from "./modal-info";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { Nullable } from "@customTypes/nullable";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private readonly _modalController: ModalController) {}

  public async openModal<
    Tinput extends void,
    TOutput,
    TComponent extends BaseModalFormComponent<Tinput, TOutput>,
  >(
    info: ModalInfo<Tinput, TOutput, TComponent>,
    input?: void,
  ): Promise<Nullable<TOutput>>;
  public async openModal<
    Tinput,
    TOutput,
    TComponent extends BaseModalFormComponent<Tinput, TOutput>,
  >(
    info: ModalInfo<Tinput, TOutput, TComponent>,
    input: Tinput,
  ): Promise<Nullable<TOutput>>;
  public async openModal<
    Tinput,
    TOutput,
    TComponent extends BaseModalFormComponent<Tinput, TOutput>,
  >(
    info: ModalInfo<Tinput, TOutput, TComponent>,
    input: Tinput | void,
  ): Promise<Nullable<TOutput>> {
    const modal = await this._modalController.create({
      component: info.component,
      cssClass: info.cssClass ?? "modal",
      componentProps: { input: input },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss<TOutput>();
    return data ?? null;
  }
}
