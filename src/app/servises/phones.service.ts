import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class PhonesService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponce) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        })
      )
  }
}
