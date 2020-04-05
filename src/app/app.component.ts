import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { CountryData } from './country';
import { ChartData } from './chartdata';
import { countryList,countryCodes } from './countries';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covidBoard';

  countries = countryList;

  codes = countryCodes;

  clientCountry :string;

  clientCountryCode: string;

  chartTemp :ChartData[]=[];
  @Input() public testChartData :ChartData= {data:[],label:''};

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  countryCodes : any[];

  lastdayData : CountryData[];

  totalCount: CountryData;

  tempCountry: CountryData;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips:{
      intersect: false
    }
  };


  // chartData = [
  //   { data: [330, 600, 260, 700], label: 'Account A' },
  //   { data: [120, 455, 100, 340], label: 'Account B' },
  //   { data: [45, 67, 800, 500], label: 'Account C' }
  // ];

  // chartLabels = ['January', 'February', 'Mars', 'April'];


  testChartLabels :string[]=[];



  constructor(private dataService: DataServiceService) {
  }

  getLastDay() {
    this.dataService.getLastdayData()
      .subscribe((dataset: CountryData[]) => {
        this.lastdayData = dataset;
        //console.log(this.lastdayData.map(function (el) { return el.country[0].toUpperCase()+el.country.slice(1); }));
        this.lastdayData.sort((a, b) => b.confirmed - a.confirmed);
        this.lastdayData = this.lastdayData.slice(0,10);
        //console.log(this.lastdayData);
        //console.log(this.testChartData);
        var namearray = this.lastdayData.map(function (el) { return el.confirmed; });
        this.chartTemp.push({data:namearray,label:'Confirmed'});
        namearray = this.lastdayData.map(function (el) { return el.recovered; });
        this.chartTemp.push({data:namearray,label:'Recovered'});
        namearray = this.lastdayData.map(function (el) { return el.deaths; });
        this.chartTemp.push({data:namearray,label:'Deaths'});
        this.testChartLabels = this.lastdayData.map(function (el) { return el.country[0].toUpperCase()+el.country.slice(1); });
        //console.log(this.chartTemp);
      });
      this.countryChanged();
  }

  getTotal() {
    this.dataService.getTotalCount()
     .subscribe((value: CountryData) =>{
       this.totalCount = value;
     })
  }

  countryChanged(){
    this.clientCountryCode = this.codes[this.countries.indexOf(this.clientCountry)];
    //console.log(this.clientCountry);
    this.dataService.getTotalCountry(this.clientCountry)
     .subscribe((countryData: CountryData) =>{
       this.tempCountry = countryData[0];
     },(error:any)=>console.log(<any>error),() => {
      if (this.testChartLabels.length<11 && this.chartTemp.length>2) {
        //console.log(this.testChartLabels.length);
        this.chartTemp[0].data.push(this.tempCountry.confirmed);
        this.chartTemp[1].data.push(this.tempCountry.recovered);
        this.chartTemp[2].data.push(this.tempCountry.deaths);
        this.testChartLabels.push(this.tempCountry.country[0].toUpperCase()+this.tempCountry.country.slice(1));
        this.chart.chart.update();
      }
      else if(this.testChartLabels.length>10 && this.chartTemp.length>2){
      //console.log(this.testChartLabels.length);
      this.chartTemp[0].data[10] = this.tempCountry.confirmed;
      this.chartTemp[1].data[10] = this.tempCountry.recovered;
      this.chartTemp[2].data[10] = this.tempCountry.deaths;
      this.testChartLabels[10] = this.tempCountry.country[0].toUpperCase()+this.tempCountry.country.slice(1);
      this.chart.chart.update();
      }
     })     
  }


  ngOnInit() {
    this.clientCountry = this.countries[71];
    this.getLastDay();
    this.getTotal();
  }
}
