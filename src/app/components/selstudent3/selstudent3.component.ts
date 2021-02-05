import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { acch, deg, gender, yesno, trial, AcademicYears, Studies, Governates, Pripranches } from 'src/app/arrays';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-selstudent3',
  templateUrl: './selstudent3.component.html',
  styleUrls: ['./selstudent3.component.css']
})
export class Selstudent3Component implements OnInit {

  db = firebase.firestore()
  student: any
  yesno = yesno
  trial = trial
  governates = Governates
  academicyears = AcademicYears
  acch = acch
  dpertmentid
  universityRef
  departments
  pripranches = Pripranches

  constructor(private dprtS: DprtService,
              private authS: AuthService,
              private router: Router) { 

              this.student = this.dprtS.selstudent2
              this.dpertmentid = this.authS.user.displayName
              this.universityRef = this.dprtS.department.ref;
              this.departments = this.dprtS.departments

  }

  ngOnInit(): void {
  }

  delete(){

  }

  back(){

  }

  update(){
    let std = {
      ay: this.student.ay || '',
      acch: this.student.acch || '',
      try: this.student.try || '',
      branch: this.student.branch || '',
      teachsun: this.student.teachsum || '',
      primname: this.student.primname || '',
      primgov: this.student.primgov || '',
      primsum: this.student.primsum || '',
      accnum: this.student.accnum,
      examnum: this.student.examnum || '',
    }
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).update(std).then(() => {
      alert('تم التحديث بنجاح')
      this.dprtS.selstudent2.ay = this.student.ay
      this.dprtS.selstudent2.acch = this.student.acch
      this.dprtS.selstudent2.try = this.student.try
      this.dprtS.selstudent2.branch = this.student.branch
      this.dprtS.selstudent2.teachsun = this.student.teachsun
      this.dprtS.selstudent2.primname = this.student.primname
      this.dprtS.selstudent2.primgov = this.student.primgov
      this.dprtS.selstudent2.primsum = this.student.primsum
      this.dprtS.selstudent2.accnum = this.student.accnum
      this.dprtS.selstudent2.examnum = this.student.examnum
    }).catch(err => {
      console.log(err);
    })
  }

}
