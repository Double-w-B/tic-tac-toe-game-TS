import { ModalLogic } from "./modal-logic.js";
import { numberCombinations } from "./winNumberCombinations.js";
// import { checkSet } from "./checkSet.js";

export class GameLogic {
  allPossibleClicks: string[];
  allMadeClicks: string[];
  playerClicks: string[];
  compClicks: string[];
  board: HTMLDivElement;
  changeTurn: boolean;
  boardBoxes: HTMLDivElement[];

  constructor() {
    this.allPossibleClicks = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    this.allMadeClicks = [];
    this.playerClicks = [];
    this.compClicks = [];
    this.changeTurn = true;

    this.board = document.querySelector(".board") as HTMLDivElement;
    this.boardBoxes = Array.from(this.board.children) as HTMLDivElement[];

    this.changeSide();
    this.boardClicks();
  }

  changeSide(): void {
    const modal = new ModalLogic();
    const openModal = () => {
      modal.modalOverlay.classList.remove("close-modal");
      modal.btnStart.textContent = "Change";
      modal.btnCancel.classList.remove("hide");
      modal.input.value =
        modal.playerNameParagraph.firstChild!.textContent!.trim();

      if (modal.playerNameParagraph.children[1].textContent === "X") {
        modal.sideX.className = "sideX chosenSide";
        modal.sideO.className = "sideO vsSide";
        modal.btnStart.classList.remove("done");
      } else {
        modal.sideX.className = "sideX vsSide";
        modal.sideO.className = "sideO chosenSide";
      }
    };

    const closeModal = () => {
      modal.modalOverlay.classList.add("close-modal");
    };

    modal.btnCancel.addEventListener("click", closeModal);

    modal.resetBtns.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });
  }

  boardClicks() {
    const modal = new ModalLogic();

    const handleClick = (e: MouseEvent) => {
      const targetedEl = e.target as HTMLDivElement;
      const click = targetedEl.id.slice(1);

      const checkSet = (arr: string[], side: string): boolean | void => {
        if (side === "player") {
          let success = arr.every((val) => {
            return this.playerClicks.indexOf(val) !== -1;
          });
          return success;
        }
        if (side === "comp") {
          let success = arr.every((val) => {
            return this.compClicks.indexOf(val) !== -1;
          });
          return success;
        }
      };

      /* Show Comp Click */
      const writeCompClick = (click: string) => {
        this.boardBoxes.map((box) => {
          if (click === box.id.slice(1)) {
            box.append(modal.computerSide);
          }
        });
        this.changeTurn = true;
      };

      /* Add Comp Click to an array */
      const addItem = (number: string) => {
        this.compClicks.push(number);
        this.allMadeClicks.push(number);
      };

      /* Computer click speed */
      let computerClickSpeed;

      const speedRate = [1600, 2000, 2300];
      let ranNum = Math.floor(Math.random() * speedRate.length);
      if (computerClickSpeed !== ranNum) computerClickSpeed = ranNum;

      if (ranNum === computerClickSpeed) {
        computerClickSpeed += 1;
        if (computerClickSpeed > speedRate.length - 1) computerClickSpeed = 0;
      }

      /* Handle player click */
      if (this.allMadeClicks.includes(click) || !this.changeTurn) {
        return;
      } else {
        this.playerClicks.push(click);
        this.allMadeClicks.push(click);
        targetedEl.append(modal.playerSide);
        this.changeTurn = false;
        // checkGame();
      }
      const computerTurn = setTimeout(() => {
        let madeClick = false;

        const fillIn = (data: string) => {
          addItem(data);
          writeCompClick(data);
          madeClick = true;
        };

        numberCombinations.map((set) => {
          let firstPart = set.slice(0, 2);
          let secondPart = set.slice(-1).toString();

          if (
            !madeClick &&
            checkSet(firstPart, "comp") &&
            !this.allMadeClicks.includes(secondPart)
          ) {
            fillIn(secondPart);
          }
        });

        numberCombinations.map((set) => {
          let firstPart = set.slice(0, 2);
          let secondPart = set.slice(-1).toString();
          if (
            !madeClick &&
            checkSet(firstPart, "player") &&
            !this.allMadeClicks.includes(secondPart)
          ) {
            fillIn(secondPart);
          }
        });

        if (!madeClick && this.allMadeClicks.length < 9) {
          /* Generate random click */
          let found = this.allPossibleClicks.filter(
            (number) => this.allMadeClicks.indexOf(number) < 0
          );

          let randomNumber = found[Math.floor(Math.random() * found.length)];

          let randomClick = randomNumber.toString();

          fillIn(randomClick);
        }
      }, speedRate[computerClickSpeed]);
      // checkGame();

      return () => clearTimeout(computerTurn);
    };

    this.board.addEventListener("click", (e) => handleClick(e));
  }
}
