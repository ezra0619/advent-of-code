import {Component, OnInit} from '@angular/core';
import {puzzleInput, puzzleInstructions} from "./puzzleInput";

interface BoxMovingInstruction {
  nrOfBoxesToMove: number;
  fromColumn: number;
  toColumn: number;
}

@Component({
  selector: 'app-aoc-day5-of2022',
  templateUrl: './aoc-day5-of2022.component.html',
})
export class AocDay5Of2022Component implements OnInit {

  private miniPuzzleInput: Array<Array<string>> = [['[N]', '[Z]'], ['[D]', '[C]', '[M]'], ['[P]']]

  private miniPuzzleInstructions: string = `
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

  public ngOnInit(): void {
    const parsedMiniPuzzleInstructions: Array<BoxMovingInstruction> = this.parsePuzzleInstructions(this.miniPuzzleInstructions)
    const parsedPuzzleInstructions: Array<BoxMovingInstruction> = this.parsePuzzleInstructions(puzzleInstructions)

    //Part 1
    const rearrangedBoxesMini: string = this.executePuzzleInstructions(this.miniPuzzleInput, parsedMiniPuzzleInstructions, "One")
    const rearrangedBoxes: string = this.executePuzzleInstructions(puzzleInput, parsedPuzzleInstructions, 'One')
    //Part 2
    const rearrangedBoxesMiniPartTwo: string = this.executePuzzleInstructions(this.miniPuzzleInput, parsedMiniPuzzleInstructions, "Two")
    const rearrangedBoxesPartTwo: string = this.executePuzzleInstructions(puzzleInput, parsedPuzzleInstructions, "Two")
  }


  private parsePuzzleInstructions(puzzleInstructions: string): Array<BoxMovingInstruction> {
    return puzzleInstructions.split(`\n`).filter((e) => e !== '').map((instruction) => {
      const parsedInstruction: Array<number> = instruction.split(' ').filter((e) => e !== 'move' && e !== 'from' && e !== 'to').map(Number)
      return {
        nrOfBoxesToMove: parsedInstruction[0],
        fromColumn: parsedInstruction[1],
        toColumn: parsedInstruction[2]
      }
    })
  }

  private executePuzzleInstructions(puzzleInput: Array<Array<string>>, puzzleInstructions: Array<BoxMovingInstruction>, puzzlePart: 'One' | 'Two'): string {
    let boxesToBeRearranged: Array<Array<string>> = JSON.parse(JSON.stringify(puzzleInput));
    let movingInstructions: Array<BoxMovingInstruction> = [...puzzleInstructions];

    for(let movingInstruction of movingInstructions) {
      if (puzzlePart === 'One') {
        boxesToBeRearranged = this.moveBoxesPartOne(boxesToBeRearranged, movingInstruction)
      }
      if (puzzlePart === 'Two') {
        boxesToBeRearranged = this.moveBoxesPartTwo(boxesToBeRearranged, movingInstruction)

      }
    }

    return boxesToBeRearranged.reduce((previousValue, currentValue) => {
      return previousValue + '' + currentValue[0].replace('[', '').replace(']', '')
    }, '');
  }

  private moveBoxesPartOne(puzzleInput: Array<Array<string>>, movingInstruction: BoxMovingInstruction): Array<Array<string>> {
    let boxesToBeRearranged: Array<Array<string>> = JSON.parse(JSON.stringify(puzzleInput));
    if (movingInstruction.nrOfBoxesToMove === 0) {
      return boxesToBeRearranged
    }

    for(let boxesToMove: number = 1; boxesToMove <= movingInstruction.nrOfBoxesToMove; boxesToMove++) {
      const boxToMove: string | undefined = boxesToBeRearranged[movingInstruction.fromColumn - 1]?.reverse().pop()
      if (typeof boxToMove === "string") {
        boxesToBeRearranged[movingInstruction.toColumn - 1]?.reverse().push(boxToMove)
        boxesToBeRearranged[movingInstruction.toColumn - 1]?.reverse()
      }
      boxesToBeRearranged[movingInstruction.fromColumn - 1]?.reverse()
    }
    return boxesToBeRearranged;
  }

  private moveBoxesPartTwo(puzzleInput: Array<Array<string>>, movingInstruction: BoxMovingInstruction): Array<Array<string>> {
    let boxesToBeRearranged: Array<Array<string>> = JSON.parse(JSON.stringify(puzzleInput));
    if (movingInstruction.nrOfBoxesToMove === 0) {
      return boxesToBeRearranged
    }

    const boxesToBeMoved = boxesToBeRearranged[movingInstruction.fromColumn - 1].slice(0, movingInstruction.nrOfBoxesToMove);
    boxesToBeRearranged[movingInstruction.fromColumn - 1].splice(0, movingInstruction.nrOfBoxesToMove)
    boxesToBeRearranged[movingInstruction.toColumn - 1].splice(0, 0, ...boxesToBeMoved)
    return boxesToBeRearranged;
  }
}
