import { Component, Input } from "@angular/core";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ModalInfo } from "@services/modal/modal-info";

export type DeleteModalData = {
  state: boolean;
  message: string;
};

@Component({
  selector: "app-delete-modal-form",
  templateUrl: "./delete-modal-form.component.html",
  styleUrls: ["./delete-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class DeleteModalFormComponent extends BaseModalFormComponent<DeleteModalData> {
  protected state: boolean = true;

  @Input({ required: true }) message!: string;

  public onSubmit() {
    this.submitModal({
      state: this.state,
      message: "",
    });
  }
}

export const deleteModal: ModalInfo<DeleteModalData, DeleteModalFormComponent> =
  {
    component: DeleteModalFormComponent,
  };
