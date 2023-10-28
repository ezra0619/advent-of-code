import {Component, OnInit} from '@angular/core';
import {puzzleInput} from "./puzzleInput";

enum OpponentPlay {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C'
}

enum ElfPlay {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSORS = 'Z'
}

enum NecessaryOutcome {
  LOSE = 'X',
  DRAW = 'Y',
  WIN = 'Z'
}

interface RoundSigns {
  opponentHand: OpponentPlay,
  elfHand: ElfPlay | NecessaryOutcome
}

@Component({
  selector: 'app-aoc-day2-of2022',
  templateUrl: './aoc-day2-of2022.component.html',
})
export class AocDay2Of2022Component implements OnInit {

  private puzzleInput: Array<RoundSigns> = this.curatePuzzle(puzzleInput)

  ngOnInit() {
    /// PART 1
    const roundOneResponse: number = this.puzzleInput.reduce((previousValue, currentValue) => {
      return previousValue + this.calculatePartOneRoundOutcome(currentValue)
    }, 0)
    /// PART 2
    const roundTwoResponse: number = this.puzzleInput.reduce((previousValue, currentValue) => {
      return previousValue + this.calculatePartTwoRoundOutcome(currentValue)
    }, 0)
  }


  private curatePuzzle(puzzleInput: string): Array<RoundSigns> {
    return puzzleInput.split('\n').map((e) => e.split(' ')).map((e) => {
      return {
        opponentHand: e[0],
        elfHand: e[1]
      } as RoundSigns
    })
  }

  /// PART 1
  private calculatePartOneRoundOutcome(round: RoundSigns): number {
    return this.getPointsForMatchOutcome(round.opponentHand, round.elfHand as ElfPlay) + this.getPointsForOwnPlay(round.elfHand as ElfPlay)
  }

  private getPointsForMatchOutcome(opponentHand: OpponentPlay, elfHand: ElfPlay): number {
    if (opponentHand === OpponentPlay.ROCK) {
      switch (elfHand) {
        case ElfPlay.SCISSORS:
          return 0;
        case ElfPlay.PAPER:
          return 6;
        case ElfPlay.ROCK:
          return 3;
      }
    }

    if (opponentHand === OpponentPlay.PAPER) {
      switch (elfHand) {
        case ElfPlay.SCISSORS:
          return 6;
        case ElfPlay.PAPER:
          return 3;
        case ElfPlay.ROCK:
          return 0;
      }
    }

    if (opponentHand === OpponentPlay.SCISSORS) {
      switch (elfHand) {
        case ElfPlay.SCISSORS:
          return 3;
        case ElfPlay.PAPER:
          return 0;
        case ElfPlay.ROCK:
          return 6;
      }
    }

    return 0;
  }

  private getPointsForOwnPlay(elfHandShape: ElfPlay | null): number {
    switch (elfHandShape) {
      case ElfPlay.ROCK:
        return 1
      case ElfPlay.PAPER:
        return 2
      case ElfPlay.SCISSORS:
        return 3
      default:
        return 0;
    }
  }

  /// PART 2
  private calculateNextMove(opponentPlay: OpponentPlay, neededOutcome: NecessaryOutcome): ElfPlay | null {
    if (neededOutcome === NecessaryOutcome.WIN) {
      switch (opponentPlay) {
        case OpponentPlay.SCISSORS:
          return ElfPlay.ROCK;
        case OpponentPlay.PAPER:
          return ElfPlay.SCISSORS;
        case OpponentPlay.ROCK:
          return ElfPlay.PAPER;
      }
    }

    if (neededOutcome === NecessaryOutcome.LOSE) {
      switch (opponentPlay) {
        case OpponentPlay.SCISSORS:
          return ElfPlay.PAPER;
        case OpponentPlay.PAPER:
          return ElfPlay.ROCK;
        case OpponentPlay.ROCK:
          return ElfPlay.SCISSORS;
      }
    }

    if (neededOutcome === NecessaryOutcome.DRAW) {
      switch (opponentPlay) {
        case OpponentPlay.SCISSORS:
          return ElfPlay.SCISSORS;
        case OpponentPlay.PAPER:
          return ElfPlay.PAPER;
        case OpponentPlay.ROCK:
          return ElfPlay.ROCK;
      }
    }
    return null;
  }

  private calculateMatchOutcomePoints(neededOutcome: NecessaryOutcome): number {
    switch (neededOutcome) {
      case NecessaryOutcome.LOSE:
        return 0
      case NecessaryOutcome.DRAW:
        return 3
      case NecessaryOutcome.WIN:
        return 6
      default:
        return 0;
    }
  }

  private calculatePartTwoRoundOutcome(round: RoundSigns): number {
    return this.calculateMatchOutcomePoints(round.elfHand as NecessaryOutcome) + this.getPointsForOwnPlay(this.calculateNextMove(round.opponentHand, round.elfHand as NecessaryOutcome))
  }
}
