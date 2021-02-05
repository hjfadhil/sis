import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.css']
})
export class Main2Component implements OnInit {

  constructor(private router:Router) { 

  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login'])
  }

}
