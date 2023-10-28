import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";
import {getLocaleFirstDayOfWeek} from "@angular/common";

@Component({
  selector: 'app-aoc-day3',
  templateUrl: './aoc-day3.component.html',
  styleUrls: ['./aoc-day3.component.scss']
})
export class AocDay3Component implements OnInit {

  private puzzle: Array<Array<number>> = puzzleInput.split('\n').map((string) => string.split('').map(Number))
  private miniPuzzle: Array<Array<number>> = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split('\n').map((string) => string.split('').map(Number))

  public ngOnInit(): void {
    const gammaRate: string = this.calculateGammaRate(this.puzzle)
    const epsilonRate: string = this.calculateEpsilonRate(this.puzzle)
    this.calculatePuzzlePart1(gammaRate, epsilonRate);

    // const gammaRate: string = this.calculateGammaRate(this.miniPuzzle)
    // const epsilonRate: string = this.calculateEpsilonRate(this.miniPuzzle)
    // this.calculatePuzzlePart1(gammaRate, epsilonRate);

    // const oxygenGeneratorRating = this.calculateOxygenGeneratorRating(this.miniPuzzle)
    // const CO2ScrubberRating = this.calculateCO2ScrubberRating(this.miniPuzzle)
    // this.calculatePuzzlePart2(oxygenGeneratorRating, CO2ScrubberRating)

    const oxygenGeneratorRating = this.calculateOxygenGeneratorRating(this.puzzle)
    const CO2ScrubberRating = this.calculateCO2ScrubberRating(this.puzzle)
    this.calculatePuzzlePart2(oxygenGeneratorRating, CO2ScrubberRating)
  }

  // Puzzle part 1
  private calculateGammaRate(puzzleInput: Array<Array<number>>): string {
    return puzzleInput[0]
      .map((sliceOfArray, index) => this.calculateFrequency(puzzleInput, index))
      .map((pair) => pair.ones > pair.zeroes ? 1 : 0)
      .join('')
  }

  private calculateEpsilonRate(puzzleInput: Array<Array<number>>): string {
    return puzzleInput[0]
      .map((sliceOfArray, index) => this.calculateFrequency(puzzleInput, index))
      .map((pair) => pair.ones < pair.zeroes ? 1 : 0)
      .join('')
  }

  private calculateFrequency(puzzleInput: Array<Array<number>>, index: number): { ones: number, zeroes: number } {
    return {
      ones: puzzleInput.map((array) => array[index]).filter((number) => number === 1).length,
      zeroes: puzzleInput.map((array) => array[index]).filter((number) => number === 0).length
    }
  }

  private calculatePuzzlePart1(gamma: string, epsilon: string): number {
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
  }

  // Puzzle part 2

  private calculateOxygenGeneratorRating(puzzleInput: Array<Array<number>>) {
    const result = this.calculateRating(puzzleInput, 0, 1)
    return parseInt(result[0].join(''), 2)
  }

  private calculateCO2ScrubberRating(puzzleInput: Array<Array<number>>) {
    const result = this.calculateRating(puzzleInput, 0, 0)
    return parseInt(result[0].join(''), 2)
  }

  private getMostFrequentInteger(pair: { ones: number, zeroes: number }): 0 | 1 | -1 {
    return pair.ones > pair.zeroes ? 1 : pair.zeroes > pair.ones ? 0 : -1
  }

  private getLessFrequentInteger(pair: { ones: number, zeroes: number }): 0 | 1 | -1 {
    return pair.ones > pair.zeroes ? 0 : pair.zeroes > pair.ones ? 1 : -1
  }

  private calculateRating(sliceOfPuzzleInput: Array<Array<number>>, index: number, priorityNumber: 1 | 0): Array<Array<number>> {
    let thereIsAFrequentInteger: boolean;
    let frequentInteger: number;
    if (priorityNumber === 1) {
      thereIsAFrequentInteger = this.getMostFrequentInteger(this.calculateFrequency(sliceOfPuzzleInput, index)) !== -1
      frequentInteger = this.getMostFrequentInteger(this.calculateFrequency(sliceOfPuzzleInput, index))
    } else {
      thereIsAFrequentInteger = this.getLessFrequentInteger(this.calculateFrequency(sliceOfPuzzleInput, index)) !== -1
      frequentInteger = this.getLessFrequentInteger(this.calculateFrequency(sliceOfPuzzleInput, index))
    }

    const hasAnswer = sliceOfPuzzleInput.length === 1 || (!thereIsAFrequentInteger && sliceOfPuzzleInput.length === 2)
    if (hasAnswer) {
      return sliceOfPuzzleInput
        .filter((array) => array[sliceOfPuzzleInput[0].length - 1] === priorityNumber)
    }

    let nextInput = sliceOfPuzzleInput
    if (thereIsAFrequentInteger) {
      nextInput = sliceOfPuzzleInput
        .filter((array) => array[index] === frequentInteger)
    } else if (sliceOfPuzzleInput.length > 2) {
      nextInput = sliceOfPuzzleInput
        .filter((array) => array[index] === priorityNumber)
    }

    return this.calculateRating(nextInput, index + 1, priorityNumber)
  }

  private calculatePuzzlePart2(oxygen: number, co2: number): number {
    return oxygen * co2
  }
}
