import { ModalLogic } from "./modal-logic.js";
import { numberCombinations } from "./winNumberCombinations.js";
const $ = document.querySelector.bind(document);
export class GameLogic {
    constructor() {
        this.allPossibleClicks = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
        this.allMadeClicks = [];
        this.playerClicks = [];
        this.compClicks = [];
        this.changeTurn = true;
        this.playerWins = 0;
        this.computerWins = 0;
        this.gameInDraw = 0;
        this.endGame = false;
        this.board = document.querySelector(".board");
        this.boardBoxes = Array.from(this.board.children);
        this.changeSide();
        this.boardClicks();
    }
    changeSide() {
        const modal = new ModalLogic();
        const openModal = () => {
            modal.modalOverlay.classList.remove("close-modal");
            modal.btnStart.textContent = "Change";
            modal.btnCancel.classList.remove("hide");
            modal.input.value =
                modal.playerNameParagraph.firstChild.textContent.trim();
            if (modal.playerNameParagraph.children[1].textContent === "X") {
                modal.sideX.className = "sideX chosenSide";
                modal.sideO.className = "sideO vsSide";
                modal.btnStart.classList.remove("done");
            }
            else {
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
    refreshBoard() {
        this.boardBoxes.forEach((box) => {
            box.textContent = "";
        });
        this.allMadeClicks = [];
        this.playerClicks = [];
        this.compClicks = [];
    }
    checkSetOfNumbers(arr, side) {
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
    }
    /* Add Comp Click to an array */
    appendComputerClick(number) {
        this.compClicks.push(number);
        this.allMadeClicks.push(number);
    }
    computerClickSpeed() {
        let computerClickSpeed;
        const speedRate = [1600, 2000, 2300];
        let ranNum = Math.floor(Math.random() * speedRate.length);
        if (computerClickSpeed !== ranNum)
            computerClickSpeed = ranNum;
        if (ranNum === computerClickSpeed) {
            computerClickSpeed += 1;
            if (computerClickSpeed > speedRate.length - 1)
                computerClickSpeed = 0;
        }
        return speedRate[computerClickSpeed];
    }
    randomComputerClick() {
        /* Generate random click */
        let found = this.allPossibleClicks.filter((number) => this.allMadeClicks.indexOf(number) < 0);
        let randomNumber = found[Math.floor(Math.random() * found.length)];
        let randomClick = randomNumber.toString();
        return randomClick;
    }
    showWinLine(position) {
        const winLine = document.querySelector(".winLine");
        this.boardBoxes.forEach((box) => box.classList.add("mouse-block"));
        winLine.classList.add(position);
        const showLine = setTimeout(() => {
            winLine.classList.remove(position);
            this.refreshBoard();
            this.boardBoxes.forEach((box) => box.classList.remove("mouse-block"));
        }, 1500);
        return () => clearTimeout(showLine);
    }
    checkWin() {
        if (this.playerClicks.length >= 3 || this.compClicks.length >= 3) {
            if (this.checkSetOfNumbers(["0", "1", "2"], "player")) {
                this.showWinLine("horizontalTopWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["0", "1", "2"], "comp")) {
                this.showWinLine("horizontalTopWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["3", "4", "5"], "player")) {
                this.showWinLine("horizontalMidWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["3", "4", "5"], "comp")) {
                this.showWinLine("horizontalMidWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["6", "7", "8"], "player")) {
                this.showWinLine("horizontalBotWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["6", "7", "8"], "comp")) {
                this.showWinLine("horizontalBotWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["0", "3", "6"], "player")) {
                this.showWinLine("verticalLeftWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["0", "3", "6"], "comp")) {
                this.showWinLine("verticalLeftWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["1", "4", "7"], "player")) {
                this.showWinLine("verticalMidWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["1", "4", "7"], "comp")) {
                this.showWinLine("verticalMidWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["2", "5", "8"], "player")) {
                this.showWinLine("verticalRightWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["2", "5", "8"], "comp")) {
                this.showWinLine("verticalRightWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["2", "4", "6"], "player")) {
                this.showWinLine("rightAngleWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["2", "4", "6"], "comp")) {
                this.showWinLine("rightAngleWin");
                this.computerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["0", "4", "8"], "player")) {
                this.showWinLine("leftAngleWin");
                this.playerWins++;
                this.endGame = true;
            }
            if (this.checkSetOfNumbers(["0", "4", "8"], "comp")) {
                this.showWinLine("leftAngleWin");
                this.computerWins++;
                this.endGame = true;
            }
        }
        if (this.allMadeClicks.length === 9 && !this.endGame) {
            const numberContainer = $(".red-color");
            setTimeout(() => {
                this.gameInDraw++;
                const drawNumber = document.createTextNode(this.gameInDraw.toString());
                numberContainer.textContent = "";
                numberContainer.appendChild(drawNumber);
                this.endGame = true;
                this.refreshBoard();
            }, 1500);
        }
        if (this.endGame) {
            const playerWinsContainer = $(".playerName .yellow-color");
            const computerWinsContainer = $(".computer .yellow-color");
            playerWinsContainer.textContent = "";
            const playerWinsNum = document.createTextNode(this.playerWins.toString());
            playerWinsContainer.appendChild(playerWinsNum);
            computerWinsContainer.textContent = "";
            const computerWinsNum = document.createTextNode(this.computerWins.toString());
            computerWinsContainer.appendChild(computerWinsNum);
            this.endGame = false;
        }
    }
    boardClicks() {
        const modal = new ModalLogic();
        const handleClick = (e) => {
            const targetedEl = e.target;
            const click = targetedEl.id.slice(1);
            /* Show Comp Click */
            const writeCompClick = (number) => {
                this.boardBoxes.map((box) => {
                    if (number === box.id.slice(1)) {
                        box.append(modal.computerSide);
                    }
                });
                this.changeTurn = true;
            };
            /* Handle player click */
            if (this.allMadeClicks.includes(click) || !this.changeTurn) {
                return;
            }
            else {
                this.playerClicks.push(click);
                this.allMadeClicks.push(click);
                targetedEl.append(modal.playerSide);
                this.changeTurn = false;
                this.checkWin();
            }
            const computerTurn = setTimeout(() => {
                let madeClick = false;
                const fillIn = (data) => {
                    this.appendComputerClick(data);
                    writeCompClick(data);
                    this.checkWin();
                    madeClick = true;
                };
                numberCombinations.map((set) => {
                    let firstPart = set.slice(0, 2);
                    let secondPart = set.slice(-1).toString();
                    if (!madeClick &&
                        this.checkSetOfNumbers(firstPart, "comp") &&
                        !this.allMadeClicks.includes(secondPart)) {
                        fillIn(secondPart);
                    }
                });
                numberCombinations.map((set) => {
                    let firstPart = set.slice(0, 2);
                    let secondPart = set.slice(-1).toString();
                    if (!madeClick &&
                        this.checkSetOfNumbers(firstPart, "player") &&
                        !this.allMadeClicks.includes(secondPart)) {
                        fillIn(secondPart);
                    }
                });
                if (!madeClick && this.allMadeClicks.length < 9) {
                    fillIn(this.randomComputerClick());
                }
            }, this.computerClickSpeed());
            return () => clearTimeout(computerTurn);
        };
        this.board.addEventListener("click", (e) => handleClick(e));
    }
}
//# sourceMappingURL=game-logic.js.map