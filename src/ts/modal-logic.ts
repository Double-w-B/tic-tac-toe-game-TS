import { getComputerData } from "./getComputerData.js";
import { ComputerObj } from "./getComputerData.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export class ModalLogic {
  modalOverlay: HTMLDivElement;
  modalContainer: HTMLDivElement;
  sideO: HTMLDivElement;
  sideX: HTMLDivElement;
  backBtn: HTMLElement;
  input: HTMLInputElement;
  btnStart: HTMLButtonElement;
  btnCancel: HTMLButtonElement;
  playerName: HTMLParagraphElement;
  computerName: HTMLParagraphElement;
  computerImgContainer: HTMLDivElement;
  computerData: ComputerObj;
  playerSide: HTMLSpanElement;
  computerSide: HTMLSpanElement;
  inDraw: HTMLParagraphElement;
  resetBtns: NodeListOf<HTMLDivElement>;

  constructor() {
    this.modalOverlay = $(".modal-overlay") as HTMLDivElement;
    this.modalContainer = $(".modal-container") as HTMLDivElement;
    this.sideO = $(".sideO") as HTMLDivElement;
    this.sideX = $(".sideX") as HTMLDivElement;
    this.backBtn = $(".back-btn .fas") as HTMLElement;
    this.input = $(".name") as HTMLInputElement;
    this.btnStart = $(".btn-start") as HTMLButtonElement;
    this.btnCancel = $(".btn-cancel") as HTMLButtonElement;
    this.playerName = $(".playerName .text p") as HTMLParagraphElement;
    this.computerName = $(".computer .text p") as HTMLParagraphElement;
    this.computerImgContainer = $(".computer .img-box") as HTMLImageElement;
    this.computerData = { name: "", img: "" };

    this.playerSide = $(".playerName p .side-font") as HTMLSpanElement;
    this.computerSide = $(".computer p .side-font") as HTMLSpanElement;
    this.inDraw = $(".inDraw p") as HTMLParagraphElement;
    this.resetBtns = $$(".reset-btn") as NodeListOf<HTMLDivElement>;

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
    const handleClick = (e: MouseEvent) => {
      if (e.target === this.sideX) {
        this.sideX!.classList.add("chosenSide");
        this.sideO!.classList.add("vsSide");
        this.backBtn!.classList.add("btn-visibility");
      }

      if (e.target === this.sideO) {
        this.sideX!.classList.add("vsSide");
        this.sideO!.classList.add("chosenSide");
        this.backBtn!.classList.add("btn-visibility");
      }

      if (e.target === this.backBtn) {
        this.sideX!.classList.remove("chosenSide");
        this.sideO!.classList.remove("chosenSide");
        this.sideX!.classList.remove("vsSide");
        this.sideO!.classList.remove("vsSide");
        this.backBtn!.classList.remove("btn-visibility");
      }
    };
    this.sideX!.addEventListener("click", (e) => handleClick(e));
    this.sideO!.addEventListener("click", (e) => handleClick(e));
    this.backBtn!.addEventListener("click", (e) => handleClick(e));
  }

  /* Start Game Button */
  btnStartGame() {
    const checkSteps = () => {
      this.input.value &&
      (this.sideX.classList.contains("chosenSide") ||
        this.sideX.classList.contains("vsSide"))
        ? this.btnStart.classList.add("done")
        : this.btnStart.classList.remove("done");
    };

    this.modalContainer.addEventListener("click", checkSteps);
    this.input.addEventListener("input", checkSteps);

    const handleBnStartClick = () => {
      if (!this.input.value || this.input.value.length < 2) {
        this.input.placeholder = "add your name";
        setTimeout(() => {
          this.input.placeholder = "";
        }, 1000);
      } else if (
        !this.sideX.classList.contains("chosenSide") &&
        !this.sideX.classList.contains("vsSide")
      ) {
        this.sideX.classList.add("blink-animation");
        this.sideO.classList.add("blink-animation");
        setTimeout(() => {
          this.sideX.classList.remove("blink-animation");
          this.sideO.classList.remove("blink-animation");
        }, 750);
      } else {
        this.modalOverlay.classList.add("close-modal");

        this.resetBtns.forEach((btn) => btn.classList.remove("active-side"));

        let player_side;
        let computer_side;

        if (this.sideX.classList.contains("chosenSide")) {
          player_side = "X";
          computer_side = "O";
          this.resetBtns[0].classList.add("active-side");
        } else {
          player_side = "O";
          computer_side = "X";
          this.resetBtns[1].classList.add("active-side");
        }

        new getComputerData().fetchData().then((compObj) => {
          return (this.computerData = compObj);
        });

        this.playerName!.innerHTML = `${this.input.value} <br/> [<span class="side-font">${player_side}</span>]: <span class="yellow-color">0<span>`;

        this.computerName!.innerHTML = `${this.computerData.name} <br/> [<span class="side-font">${computer_side}</span>]: <span class="yellow-color">0<span>`;
        this.inDraw!.innerHTML = `<p>Played to <br/> a draw: <span class="red-color">0<span></p>`;

        const img = document.createElement("img");
        img.src = this.computerData.img;
        this.computerImgContainer.removeChild(
          this.computerImgContainer.children[0]
        );
        this.computerImgContainer.append(img);
      }
    };
    this.btnStart.addEventListener("click", handleBnStartClick);
  }
}
