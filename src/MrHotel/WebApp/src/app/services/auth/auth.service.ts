import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { catchError, Observable, of } from "rxjs";

import { LoginRequest, RegisterRequest, AdminRegisterRequest, UserInfoResponse } from "./";
import { Nullable } from "@customTypes/.";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  public registerAdmin(request: AdminRegisterRequest): Observable<void> {
    return this.http.post<void>(this.getFullPath("register-admin"), request);
  }

  public registerUser(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(this.getFullPath("register"), request);
  }

  public adminRegisterStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.getFullPath("admin-register-status"));
  }

  public login(request: LoginRequest): Observable<void> {
    return this.http.post<void>(this.getFullPath("login"), request);
  }

  public userInfo(): Observable<Nullable<UserInfoResponse>> {
    return this.http.get<UserInfoResponse>(this.getFullPath("manage/info")).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  private getFullPath(path: string): string {
    return `api/account/${path}`;
  }
}
