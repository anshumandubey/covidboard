import { Component, OnInit } from '@angular/core';
import { ChartData } from '../chartdata';
import { DataServiceService } from '../data-service.service';
import { CountryData } from '../country';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientCountry :string = "";

  clientCountryCode: string = "";

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips:{
      intersect: false
    }
  };

  alldayData : CountryData[];

  allData : CountryData[];

  chartTemp :ChartData[]=[];

  allChartTemp :ChartData[]=[];

  testChartLabels :string[]=[];


  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  constructor(private dataService: DataServiceService) { }


  getAllCountry() {
    this.dataService.getAllCountry(this.clientCountry)
      .subscribe((dataset: CountryData[]) => {
        this.alldayData = dataset;
        this.chartTemp = this.chartTemp.slice(0,0);
        this.testChartLabels = this.testChartLabels.slice(0,0);
        // this.lastdayData.sort((a, b) => b.confirmed - a.confirmed);
        // this.lastdayData = this.lastdayData.slice(0,10);
        var namearray = this.alldayData.map(function (el) { return el.confirmed; });
        this.chartTemp.push({data:namearray,label:'Confirmed'});
        namearray = this.alldayData.map(function (el) { return el.recovered; });
        this.chartTemp.push({data:namearray,label:'Recovered'});
        namearray = this.alldayData.map(function (el) { return el.deaths; });
        this.chartTemp.push({data:namearray,label:'Deaths'});
        this.testChartLabels = this.alldayData.map(function (el) { return el.date; });
      },(error:any)=>console.log(<any>error),() => {
      });
  }

  getAll(){
    this.dataService.getAllData()
     .subscribe((dataset: CountryData[]) =>{
       this.allData = dataset;
      //  console.log(this.allData);
     },(error:any)=>console.log(<any>error),() => {
      var confirmed = this.allData.slice(0,this.testChartLabels.length).map(function (el) { return el.confirmed; });
      var recovered = this.allData.slice(0,this.testChartLabels.length).map(function (el) { return el.recovered; });
      var deaths = this.allData.slice(0,this.testChartLabels.length).map(function (el) { return el.deaths; });
       for (let index = this.testChartLabels.length; index < this.allData.length; index = index + this.testChartLabels.length) {
         confirmed = confirmed.map((a,i)=> a + this.allData.slice(index,index + this.testChartLabels.length).map(function (el) { return el.confirmed; })[i]);
         recovered = recovered.map((a,i)=> a + this.allData.slice(index,index + this.testChartLabels.length).map(function (el) { return el.recovered; })[i]);
         deaths = deaths.map((a,i)=> a + this.allData.slice(index,index + this.testChartLabels.length).map(function (el) { return el.deaths; })[i]);
       }
      this.allChartTemp.push({data:confirmed,label:'Confirmed'});
      this.allChartTemp.push({data:recovered,label:'Recovered'});
      this.allChartTemp.push({data:deaths,label:'Deaths'});
      // console.log(this.allChartTemp);
     })
  }

  ngOnInit(): void {
    this.clientCountry = localStorage.getItem('clientCountry')
    this.dataService.country.subscribe((clientCountry: string) => {
      this.clientCountry = clientCountry;
      this.getAllCountry();
    })
    this.getAllCountry();
    this.getAll();
  }

}
