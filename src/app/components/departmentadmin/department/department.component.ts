import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/interfaces';
import { DprtService, STD } from 'src/app/services/dprt.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: any
  department2: Department
  search:any
  examnum:any
  phone:any
  email:any
  seldate:any
  pages = 0
  pagestepper = 0
  loading = false
  students:any[] = []
  prevnum = 0
  totalstudents = []
  study:any
  num:any
  npages = 1
  ftechnum = 0
  selnum = 0

  constructor(private dprtS: DprtService,
              private router: Router,
    ) { 
    this.department2 = this.dprtS.seldprt
    this.pagestepper = this.dprtS.stepper
    this.study = this.dprtS.study
    if(!this.dprtS.selstudent2){
      this.selstudy()
    }
      this.reclassactive(this.pagestepper)
      this.dprtS.students2.subscribe(stds => {
        if(stds){
          this.department = this.dprtS.departmentid2
          this.totalstudents = stds.filter((stud:any) => stud.d == this.department2.id)
          this.totalstudents = this.totalstudents.sort((a:STD,b:STD) => {
            return a.name.localeCompare(b.name) || this.rdCompare(a, b)
          })
          this.students = this.totalstudents.slice(0,20)
          this.num = this.totalstudents.length
          this.npages = Math.ceil(this.num/20)
          this.pages = (this.npages > 10)? 10 : this.npages
          this.loading = false
        }
      })
      this.dprtS.estudents2.subscribe(stds => {
        if(stds){
          this.department = this.dprtS.departmentid2
          this.totalstudents = stds.filter((stud:any) => stud.d == this.department2.id)
          //this.totalstudents = stds
          this.totalstudents.sort((a:any,b:any) => {
            if(a['name'] < b['name']){
              return -1
            }
            else if(a['name'] > b['name']){
              return 1
            }else{
              return 0  
            }
          })
          this.students = this.totalstudents.slice(0,20)
          this.num = this.totalstudents.length
          this.npages = Math.ceil(this.num/20)
          this.pages = (this.npages > 10)? 10 : this.npages
          this.loading = false
        }
      })
    
  }

  ngOnInit(): void {
  }

  reclassactive(stepper:number){
    let lis = document.getElementsByClassName('page-item')
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      li.classList.remove('active')
    }
    document.getElementById(stepper+"")?.classList.add('active')
  }

  searchf(){
    if(this.search){
      this.students = this.totalstudents.filter(stdt => {
        let sn: string = stdt['name']
        let isn = sn.indexOf(this.search)
        let r = isn !== -1
        return r
      })
    }
  }

  searchf2(){
    if(this.examnum){
      this.students = this.totalstudents.filter(stdt => {
        let sn: string = stdt['examnum']
        let isn = sn.indexOf(this.examnum)
        let r = isn !== -1
        return r
      })
    }else{
     
    }
  }

  searchf4(){
    if(this.phone){
        this.students = this.totalstudents.filter(stdt => {
          let sn: string = stdt['phone']
          let isn = sn.indexOf(this.phone)
          let r = isn !== -1
          return r
        })
      }
  }

  searchf3(){
    if(this.email){
        this.students = this.totalstudents.filter(stdt => {
          let sn: string = stdt['email']
          let isn = -1
          if(sn){
            isn = sn.indexOf(this.email)
          }
          let r = isn !== -1
          return r
        })
      }
  }

  getByDate(){
    if(this.seldate){
      let ms = 24*60*60*1000
      let cd = Date.now();
      let sd = new Date(this.seldate).valueOf()
      let sdf = sd + ms;
      this.students = this.totalstudents.filter(stdt => {
        let sn: number = stdt['rd']
        let r = (sn >= sd && sn < sdf)
        return r
      })
    }
  }

  prevstipper(){
    if(this.pagestepper > 0){
      let rem = this.pagestepper % 10
      if(rem > 0){
        this.pagestepper = this.pagestepper - rem
      }else{
        this.pagestepper = this.pagestepper - 10
      }
    }
  }

  gonext(stepper:number){
    this.reclassactive(stepper)
    this.prevnum = (stepper-1)*20
    this.ftechnum = (stepper-1)*20
    let start = (stepper-1)*20
    let last = (stepper-1)*20+20
    this.students = this.totalstudents.slice(start, last)
  }

  nextstipper(){
    if((this.npages-(this.pagestepper+10)) > 10){
      this.pagestepper = this.pagestepper + 10;
    }else{
      this.pagestepper = this.pagestepper + this.npages-(this.pagestepper+10);
    }
  }

  chechedf(checked:any){
    if(checked){
      this.selnum = this.selnum + 1
    }else{
      this.selnum = this.selnum - 1
    }
  }

  filter1(std:any){
    this.students = this.totalstudents.filter(stdt => {
      let sn: string = stdt['name']
      let isn = sn.indexOf(std['name'])
      let r = isn !== -1
      return r
    })
  }

  rtime(t:number){
    let d = new Date(t)
    let y = d.getFullYear()
    let m = d.getMonth()+1
    let day = d.getDate();
    let h = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();
    let date = day+'/'+m+'/'+y+' - '+h+':'+mm+":"+ss
    return date;
  }

  selstd(std:any){
    this.dprtS.selstudent2 = null
    this.dprtS.selstudent = std
    this.router.navigate(['/collegeadmin', {outlets:{'col':['selstudent']}}])
  }

  selstudy(){
    let as = document.getElementsByClassName('nav-link')
    for (let i = 0; i < as.length; i++) {
      const e = as[i];
      e.classList.remove('active') 
    }
    document.getElementById(this.study)?.classList.add('active')
    this.loading = true
    if(this.study == 'صباحي'){
      this.dprtS.getmstudents()
    }else if (this.study == 'مسائي'){
      this.dprtS.getestudents()
    }
  }

  setstudy(study:string){
    this.study = study
    this.selstudy()
  }

  rdCompare(a:STD, b:STD){
    if(a.rd > b.rd){
      return 1
    }else if (a.rd < b.rd){
      return -1
    }else {
      return 0
    }
  }

}
