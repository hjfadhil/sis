import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { DprtService } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-selstudent10',
  templateUrl: './selstudent10.component.html',
  styleUrls: ['./selstudent10.component.css']
})
export class Selstudent10Component implements OnInit {

  dpertmentid
  student
  db = firebase.firestore()
  storage = firebase.storage();
  studentid
  collegeid
  prog:any
  url:any
  prog2:any
  url2:any
  bsn
  bsd
  bsa

  constructor(private dprtS: DprtService) { 
    this.dpertmentid = this.dprtS.departmentid
    this.collegeid = this.dprtS.department.ref;
    this.studentid = this.dprtS.selstudent2.id
    this.student = this.dprtS.selstudent2
    this.bsn = this.student.bsn
    this.bsd = this.student.bsd
    this.bsa = this.student.bsa
    const filepath = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/bw1';
    this.storage.ref(filepath).getDownloadURL().then(url => {
      this.url = url          
    }).catch(err => {
      this.url = " "
      console.log(err);
    })
    const filepath2 = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/bw2';
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
      const filepath = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/bw1';
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
      const filepath = 'lms/studentsw/'+this.collegeid+'/'+this.studentid+'/bw2';
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
      bsn: this.bsn,
      bsd: this.bsd,
      bsa: this.bsa
    }
    this.db.collection('academics').doc(this.collegeid).collection('lmsstudents').doc(this.studentid).update(std).then(() => {
      alert('تم تحديث البيانات')
    })
  }

}
