import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";

@Component({
    selector: 'app-aoc-day1',
    templateUrl: './aoc-day1.component.html',
    styleUrls: ['./aoc-day1.component.scss']
})
export class AocDay1Component implements OnInit {

    private puzzleInput = puzzleInput
    private miniPuzzleInput = `199
200
208
210
200
207
240
269
260
263`.split('\n').map(Number)


    public ngOnInit(): void {
        console.log(this.countDepthIncreases(this.miniPuzzleInput));
        console.log(this.countDepthIncreases(this.puzzleInput))
        console.log(this.countDepthIncreasesPart2(this.miniPuzzleInput))
        console.log(this.countDepthIncreasesPart2(this.puzzleInput))
    }

    private countDepthIncreases(puzzleInput: Array<number>): number {
        return puzzleInput.reduce((acc: number, curr: number, currentIndex: number): number => {
            if (puzzleInput[currentIndex] < puzzleInput[currentIndex + 1]) {
                return acc + 1
            }
            return acc;
        }, 0)
    }

    private countDepthIncreasesPart2(puzzleInput: Array<number>): number {
        return puzzleInput.reduce((acc: number, curr: number, currentIndex: number): number => {
            const firstThree = puzzleInput[currentIndex - 1] + puzzleInput[currentIndex - 2] + puzzleInput[currentIndex]
            const lastThree = puzzleInput[currentIndex - 1] +  puzzleInput[currentIndex] + puzzleInput[currentIndex + 1]
            if (firstThree < lastThree) {
                return acc + 1
            }
            return acc;
        }, 0)
    }

}
