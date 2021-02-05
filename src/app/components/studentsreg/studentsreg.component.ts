import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app'

@Component({
  selector: 'app-studentsreg',
  templateUrl: './studentsreg.component.html',
  styleUrls: ['./studentsreg.component.css']
})
export class StudentsregComponent implements OnInit {

  auth = firebase.auth()

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.signOut();
  }

}
