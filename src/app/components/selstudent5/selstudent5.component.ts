import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DprtService } from 'src/app/services/dprt.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-selstudent5',
  templateUrl: './selstudent5.component.html',
  styleUrls: ['./selstudent5.component.css']
})
export class Selstudent5Component implements OnInit {

  student: any
  dpertmentid
  universityRef
  db = firebase.firestore()

  constructor(private dprtS: DprtService,
              private authS: AuthService,) { 
              this.student = this.dprtS.selstudent2
              this.dpertmentid = this.authS.user.displayName
              this.universityRef = this.dprtS.department.ref;
  }

  ngOnInit(): void {
  }

  delete(){

  }

  back(){

  }

  update(){
    let std = {
      shrel: this.student.shrel || '',
      shcl: this.student.shcl || '',
      shdate: this.student.shdate || '',
      shnum: this.student.shnum || '',
    }
    this.db.collection('academics').doc(this.dpertmentid).collection('lmsstudents').doc(this.student.id).update(std).then(() => {
      alert('تم التحديث بنجاح')
      this.dprtS.selstudent2.shrel = this.student.shrel
      this.dprtS.selstudent2.shcl = this.student.shcl
      this.dprtS.selstudent2.shdate = this.student.shdate
      this.dprtS.selstudent2.shnum = this.student.shnum
    }).catch(err => {
      console.log(err);
    })
  }

}
