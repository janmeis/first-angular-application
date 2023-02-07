import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedPostId = 0;

  constructor(
    private typicodeService: JsonplaceholderTypicodeComService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userId = +(this.route.snapshot.queryParamMap.get('userId') || '0');
    this.selectedPostId = +(this.route.snapshot.queryParamMap.get('selectedPostId') || '0');

    this.users$ = this.typicodeService.getUsers$().pipe(
      tap(users => {
        this.userId = users[0]?.id;
        this.posts$ = this.typicodeService.getPosts$(this.userId).pipe(
          tap(async posts => {
            this.selectedPostId = posts[0].id;
            await this.navigateWithQueryParams();
          })
        );
      })
    );
  }

  onSelectionChange(event: MatSelectChange): void {
    this.userId = event.value;
    this.posts$ = (this.userId > 0
      ? this.typicodeService.getPosts$(this.userId).pipe(
        tap(async posts => {
          this.selectedPostId = posts[0].id != 0 ? posts[0].id : 0;
          await this.navigateWithQueryParams();
        })
      )
      : of([{ id: 0 } as Post]).pipe(
        tap(async _ => {
          await this.router.navigate(['./posts'], { relativeTo: this.route.parent });
        })
      )
    );
  }

  async onPostClicked(postId: number) {
    this.selectedPostId = postId;
    await this.navigateWithQueryParams();
  }

  private async navigateWithQueryParams(): Promise<void> {
    await this.router.navigate(['./posts'], { relativeTo: this.route.parent, queryParams: { userId: this.userId, selectedPostId: this.selectedPostId }, queryParamsHandling: 'merge' });
  }
}
