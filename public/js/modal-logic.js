import { getComputerData } from "./getComputerData.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
export class ModalLogic {
    constructor() {
        this.modalOverlay = $(".modal-overlay");
        this.modalContainer = $(".modal-container");
        this.sideO = $(".sideO");
        this.sideX = $(".sideX");
        this.backBtn = $(".back-btn .fas");
        this.input = $(".name");
        this.btnStart = $(".btn-start");
        this.btnCancel = $(".btn-cancel");
        this.playerNameParagraph = $(".playerName .text p");
        this.computerNameParagraph = $(".computer .text p");
        this.inDrawParagraph = $(".inDraw p");
        this.playerName = "";
        this.computerImgContainer = $(".computer .img-box");
        this.computerData = { name: "", img: "" };
        this.playerSide = "";
        this.computerSide = "";
        this.resetBtns = $$(".reset-btn");
        this.getComputerDate();
        this.chooseSide();
        this.btnStartGame();
    }
    getComputerDate() {
        new getComputerData().fetchData().then((compObj) => {
            return (this.computerData = compObj);
        });
    }
    /* Choose Side */
    chooseSide() {
        const handleClick = (e) => {
            if (e.target === this.sideX) {
                this.sideX.classList.add("chosenSide");
                this.sideO.classList.add("vsSide");
                this.backBtn.classList.add("btn-visibility");
            }
            if (e.target === this.sideO) {
                this.sideX.classList.add("vsSide");
                this.sideO.classList.add("chosenSide");
                this.backBtn.classList.add("btn-visibility");
            }
            if (e.target === this.backBtn) {
                this.sideX.classList.remove("chosenSide");
                this.sideO.classList.remove("chosenSide");
                this.sideX.classList.remove("vsSide");
                this.sideO.classList.remove("vsSide");
                this.backBtn.classList.remove("btn-visibility");
            }
        };
        this.sideX.addEventListener("click", (e) => handleClick(e));
        this.sideO.addEventListener("click", (e) => handleClick(e));
        this.backBtn.addEventListener("click", (e) => handleClick(e));
    }
    /* Start Game Button */
    btnStartGame() {
        const checkSteps = () => {
            /* this.playerName, as a flag. If player started a New game - one logic, if changed name or side during the game - another logic */
            if (this.playerName.trim().length > 0) {
                if (this.input.value.trim() !== this.playerName.trim() ||
                    (this.sideX.classList.contains("chosenSide") &&
                        this.playerSide != "X") ||
                    (this.sideO.classList.contains("chosenSide") &&
                        this.playerSide != "O")) {
                    this.btnStart.classList.add("done");
                    this.btnStart.classList.remove("block");
                }
                else {
                    this.btnStart.classList.remove("done");
                    this.btnStart.classList.add("block");
                }
            }
            else {
                if (this.input.value &&
                    (this.sideX.classList.contains("chosenSide") ||
                        this.sideX.classList.contains("vsSide"))) {
                    this.btnStart.classList.add("done");
                }
                else {
                    this.btnStart.classList.remove("done");
                }
            }
        };
        this.modalContainer.addEventListener("click", checkSteps);
        this.input.addEventListener("input", checkSteps);
        const handleBnStartClick = () => {
            if (!this.input.value || this.input.value.length < 2) {
                this.input.placeholder = "add your name";
                setTimeout(() => {
                    this.input.placeholder = "";
                }, 1000);
            }
            else if (!this.sideX.classList.contains("chosenSide") &&
                !this.sideX.classList.contains("vsSide")) {
                this.sideX.classList.add("blink-animation");
                this.sideO.classList.add("blink-animation");
                setTimeout(() => {
                    this.sideX.classList.remove("blink-animation");
                    this.sideO.classList.remove("blink-animation");
                }, 750);
            }
            else {
                this.modalOverlay.classList.add("close-modal");
                this.resetBtns.forEach((btn) => btn.classList.remove("active-side"));
                this.playerName = this.input.value;
                if (this.sideX.classList.contains("chosenSide")) {
                    this.playerSide = "X";
                    this.computerSide = "O";
                    this.resetBtns[0].classList.add("active-side");
                }
                else {
                    this.playerSide = "O";
                    this.computerSide = "X";
                    this.resetBtns[1].classList.add("active-side");
                }
                new getComputerData().fetchData().then((compObj) => {
                    return (this.computerData = compObj);
                });
                /* Create Player Name & Side */
                const playerLineBreak = document.createElement("br");
                const playerOpenSqBracket = "[";
                const playerSideSpan = document.createElement("span");
                playerSideSpan.className = "side-font";
                playerSideSpan.append(this.playerSide);
                const playerCloseSqBracket = "]: ";
                const playerWinsSpan = document.createElement("span");
                playerWinsSpan.className = "yellow-color";
                const playerWins = "0";
                playerWinsSpan.append(playerWins);
                /* Show whose turn is it */
                const playerImgContainer = $(".playerName .img-box");
                playerImgContainer.classList.add("show-turn");
                this.playerNameParagraph.textContent = "";
                this.playerNameParagraph.append(this.input.value, playerLineBreak, playerOpenSqBracket, playerSideSpan, playerCloseSqBracket, playerWinsSpan);
                /* Create Computer Name & Side */
                const computerLineBreak = document.createElement("br");
                const computerOpenSqBracket = "[";
                const computerSideSpan = document.createElement("span");
                computerSideSpan.className = "side-font";
                computerSideSpan.append(this.computerSide);
                const computerCloseSqBracket = "]: ";
                const computerWinsSpan = document.createElement("span");
                computerWinsSpan.className = "yellow-color";
                const computerWins = "0";
                computerWinsSpan.append(computerWins);
                this.computerNameParagraph.textContent = "";
                this.computerNameParagraph.append(this.computerData.name, computerLineBreak, computerOpenSqBracket, computerSideSpan, computerCloseSqBracket, computerWinsSpan);
                /* Create InDraw Section */
                const inDrawTxtNodeStart = document.createTextNode("Played to ");
                const inDrawLineBreak = document.createElement("br");
                const inDrawTxtNodeEnd = document.createTextNode(" a draw: ");
                const inDrawSpan = document.createElement("span");
                inDrawSpan.className = "red-color";
                const inDrawGames = "0";
                inDrawSpan.append(inDrawGames);
                this.inDrawParagraph.textContent = "";
                this.inDrawParagraph.append(inDrawTxtNodeStart, inDrawLineBreak, inDrawTxtNodeEnd, inDrawSpan);
                const img = document.createElement("img");
                img.src = this.computerData.img;
                this.computerImgContainer.removeChild(this.computerImgContainer.children[0]);
                this.computerImgContainer.append(img);
            }
        };
        this.btnStart.addEventListener("click", handleBnStartClick);
    }
}
//# sourceMappingURL=modal-logic.js.map