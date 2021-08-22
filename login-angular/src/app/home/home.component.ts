import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { BlogService } from '../core/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs: any;

  constructor(private authService: AuthService, 
    private blogService: BlogService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe((blog) => this.blogs = blog);
  }
}
