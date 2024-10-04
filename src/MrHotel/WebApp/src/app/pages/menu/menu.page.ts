import {
  Component,
  effect,
  ElementRef,
  Signal,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonButton,
  IonIcon,
} from "@ionic/angular/standalone";

import { addIcons } from "ionicons";
import {
  reorderThreeOutline,
  bedOutline,
  calendarOutline,
} from "ionicons/icons";

import { TabButtonComponent } from "@components/tab-button";

import { AuthService, UserInfoResponse } from "@services/auth";
import { Nullable } from "@customTypes/nullable";

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
  protected readonly userInfo: Signal<Nullable<UserInfoResponse>>;

  protected readonly sidebar =
    viewChild.required<ElementRef<HTMLDivElement>>("sidebar");

  protected readonly sidebarExpanded = signal<boolean>(false);

  protected readonly tabs = viewChild.required(IonTabs);

  constructor(authService: AuthService) {
    addIcons({ reorderThreeOutline, bedOutline, calendarOutline });

    this.userInfo = toSignal(authService.userInfo(), { initialValue: null });

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
