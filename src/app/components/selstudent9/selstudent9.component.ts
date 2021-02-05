import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-selstudent9',
  templateUrl: './selstudent9.component.html',
  styleUrls: ['./selstudent9.component.css']
})
export class Selstudent9Component implements OnInit {

  db = firebase.firestore()
  storage = firebase.storage();
  studentid:any
  collegeid:any
  prog:any
  url:any
  prog2:any
  url2:any
  bm:any
  bmd:any
  bma:any
  dpertmentid
  student

  constructor(private dprtS: DprtService) { 
    this.dpertmentid = this.dprtS.departmentid
    this.collegeid = this.dprtS.department.ref;
    this.studentid = this.dprtS.selstudent2.id
    this.student = this.dprtS.selstudent2
    this.bm = this.student.bm
    this.bmd = this.student.bmd
    this.bma = this.student.bma
    const filepath = 'lms/studentsw/'+this.dpertmentid+'/'+this.studentid+'/bm1';
    this.storage.ref(filepath).getDownloadURL().then(url => {
      this.url = url          
    }).catch(err => {
      this.url = " "
      console.log(err);
    })
    const filepath2 = 'lms/studentsw/'+this.dpertmentid+'/'+this.studentid+'/bm2';
    this.storage.ref(filepath2).getDownloadURL().then(url2 => {
      this.url2 = url2
    }).catch(err => {
      this.url2 = " "
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

  browse(){
    let js1 = document.getElementById('js1')
    if(js1){
      js1.click()
    }
  }

  browse2(){
    let js2 = document.getElementById('js2')
    if(js2){
      js2.click()
    }
  }

  filec(event:any){
    let file = event.target.files[0]
    let db = this.db
    let studentid = this.studentid
    let collegeid = this.dpertmentid
    this.prog = true
    if(file){
      const filepath = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/bm1';
      const fileRef = this.storage.ref(filepath)
      const task = fileRef.put(file)
      task.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var progressp = progress.toString()+"%";
        if(this.prog){
          let pbb = document.getElementById('pb')
          if(pbb){
            pbb.style.width =  progressp
          }
        }
        if(progress == 100){
          snapshot.ref.getDownloadURL().then(url => {
            this.url = url
          })
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            //console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
          case firebase.storage.TaskState.SUCCESS:
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let std = {js1: true}
        db.collection('academics').doc(collegeid).collection('lmsstudents').doc(studentid).update(std).then(() => {
          alert('تم رفع الصورة بنجاح')
        })
      });
    }else{
      alert('لايوجد ملف لتحميله')
    }
  }

  filec2(event:any){
    let file = event.target.files[0]
    let db = this.db
    let studentid = this.studentid
    let collegeid = this.dpertmentid
    this.prog2 = true
    if(file){
      const filepath = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/bm2';
      const fileRef = this.storage.ref(filepath)
      const task = fileRef.put(file)
      task.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var progressp = progress.toString()+"%";
        if(this.prog2){
          let pb2b = document.getElementById('pb2')
          if(pb2b){
            pb2b.style.width =  progressp
          } 
        }
        if(progress == 100){
          snapshot.ref.getDownloadURL().then(url2 => {
            this.url2 = url2
          })
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            //console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
          case firebase.storage.TaskState.SUCCESS:
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let std = {js2: true}
        db.collection('academics').doc(collegeid).collection('lmsstudents').doc(studentid).update(std).then(() => {
          alert('تم رفع الصورة بنجاح')
        })
      });
    }else{
      alert('لايوجد ملف لتحميله')
    }
  }

  updatevalues(){
    let std = {
      bm: this.bm,
      bmd: this.bmd,
      bma: this.bma
    }
    this.db.collection('academics').doc(this.collegeid).collection('lmsstudents').doc(this.studentid).update(std).then(() => {
      alert('تم تحديث البيانات')
    })
  }

}
