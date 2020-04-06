import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryData } from './country'
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  allData = 'https://coviddataapi.herokuapp.com//api/all';

  lastdayUrl = 'https://coviddataapi.herokuapp.com/api/lastday';

  totalData = 'https://coviddataapi.herokuapp.com/api/total';

  country: Subject<string> = new BehaviorSubject<string>(null);  

  constructor(private http: HttpClient) { }

  getLastdayData(){
    return this.http.get<CountryData[]>(this.lastdayUrl);
  }

  getTotalCountry(countryName:string){
    return this.http.get<CountryData>(this.lastdayUrl.concat("?country="+countryName.toLowerCase()));
  }

  getAllData(){
    return this.http.get<CountryData[]>(this.allData);
  }
  
  getAllCountry(countryName:string){
    return this.http.get<CountryData[]>(this.allData.concat("?country="+countryName.toLowerCase()));
  }

  getTotalCount(){
    return this.http.get<CountryData>(this.totalData);
  }

}
