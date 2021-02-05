import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DprtService } from 'src/app/services/dprt.service';
import { SettingService } from 'src/app/services/setting.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  college:any
  useruid:string
  logourl:string = 'assets/nophoto.png'
  color = "#ff0000"
  shdprtname = false

  constructor(private settingS: SettingService,
              private router: Router,
    ) { 
    this.useruid = this.settingS.useruid
    if(!this.useruid){
      this.router.navigate(['/'])
    }else{
      this.college = this.settingS.college
      if(this.college.logourl){
        this.logourl = this.college.logourl
      }
      if(this.settingS.college.color){
        this.color = this.settingS.college.color
      }
      if(this.settingS.college.shdprtname){
        this.shdprtname = this.settingS.college.shdprtname
      }
    }
    
  }
  
  ngOnInit(): void {
  }

  openlogof(){
    document.getElementById('logof')?.click()
  }

  logofc(event:any){
    let file = <File>event?.target.files[0]
    if(file){
      this.settingS.uploadlogo(file).then(url => {
        this.settingS.getCollege()
        this.logourl = url
      })
    }
  }

  changecolor(){
    this.settingS.updateColor(this.color).then(() => {
      this.settingS.getCollege()
      alert('تم تحديث لون العلم بنجاح')
    })
  }

  upddprtname(){
    this.settingS.updateshdprtname(this.shdprtname).then(() => {
      this.settingS.getCollege()

      alert('تم التحديث بنجاح')
    })
  }

}
