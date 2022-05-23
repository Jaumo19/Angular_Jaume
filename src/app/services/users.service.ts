import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../types/user.interface";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {}

    getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>('http://localhost:3000/users')
    }

    removeUsers(id: string): Observable<{}>{
        let url = 'http://localhost:3000/users/';
        return this.http.delete(url + id);
    }

    addUsers(name: string, age: number): Observable<UserInterface> {
        const user = {
            name,
            age
        }
        return this.http.post<UserInterface>('http://localhost:3000/users', user)
    }
    editUsers(id: string, name: string, age: number): Observable<UserInterface>{
      let url = 'http://localhost:3000/users/';
      let usuarioEditar = url + id;
      const user = {
        name,
        age
      }
      return this.http.patch<UserInterface>(usuarioEditar, user)
    }
}
