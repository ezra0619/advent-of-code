import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AocDay1Component } from './aoc-2021/aoc-day1/aoc-day1.component';
import {AocDay2Component} from "./aoc-2021/aoc-day2/aoc-day2.component";
import {AocDay3Component} from "./aoc-2021/aoc-day3/aoc-day3.component";

@NgModule({
    declarations: [
        AppComponent,
        AocDay1Component,
        AocDay2Component,
        AocDay3Component
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
