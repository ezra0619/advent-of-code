import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";


@Component({
  selector: 'app-aoc-day6-of2022',
  templateUrl: './aoc-day6-of2022.component.html',
})
export class AocDay6Of2022Component implements OnInit {

  private exampleOne: string = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
  public ngOnInit(): void {
    const resultPartOne: number = this.solvePartOne(puzzleInput)
    const resultPartTwo: number = this.solvePartTwo(puzzleInput)
  }

  private solvePartOne(puzzleInput: string): number {
    const parsedPuzzleInput: Array<string> = puzzleInput.split('')
    let firstMatch: number = 0;

    for (let i = 0; i < parsedPuzzleInput.length; i++) {
      const set: Array<string> | null = this.getArrayOfElements(parsedPuzzleInput, i, 4);
      if (i >=3 && [...new Set(set ?? []).keys()].length === 4) {
        firstMatch  = i + 1
        break
      }
    }
    return firstMatch
  }

  private solvePartTwo(puzzleInput: string): number {
    const parsedPuzzleInput: Array<string> = puzzleInput.split('')
    let firstMatch: number = 0;

    for (let i = 0; i < parsedPuzzleInput.length; i++) {
      const set: Array<string> | null = this.getArrayOfElements(parsedPuzzleInput, i, 14)
      if (i >=13 && [...new Set(set).keys()].length === 14) {
        firstMatch  = i + 1
        break
      }
    }
    return firstMatch
  }

  private getArrayOfElements(parsedPuzzleInput: Array<string>, currentIndex: number, nrOfElementsNeeded: number): Array<string> | null {
    if (currentIndex < nrOfElementsNeeded) {
      return null
    }

    let result: Array<string> = [];
    for (let i: number = 0; i < nrOfElementsNeeded; i++) {
      result.push(parsedPuzzleInput[currentIndex - i])
    }

    return result
  }
}
