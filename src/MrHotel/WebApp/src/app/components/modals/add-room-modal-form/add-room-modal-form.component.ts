import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModalInfo } from "@services/modal/modal-info";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { Nullable } from "@customTypes/nullable";

export type AddRoomModalData = {
  name: Nullable<string>;
};

@Component({
  selector: "app-add-room-modal-form",
  templateUrl: "./add-room-modal-form.component.html",
  styleUrls: ["./add-room-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddRoomModalFormComponent extends BaseModalFormComponent<AddRoomModalData> {
  protected name: string = "";

  onSubmit() {
    this.dismissModal({ name: this.name });
  }
}

export const addRoomModal: ModalInfo<
  AddRoomModalData,
  AddRoomModalFormComponent
> = {
  component: AddRoomModalFormComponent,
  cssClass: "add-room-modal",
};
