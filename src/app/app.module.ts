import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AocDay1Of2021Component } from './aoc-2021/aoc-day1/aoc-day1-of2021.component';
import {AocDay2Of2021Component} from "./aoc-2021/aoc-day2/aoc-day2-of2021.component";
import {AocDay3Of2021Component} from "./aoc-2021/aoc-day3/aoc-day3-of2021.component";
import {AocDay1Of2022Component} from "./aoc-2022/aoc-day1/aoc-day1-of2022.component";
import {AocDay2Of2022Component} from "./aoc-2022/aoc-day2/aoc-day2-of2022.component";


@NgModule({
    declarations: [
      AppComponent,
      AocDay1Of2021Component,
      AocDay2Of2021Component,
      AocDay3Of2021Component,
      AocDay1Of2022Component,
      AocDay2Of2022Component
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
