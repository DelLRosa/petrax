import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from '../log-in/login.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  onHomePage: boolean;
  onAboutPage: boolean;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen=!this.isMenuOpen;
  }

  constructor(private router: Router, private loginService: LoginService, private ngZone: NgZone) {}

  ngOnInit(): void {
 this.router.events.pipe(
     filter(event => event instanceof NavigationEnd)
   ).subscribe((event: NavigationEnd) => {
    this.ngZone.run(() => {
      this.onHomePage = event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/about';

    });
   });
 }

 logout(){
  this.loginService.logout();
 }
 }
