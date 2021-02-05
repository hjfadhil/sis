import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth = firebase.auth();

  constructor(private router: Router) { 
    this.router.navigate(['/collegadmin'])
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/main'])
  }

  contin(){
    this.router.navigate(['/collegeadmin'])
  }

}
