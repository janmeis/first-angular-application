import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.scss']
})
export class UsersPostComponent {
  @Input() post!: Post;
  @Input() selectedPostId!: number;
  @Output() postClicked = new EventEmitter<number>();
}
