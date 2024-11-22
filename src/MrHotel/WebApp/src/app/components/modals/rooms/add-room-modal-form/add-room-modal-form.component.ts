import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModalInfo } from "@services/modal/modal-info";
import { BaseModalFormComponent } from "../../modal-base-form.component";

export type AddRoomModalOutput = {
  name: string;
};

@Component({
  selector: "app-add-room-modal-form",
  templateUrl: "./add-room-modal-form.component.html",
  styleUrls: ["./add-room-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddRoomModalFormComponent extends BaseModalFormComponent<
  void,
  AddRoomModalOutput
> {
  private _name: string = "";

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  onSubmit(): void {
    this.submitModal({ name: this.name });
  }
}

export const addRoomModal: ModalInfo<
  void,
  AddRoomModalOutput,
  AddRoomModalFormComponent
> = {
  component: AddRoomModalFormComponent,
};
