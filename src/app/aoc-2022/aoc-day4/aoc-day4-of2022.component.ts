import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";

interface ElfPair {
  firstElf: Array<number>;
  secondElf: Array<number>
}
@Component({
  selector: 'app-aoc-day4-of2022',
  templateUrl: './aoc-day4-of2022.component.html',
})
export class AocDay4Of2022Component implements OnInit {

  private miniPuzzleInput: string = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

  public ngOnInit(): void {
    const resultPartOne: number = this.calculateCompletelyOverlappingPairs(this.parsePuzzlePartOne(puzzleInput));
    const resultPartTwo: number = this.calculateOverlappingPairs(this.parsePuzzlePartOne(puzzleInput));
  }

  private parsePuzzlePartOne(puzzle: string): Array<ElfPair> {
    return puzzle.split('\n').map((string) => {
      return {firstElf: string.split(',')[0].split('-').map(Number), secondElf: string.split(',')[1].split('-').map(Number)}
    })
  }

  private calculateCompletelyOverlappingPairs(elfPairs: Array<ElfPair>): number {
    return elfPairs.reduce((previousValue: number, currentValue: ElfPair)=> {
      if (
        (currentValue.firstElf[0] <= currentValue.secondElf[0] && currentValue.firstElf[1] >= currentValue.secondElf[1]) ||
        (currentValue.firstElf[0] >= currentValue.secondElf[0] && currentValue.firstElf[1] <= currentValue.secondElf[1])
      ) {

        return previousValue + 1;
      }
      return previousValue
    }, 0)
  }

  private calculateOverlappingPairs(elfPairs: Array<ElfPair>) {
    return elfPairs.reduce((previousValue: number, currentValue: ElfPair)=> {
      if (
        (currentValue.firstElf[0] >= currentValue.secondElf[0] && currentValue.firstElf[0] <= currentValue.secondElf[1]) ||
        (currentValue.firstElf[1] >= currentValue.secondElf[0] && currentValue.firstElf[1] <= currentValue.secondElf[1]) ||
        (currentValue.secondElf[1] >= currentValue.firstElf[0] && currentValue.secondElf[1] <= currentValue.firstElf[1]) ||
        (currentValue.secondElf[1] >= currentValue.firstElf[0] && currentValue.secondElf[1] <= currentValue.firstElf[1])
      ) {

        return previousValue + 1;
      }
      return previousValue
    }, 0)
  }

}
