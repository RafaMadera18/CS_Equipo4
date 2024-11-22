import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-add-reservation-modal-form",
  templateUrl: "./add-reservation-modal-form.component.html",
  styleUrls: ["./add-reservation-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class ReservationFormModalComponent {
  constructor() {}
}
