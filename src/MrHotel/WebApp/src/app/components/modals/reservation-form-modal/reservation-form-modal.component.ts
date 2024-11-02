import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-reservation-form-modal",
  templateUrl: "./reservation-form-modal.component.html",
  styleUrls: ["./reservation-form-modal.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class ReservationFormModalComponent {
  constructor() {}
}
