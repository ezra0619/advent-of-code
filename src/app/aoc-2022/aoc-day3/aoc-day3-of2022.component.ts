import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";

export interface Rucksack {
  firstCompartment: string,
  secondCompartment: string
}

export enum AlphabetNumberCorrelation {
  'a' =  1, 'b' =  2, 'c' =  3, 'd' =  4, 'e' =  5, 'f' =  6, 'g' =  7, 'h' =  8, 'i' =  9, 'j' =  10, 'k' =  11,
  'l' =  12, 'm' =  13, 'n' =  14, 'o' =  15, 'p' =  16, 'q' =  17, 'r' =  18, 's' =  19, 't' =  20,
  'u' =  21, 'v' =  22, 'w' =  23, 'x' =  24, 'y' =  25, 'z' =  26, 'A' =  27, 'B' =  28, 'C' =  29, 'D' =  30, 'E' =  31, 'F' =  32, 'G' =  33, 'H' =  34, 'I' =  35, 'J' =  36, 'K' =  37,
  'L' =  38, 'M' =  39, 'N' =  40, 'O' =  41, 'P' =  42, 'Q' =  43, 'R' =  44, 'S' =  45, 'T' =  46,
  'U' =  47, 'V' =  48, 'W' =  49, 'X' =  50, 'Y' =  51, 'Z' =  52
}

@Component({
  selector: 'app-aoc-day3-of2022',
  templateUrl: './aoc-day3-of2022.component.html',
})
export class AocDay3Of2022Component implements OnInit {

  private miniPuzzleInput: string = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

  public ngOnInit(): void {
    //Part 1
    const parsedMiniPuzzleInputPartOne: Array<Rucksack> = this.parsePuzzleInputForPartOne(this.miniPuzzleInput);
    const parsedPuzzleInputPartOne: Array<Rucksack> = this.parsePuzzleInputForPartOne(puzzleInput);
    const parOneResponse: number = this.getSumOrNumberArray(parsedPuzzleInputPartOne.map((rucksack) => {
      return this.getCommonLetterNumber(rucksack)
    }))
    console.log(parOneResponse)

    //Part 2
    const parsedMiniPuzzleInputPartTwo: Array<string> = this.parsePuzzleInputForPartTwo(this.miniPuzzleInput);
    const parsedPuzzleInputPartTwo: Array<string> = this.parsePuzzleInputForPartTwo(puzzleInput);
    const partTwoResponse: number = this.getSumOfCommonGroupStickers(parsedPuzzleInputPartTwo);
    console.log(partTwoResponse)
  }

  //Part 1
  private parsePuzzleInputForPartOne(puzzleInput: string):  Array<Rucksack> {
    return puzzleInput.split('\n').map((string) => {
      return {firstCompartment: string.slice(0, string.length / 2), secondCompartment: string.slice(string.length / 2, string.length)}
    })
  }

  private getCommonLetterNumber(rucksack: Rucksack): number {
    const commonLetterFromFirstCompartment: string = rucksack.firstCompartment.split('').filter((letter: string) => rucksack.secondCompartment.includes(letter))[0]
    if (commonLetterFromFirstCompartment !== undefined && commonLetterFromFirstCompartment !== null) {
      // @ts-ignore
      return AlphabetNumberCorrelation[commonLetterFromFirstCompartment]
    }
    return 0
  }

  private getSumOrNumberArray(arrayOfNumbers: Array<number>): number {
    return arrayOfNumbers.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  //Part 2
  private parsePuzzleInputForPartTwo(puzzleInput: string): Array<string> {
    return puzzleInput.split('\n')
  }

  private getCommonGroupStickerNumber(firstRucksack: string, secondRucksack: string, thirdRucksack: string) {
    const commonLetterBetweenGnomeOneAndTwo: Array<string> = [...(new Set(firstRucksack.split('').filter((letter: string) => secondRucksack.includes(letter)))).values()]
    const commonLetterBetweenGnomeOneAndThree: Array<string> = [...(new Set(firstRucksack.split('').filter((letter: string) => thirdRucksack.includes(letter)))).values()];
    const commonLetterBetweenAllThreeGnomes: string | undefined = commonLetterBetweenGnomeOneAndTwo.find((letter) => commonLetterBetweenGnomeOneAndThree.includes(letter))
    if (commonLetterBetweenAllThreeGnomes !== undefined) {
      // @ts-ignore
      return AlphabetNumberCorrelation[commonLetterBetweenAllThreeGnomes]
    }
    return 0
  }

  private getSumOfCommonGroupStickers(puzzleInput: Array<string>): number {
    return puzzleInput.reduce((previousValue: number, currentValue: string, index: number) => {
      if ((index + 1) % 3 === 0) {
        return previousValue + this.getCommonGroupStickerNumber(puzzleInput[index - 2], puzzleInput[index - 1], puzzleInput[index])
      }
      return previousValue
    }, 0)
  }

}
