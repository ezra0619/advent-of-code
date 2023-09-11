import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-aoc-day3',
    templateUrl: './aoc-day3.component.html',
    styleUrls: ['./aoc-day3.component.scss']
})
export class AocDay3Component implements OnInit {

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
        console.log(this.miniPuzzle)
        // this.calculateFrequency(this.miniPuzzle)
        console.log(this.sliceArray(this.miniPuzzle, 0));
    }


    private sliceArray(puzzleInput: Array<Array<number>>, index: number) {
        return puzzleInput.map((array) => array[index])
    }

    private calculateFrequency(splicedArray: Array<number>): number {
        const frequency: {one: number, zero: number} = splicedArray.reduce((acc, cur) => {
            if (cur === 0) {
                return {
                    ...acc,
                    zero: acc.zero + 1
                }
            }

            if (cur === 1) {
                return {
                    ...acc,
                    one: acc.one + 1
                }
            }
            return acc
        }, {one: 0, zero: 0})
        return frequency.one > frequency.zero ? frequency.one : frequency.zero
    }
}


// if (cur === 0) {
//     return acc.zero + 1
// }
//
// if (cur === 1) {
//     return acc.one + 1
// }
//
// return {one: acc.one, zero: acc.zero}
// }, {one: 0, zero: 0}))
