import { Component } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { BaseModalFormComponent } from "../modal-base-form-component";

@Component({
  selector: "app-add-room-modal-form",
  templateUrl: "./add-room-modal-form.component.html",
  styleUrls: ["./add-room-modal-form.component.scss"],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddRoomModalFormComponent extends BaseModalFormComponent {
  name: string = "";

  onSubmit() {
    this.dismissModal({ name: this.name }); // Cierra el modal después de enviar
  }
}
