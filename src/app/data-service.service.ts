import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryData } from './country'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  lastdayUrl = 'https://coviddataapi.herokuapp.com/api/lastday';

  totalData = 'https://coviddataapi.herokuapp.com/api/total';
  

  constructor(private http: HttpClient) { }

  getLastdayData(){
    return this.http.get<CountryData[]>(this.lastdayUrl);
  }

  getTotalCountry(countryName:string){
    return this.http.get<CountryData>(this.lastdayUrl.concat("?country="+countryName.toLowerCase()));
  }

  getTotalCount(){
    return this.http.get<CountryData>(this.totalData);
  }

}
