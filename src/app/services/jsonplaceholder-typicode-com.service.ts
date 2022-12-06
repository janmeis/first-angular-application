import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';

/// <see cref="https://jsonplaceholder.typicode.com" />
@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderTypicodeComService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers$ = (): Observable<User[]> => this.get$<User[]>('users').pipe(
    map(users => users.map(u => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email
    } as User)))
  )

  getPosts$ = (userId: number): Observable<Post[]> => this.get$<Post[]>('posts', { 'userId': userId }).pipe(
    delay(1000)
  )

  private get$<T>(url: string, args: any = null): Observable<T> {
    return this.http.get<T>(this.getUrl(url, args), this.getOptions()).pipe(
      catchError((err, caught) => {
        console.log(err);
        return caught;
      })
    );
  }

  private getUrl(url: string, args: any): string {
    let resUrl = `/api/${url}`;
    resUrl = (resUrl).replace('//', '/');  // just in case
    if (args) {
      const queryArgs = Object.keys(args).map(k => `${k}=${args[k]}`);
      return `${resUrl}?${queryArgs.join('&')}`;
    }

    return resUrl;
  }

  private getOptions(): { headers: { [header: string]: string } } {
    const options = { headers: { 'Content-type': 'application/json; charset=UTF-8' } };
    return options;
  }
}
