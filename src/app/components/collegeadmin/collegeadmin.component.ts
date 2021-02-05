import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth'
import { DprtService } from 'src/app/services/dprt.service';
import { Colleges } from 'src/app/arrays';
import { Academic, Department } from 'src/app/interfaces';

@Component({
  selector: 'app-collegeadmin',
  templateUrl: './collegeadmin.component.html',
  styleUrls: ['./collegeadmin.component.css']
})
export class CollegeadminComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  auth = firebase.auth();
  user: any
  db = firebase.firestore()
  stdsnum = 0
  cstdsnum = 0
  disable = true
  college: Academic | undefined

  constructor(
              private router: Router,private breakpointObserver: BreakpointObserver, private dprtS: DprtService,
    ) { 
      // this.auth.onAuthStateChanged(user => {
      //   if(!user){
      //     this.user = user
      //     //this.router.navigate([''])
      //   }else{
      //     this.router.navigate(['/main'])
      //   }
      // })
      this.dprtS.students2.subscribe(stds => {
        if(stds){
          this.disable = false
        }
      })
    }
    
    ngOnInit(): void {
      if(this.dprtS.departmentid){
      let college = Colleges.find(c => c.id == this.dprtS.departmentid)
      if(college){
        this.college = college
        this.dprtS.college = this.college
      }
      this.db.collection('academics').doc(this.dprtS.departmentid).get().then(sn => {
        this.dprtS.department = sn.data()
        this.cstdsnum = this.dprtS.department?.rstds
      })
      // this.db.collection('academics').doc(this.dprtS.departmentid).collection('lmsstudents').get().then(sns => {
      //   this.stdsnum = sns.docs.length
      //   console.log(this.stdsnum);
        
      // })
    }
  }

  update(){
    this.db.collection('academics').doc(this.dprtS.departmentid).update({rstds:this.stdsnum});
  }

  logout(){
    this.auth.signOut().then(() => {
      this.router.navigate(['/main'])
    })
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }

  stats(){
    this.router.navigate(['/collegeadmin', {outlets: {'col':['statistics']}}])
  }

  updateuserprofile(){
    let dn = prompt('id')
    if(dn){
      this.auth.currentUser?.updateProfile({
        displayName: dn
      })
    }
  }

  seldprt(dprt:Department){
    this.dprtS.seldprt = dprt
    if(this.router.url == '/collegeadmin'){
      this.router.navigate(['/collegeadmin', {outlets: {'col':['departmentadmin']}}])
    }else{
      this.router.navigate(['']).then(() => {
        this.router.navigate(['/collegeadmin', {outlets: {'col':['departmentadmin']}}])
      }).catch(err => {
        console.log(err);
      })
    }
  }

}
