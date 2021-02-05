import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-studentsids',
  templateUrl: './studentsids.component.html',
  styleUrls: ['./studentsids.component.css']
})
export class StudentsidsComponent implements OnInit {

  department: any
  academicyear: any

  constructor(private dprtS: DprtService,
    private authS: AuthService,
    private router: Router,) {
      if(!this.authS.user){
        this.router.navigate(['/collegeadmin'])
      }
  }

  ngOnInit(){
    if(this.dprtS.department){
      this.department = this.dprtS.department
      this.academicyear = this.department.sisay
    }
  }
}