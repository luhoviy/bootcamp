import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResponse, LoginCredentials, SignUpInfo } from "../models/auth.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly API_URL = "api/auth";

  constructor(private http: HttpClient) {}

  public login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  public signup(userInfo: SignUpInfo): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/signup`, userInfo);
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, null);
  }

  public refresh(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_URL}/refresh`);
  }
}
