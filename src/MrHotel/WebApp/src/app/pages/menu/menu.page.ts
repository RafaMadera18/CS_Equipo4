import {
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonButton,
  IonIcon,
} from "@ionic/angular/standalone";

import { TabButtonComponent } from "@components/tab-button";

import { addIcons } from "ionicons";
import {
  chatbubbleEllipsesOutline,
  personAddOutline,
  reorderThreeOutline,
} from "ionicons/icons";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonTabs,
    TabButtonComponent,
    CommonModule,
    FormsModule,
  ],
})
export class MenuPage {
  protected readonly sidebar =
    viewChild.required<ElementRef<HTMLDivElement>>("sidebar");

  protected readonly sidebarExpanded = signal<boolean>(false);

  protected readonly tabs = viewChild.required(IonTabs);

  constructor() {
    addIcons({
      reorderThreeOutline,
      chatbubbleEllipsesOutline,
      personAddOutline,
    });

    effect(() => {
      this.sidebar().nativeElement.classList.toggle(
        "expanded",
        this.sidebarExpanded(),
      );
    });
  }

  protected onTabClick(tab: string): void {
    this.tabs().select(tab);
  }
}
