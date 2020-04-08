import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  urls = ['https://coviddataapi.herokuapp.com/api/all',
        'https://coviddataapi.herokuapp.com/api/all?country=india',
        'https://coviddataapi.herokuapp.com/api/all?date=22-3',
      'https://coviddataapi.herokuapp.com/api/lastday',
    'https://coviddataapi.herokuapp.com/api/lastday?country=india',
  'https://coviddataapi.herokuapp.com/api/total']

  constructor(private clipboard: Clipboard, private _snackBar: MatSnackBar) { }

  showToast(index:number){
    const link = <HTMLInputElement>document.getElementsByClassName("urlText")[index];
    link.select();
    this._snackBar.open("Copied!","",{
      duration: 2000,
    })
  }
  

  ngOnInit(): void {
  }

}
