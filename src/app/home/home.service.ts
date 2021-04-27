import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public GetList() {
    return this.httpClient.get("https://raw.githubusercontent.com/denizsuyu/gas/main/gas.json");
  }
}
