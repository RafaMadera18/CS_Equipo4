import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";
import { IonicModule } from "@ionic/angular";
import { ModalInfo } from "@services/modal/modal-info";
import { ReservationInfo } from "@services/reservation-manager/data";

@Component({
  selector: "app-check-out-modal-form",
  templateUrl: "./check-out-modal-form.component.html",
  styleUrls: ["./check-out-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CheckOutModalFormComponent extends BaseModalFormComponent<
  ReservationInfo,
  boolean
> {
  public override onSubmit(): void {
    this.submitModal(true);
  }
}

export const checkOutModal: ModalInfo<
  ReservationInfo,
  boolean,
  CheckOutModalFormComponent
> = {
  component: CheckOutModalFormComponent,
};
