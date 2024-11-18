import { Component } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalFormComponent } from "../modal-base-form.component";
import { ModalInfo } from "@services/modal/modal-info";


@Component({
  selector: 'app-add-purchase-report-modal-form',
  templateUrl: './add-purchase-report-modal-form.component.html',
  styleUrls: ['./add-purchase-report-modal-form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddPurchaseReportModalFormComponent {
acceptOnlyNumbers($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}

  constructor() { }


}
