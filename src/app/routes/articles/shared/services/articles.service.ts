import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Article } from "../models/article.model";

@Injectable({
  providedIn: "root"
})
export class ArticlesService {
  private readonly API_URL = "api/articles";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.API_URL);
  }
}
