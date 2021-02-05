import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';
import { acch, deg, gender, yesno, trial, AcademicYears, Studies, Governates, Pripranches } from 'src/app/arrays';
import firebase from 'firebase/app';

@Component({
  selector: 'app-selstudent4',
  templateUrl: './selstudent4.component.html',
  styleUrls: ['./selstudent4.component.css']
})
export class Selstudent4Component implements OnInit {

  student: any
  dpertmentid
  universityRef
  departments
  academicyears = AcademicYears
  db = firebase.firestore()

  constructor(private dprtS: DprtService,
              private authS: AuthService,) { 
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
      kefname: this.student.kefname || '',
      kefcit: this.student.kefcit || '',
      kefdate: this.student.kefdate || '',
      kefidnum: this.student.kefidnum || '',
      kefphone: this.student.kefphone || '',
      kefwork: this.student.kefwork || '',
    }
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).update(std).then(() => {
      alert('تم التحديث بنجاح')
      this.dprtS.selstudent2.kefname = this.student.kefname
      this.dprtS.selstudent2.kefcit = this.student.kefcit
      this.dprtS.selstudent2.kefdate = this.student.kefdate
      this.dprtS.selstudent2.kefidnum = this.student.kefidnum
      this.dprtS.selstudent2.kefphone = this.student.kefphone
      this.dprtS.selstudent2.kefwork = this.student.kefwork
    }).catch(err => {
      console.log(err);
    })
  }

}
