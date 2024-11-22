import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { catchError, Observable, of } from "rxjs";

import {
  LoginRequest,
  RegisterRequest,
  AdminRegisterRequest,
  UserInfoResponse,
} from "./";
import { Nullable } from "@customTypes/.";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private readonly _httpClient: HttpClient) {}

  public registerAdmin(request: AdminRegisterRequest): Observable<void> {
    return this._httpClient.post<void>(
      this.getApiPath("register-admin"),
      request,
    );
  }

  public registerUser(request: RegisterRequest): Observable<void> {
    return this._httpClient.post<void>(this.getApiPath("register"), request);
  }

  public adminRegisterStatus(): Observable<boolean> {
    return this._httpClient.get<boolean>(
      this.getApiPath("admin-register-status"),
    );
  }

  public login(request: LoginRequest): Observable<void> {
    return this._httpClient.post<void>(this.getApiPath("login"), request);
  }

  public logout(): Observable<void> {
    return this._httpClient.post<void>(this.getApiPath("logout"), {});
  }

  public userInfo(): Observable<Nullable<UserInfoResponse>> {
    return this._httpClient
      .get<UserInfoResponse>(this.getApiPath("manage/info"))
      .pipe(
        catchError(() => {
          return of(null);
        }),
      );
  }

  private getApiPath(path: string): string {
    return `api/account/${path}`;
  }
}
