import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";

@Component({
  selector: 'app-aoc-day1-of2022',
  templateUrl: './aoc-day1-of2022.component.html',
})
export class AocDay1Of2022Component implements OnInit {

  private mainPuzzleInput = puzzleInput.split('\n\n')
    .map((e) => e.split('\n'));

  public ngOnInit(): void {
    const responsePartOne = this.getSortedSums(this.mainPuzzleInput)[0];
    const responsePartTwo = this.getSortedSums(this.mainPuzzleInput)[0] + this.getSortedSums(
      this.mainPuzzleInput
    )[1] + this.getSortedSums(
      this.mainPuzzleInput
    )[2];
    console.log(responsePartOne);
    console.log(responsePartTwo)
  }

  private getSortedSums(miniPuzzle: Array<Array<string>>): Array<number> {
    return miniPuzzle
      .map((miniArray) => miniArray.reduce((acc, cur) => acc + Number(cur), 0))
      .sort((a, b) => b - a);
  }
}
