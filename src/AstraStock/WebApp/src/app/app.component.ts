import {
  Component,
  ElementRef,
  effect,
  signal,
  viewChild,
} from "@angular/core";

import { addIcons } from "ionicons";
import {
  chatbubbleEllipsesOutline,
  personAddOutline,
  reorderThreeOutline,
} from "ionicons/icons";

import {
  IonTitle,
  IonButton,
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonApp,
} from "@ionic/angular/standalone";

import { TabButtonComponent } from "@components/tab-button/tab-button.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    IonApp,
    IonLabel,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonIcon,
    IonButton,
    IonTitle,
    TabButtonComponent,
  ],
})
export class AppComponent {
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
