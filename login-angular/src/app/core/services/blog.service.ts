import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  protected URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http
    .get(`${this.URL_API}/blog/me`);
  }
}
