import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';
import { JsonplaceholderTypicodeComService } from '../services/jsonplaceholder-typicode-com.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  private readonly userId = 1;

  constructor(
    private typicodeService: JsonplaceholderTypicodeComService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.typicodeService.getPosts$(this.userId);
  }
}
