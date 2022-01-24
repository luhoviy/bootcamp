import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from "../../../../shared/models/comment.model";

@Injectable({
  providedIn: "root"
})
export class ArticleCommentsService {
  private readonly API_URL = "api/comments";

  constructor(private http: HttpClient) {}

  add(text: string, articleID: string): Observable<Comment> {
    return this.http.post<Comment>(this.API_URL, { text, articleID });
  }

  update(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.API_URL, comment);
  }

  delete(id: string): Observable<void> {
    const params = new HttpParams().set("commentID", id);
    return this.http.delete<void>(this.API_URL, { params });
  }
}
