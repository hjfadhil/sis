import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  db = firebase.firestore();
  stdnum = {}
  colleges: any = []

  constructor() { 
    this.db.collection('academics').where('ref', '==', 'JN0Pn7NcEpXjMnONDuUV').where('level', '==', 'Kv4o8Vyw74ZyBPZiP6dI').get().then(sns => {
      sns.forEach(sn => {
        let col = {
          name: sn.get('name.ar'),
          num: sn.get('rstds')
        }
        this.colleges.push(col)
      })
      console.log(this.colleges);
      
    })
  }

  ngOnInit(): void {
  }

}
