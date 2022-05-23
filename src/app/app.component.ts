import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserInterface } from 'src/app/types/user.interface';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  users: UserInterface[] = [];

  userData = {
    nombre: "",
    edad: 0
  }

  userEditar = {
    id: "",
    nombre: "",
    edad: 0
  }

  constructor(private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    this.usersService.getUsers().subscribe((users: any[]) => {
      console.log('res', users)
      this.users = users
    })
  }

  removeUsers(id: string): void{
    this.usersService.removeUsers(id).subscribe(() => {
      console.log('deleted from backend')
      this.users =this.users.filter(user => user.id !== id)
    })
  }


  addUser(): void {
    this.usersService.addUsers(this.userData.nombre, this.userData.edad).subscribe(newUser => {
      console.log('newUser', newUser)
      this.users.push(newUser)
    })
  }

  editUser(): void{
    this.usersService.editUsers(this.userEditar.id, this.userEditar.nombre, this.userEditar.edad).subscribe(() => {
      console.log('editarUser')
      this.users = this.users.filter(user => user.id == this.userEditar.id)
      window.location.reload();
    })
  }
}


