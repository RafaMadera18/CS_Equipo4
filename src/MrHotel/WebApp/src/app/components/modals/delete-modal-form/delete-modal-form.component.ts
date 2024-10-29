import { Component, Input } from "@angular/core";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ModalInfo } from "@services/modal/modal-info";

export type DeleteModalInput = {
  message: string;
};

export type DeleteModalOutput = {
  state: boolean;
};

@Component({
  selector: "app-delete-modal-form",
  templateUrl: "./delete-modal-form.component.html",
  styleUrls: ["./delete-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class DeleteModalFormComponent extends BaseModalFormComponent<
  DeleteModalInput,
  DeleteModalOutput
> {
  protected state: boolean = true;

  public onSubmit() {
    this.submitModal({
      state: this.state,
    });
  }
}

export const deleteModal: ModalInfo<
  DeleteModalInput,
  DeleteModalOutput,
  DeleteModalFormComponent
> = {
  component: DeleteModalFormComponent,
};