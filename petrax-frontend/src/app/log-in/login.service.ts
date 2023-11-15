  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { User } from '../user/user';
  import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class LoginService {

    private API_URL = 'http://localhost:8080/api/v1/users/authentication'; // or whatever your endpoint is

    constructor(private http: HttpClient, private router:Router) { }

    loginUser(user: any) {
        return this.http.post(`${this.API_URL}/login`, user, {responseType: 'text'});
    }
    logout() {
        this.navigateOut();
        return this.http.get(`${this.API_URL}/logout`, {responseType: 'text'});
        
     }

     navigateOut(){
      this.router.navigate(['/home']);
     }
  }
