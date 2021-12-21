import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.API_URL, article);
  }

  deleteOne(id: string): Observable<Article> {
    return this.http.delete<Article>(`${this.API_URL}/${id}`);
  }

  toggleArticleLike(like: boolean, queryParams: { articleID: string; userID: string }): Observable<Article> {
    const params = new HttpParams().set("articleID", queryParams.articleID).set("userID", queryParams.userID);
    return this.http.patch<Article>(`${this.API_URL}/${like ? "like" : "dislike"}`, null, { params });
  }
}
