import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DprtService } from 'src/app/services/dprt.service';
import firebase from 'firebase/app'
import 'firebase/storage'

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  student: any
  storage = firebase.storage()
  js1: any
  js2: any
  img1: any
  img2: any
  spn1: boolean = false
  spn2: boolean = false
  err1 = false
  err2 = false

  constructor(private router: Router,
              private dprtS: DprtService,
    ) { 
    this.student = this.dprtS.selstudent2
    console.log(this.student, this.dprtS.departmentid, this.dprtS);
    
  }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['collegeadmin', {outlets: {'col':['selstudent']}}])
  }

  js(){
        const path1 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/js1';
        const path2 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/js2';
        let ref1 = this.storage.ref(path1)
        this.spn1 =true
        this.spn2 = true
        this.err1 = false
        this.err2 = false
        ref1.getDownloadURL().then(url => {
          this.img1 = url
        }).catch(err => {
          this.err1 = true
        }).finally(() => {
          this.spn1 = false
        })
        let ref2 = this.storage.ref(path2)
        ref2.getDownloadURL().then(url => {
          this.img2 = url
        }).catch(err => {
          this.err2 = true
        }).finally(() => {
          this.spn2 = false
        })
  }

  sj(){
    const path1 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/sj1';
    let ref1 = this.storage.ref(path1)
    this.spn1 =true
        this.err1 = false
        this.err2 = false
        ref1.getDownloadURL().then(url => {
          this.img1 = url
        }).catch(err => {
          this.err1 = true
        }).finally(() => {
          this.spn1 = false
        })
    this.img2 = null
  }
  bm(){
    const path1 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/bm1';
    const path2 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/bm2';
    let ref1 = this.storage.ref(path1)
    this.spn1 =true
    this.spn2 = true
        this.err1 = false
        this.err2 = false
        ref1.getDownloadURL().then(url => {
          this.img1 = url
        }).catch(err => {
          this.err1 = true
        }).finally(() => {
          this.spn1 = false
        })
    let ref2 = this.storage.ref(path2)
    ref2.getDownloadURL().then(url => {
          this.img2 = url
        }).catch(err => {
          this.err2 = true
        }).finally(() => {
          this.spn2 = false
        })
  }
  bs(){
    const path1 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/bw1';
    const path2 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/bw2';
    let ref1 = this.storage.ref(path1)
    this.spn1 =true
    this.spn2 = true
        this.err1 = false
        this.err2 = false
        ref1.getDownloadURL().then(url => {
          this.img1 = url
        }).catch(err => {
          this.err1 = true
        }).finally(() => {
          this.spn1 = false
        })
        let ref2 = this.storage.ref(path2)
        ref2.getDownloadURL().then(url => {
          this.img2 = url
        }).catch(err => {
          this.err2 = true
        }).finally(() => {
          this.spn2 = false
        })
  }
  ph(){
    const path1 = 'lms/studentsw/'+this.dprtS.department.id+'/'+this.student.id+'/ph';
    let ref1 = this.storage.ref(path1)
    this.spn1 =true
        this.err1 = false
        this.err2 = false
        ref1.getDownloadURL().then(url => {
          this.img1 = url
        }).catch(err => {
          this.err1 = true
        }).finally(() => {
          this.spn1 = false
        })
    this.img2 = null
  }

}
