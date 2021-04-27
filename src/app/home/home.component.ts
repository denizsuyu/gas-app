import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { GasModel } from './models/gas.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public list: Array<GasModel> = new Array<GasModel>();
  public totalGasPrice: number = 0;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.GetList().subscribe(response => {
      this.list = response as Array<GasModel>;

      for (let index = 1; index < this.list.length; index++) {
        this.list[index].pricePerKilometer = this.list[index].totalPrice / (this.list[index].totalKilometer - this.list[index - 1].totalKilometer);
      }

      this.totalGasPrice = this.list.reduce((x, y) => x + y.totalPrice, 0);
    });
  }

  public GetList(type: string) {
    this.homeService.GetList().subscribe(response => {
      this.list = response as Array<GasModel>;

      if (type.length > 0) {
        this.list = this.list.filter(x => x.type == type);
      }

      for (let index = 1; index < this.list.length; index++) {
        this.list[index].pricePerKilometer = this.list[index].totalPrice / (this.list[index].totalKilometer - this.list[index - 1].totalKilometer);
      }

      this.totalGasPrice = this.list.reduce((x, y) => x + y.totalPrice, 0);
    });
  }

}
