import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of, tap } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';
import { JsonplaceholderTypicodeComService } from '../services/jsonplaceholder-typicode-com.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  users$: Observable<User[]> = of([]);
  userId = 0;

  constructor(
    private typicodeService: JsonplaceholderTypicodeComService
  ) { }

  ngOnInit(): void {
    this.users$ = this.typicodeService.getUsers$().pipe(
      tap(users => {
        this.userId = users[0]?.id;
        this.posts$ = this.typicodeService.getPosts$(this.userId);
      })
    );
  }

  onSelectionChange(event: MatSelectChange): void {
    this.userId = event.value;
    this.posts$ = this.userId > 0
      ? this.typicodeService.getPosts$(this.userId)
      : of([{id: 0} as Post]);
  }
}
