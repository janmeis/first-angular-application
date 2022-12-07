import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';
import { ApiBaseService } from './api-base.service';

/// <see cref="https://jsonplaceholder.typicode.com" />
@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderTypicodeComService extends ApiBaseService {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  getUsers$ = (): Observable<User[]> => this.get$<User[]>('users').pipe(
    map(users => users.map(u => ({
      id: u.id,
      name: u.name
    } as User)))
  )

  getPosts$ = (userId: number): Observable<Post[]> => this.get$<Post[]>('posts', { 'userId': userId }).pipe(
    delay(1000)
  )
}
