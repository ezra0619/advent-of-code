import {Component, OnInit} from '@angular/core';
import {puzzleInputDay2} from "./puzzleInput";

@Component({
    selector: 'app-aoc-day2',
    templateUrl: './aoc-day2.component.html',
    styleUrls: ['./aoc-day2.component.scss']
})
export class AocDay2Component implements OnInit {
    private puzzleInput: Array<string> = puzzleInputDay2.split('\n')
    private miniPuzzleInput: Array<string> = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split('\n');

    public ngOnInit(): void {
        const numbers = this.calculatePositionAndDepth(this.miniPuzzleInput)
        console.log(this.calculatePositionTimesDepth(numbers))
        console.log(this.calculate2ndPartOfPuzzle(this.miniPuzzleInput));



        console.log(this.calculate2ndPartOfPuzzle(this.puzzleInput))


    }


    //1st part of puzzle
    private calculatePositionAndDepth(puzzleInput: Array<string>): { position: number, up: number, down: number } {
        const position: number = puzzleInput.filter((e) => e.includes('forward')).map((position) => position.replace('forward ', '')).map(Number).reduce((acc, cur) => acc + cur);
        const up: number = puzzleInput.filter((e) => e.includes('up')).map((position) => position.replace('up ', '')).map(Number).reduce((acc, cur) => acc + cur);
        const down: number = puzzleInput.filter((e) => e.includes('down')).map((position) => position.replace('down ', '')).map(Number).reduce((acc, cur) => acc + cur);
        return {
            position: position,
            up: up,
            down: down
        }
    }

    private calculatePositionTimesDepth(numbers: { position: number, up: number, down: number }) {
        const depth: number = numbers.down - numbers.up;
        return depth * numbers.position
    }

    //2nd part of puzzle
    private calculate2ndPartOfPuzzle(puzzleInput: Array<string>): number {
        const numbers = puzzleInput.reduce((acc, cur) => {
            if (cur.includes('forward')) {
                return {
                    ...acc,
                    position: acc.position + Number(cur.replace('forward ', '')),
                    depth: acc.depth + acc.aim * Number(cur.replace('forward ', ''))
                }
            }

            if (cur.includes('down')) {
                return {
                    ...acc,
                    aim: acc.aim + Number(cur.replace('down ', '')),
                }
            }

            if (cur.includes('up')) {
                return {
                    ...acc,
                    aim: acc.aim - Number(cur.replace('up ', '')),
                }

            }

            return acc
        }, {position: 0, depth: 0, aim: 0})
        return numbers.position * numbers.depth
    }

}
