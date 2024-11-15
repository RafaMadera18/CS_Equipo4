import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { Observable } from "rxjs";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.page.html",
  styleUrls: ["./inventory.page.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class InventoryPage {

}
