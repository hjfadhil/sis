import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-collegesemester',
  templateUrl: './collegesemester.component.html',
  styleUrls: ['./collegesemester.component.css']
})
export class CollegesemesterComponent implements OnInit {

  department: any
  academicyear: any

  constructor(private dprtService: DprtService,
              private router: Router,
              private authS: AuthService,
    ) { 
      if(this.authS.user == undefined){
        this.router.navigate([''])
      }
  }

  ngOnInit(): void {
    if(this.dprtService.department){
      this.department = this.dprtService.getDepartment();
      this.academicyear = this.department.sisay
    }
  }

}
