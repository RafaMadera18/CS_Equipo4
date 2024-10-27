import { Component } from "@angular/core";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ModalInfo } from "@services/modal/modal-info";

export type DeleteRoomModalData = {
  state: boolean;
};

@Component({
  selector: "app-delete-room-modal-form",
  templateUrl: "./delete-room-modal-form.component.html",
  styleUrls: ["./delete-room-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class DeleteRoomModalFormComponent extends BaseModalFormComponent<DeleteRoomModalData> {
  protected state: boolean = true;

  public onSubmit() {
    this.submitModal({ state: this.state });
  }
}

export const deleteRoomModal: ModalInfo<
  DeleteRoomModalData,
  DeleteRoomModalFormComponent
> = {
  component: DeleteRoomModalFormComponent,
};
