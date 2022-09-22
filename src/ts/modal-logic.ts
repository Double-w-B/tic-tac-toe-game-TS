export class ModalLogic {
  modalOverlay: HTMLDivElement;
  modalContainer: HTMLDivElement;
  selectSideContainer: HTMLDivElement;
  sideO: HTMLDivElement;
  sideX: HTMLDivElement;
  backBtn: HTMLElement;
  input: HTMLInputElement;
  btnStart: HTMLDivElement;
  playerName: HTMLParagraphElement;
  computerName: HTMLParagraphElement;
  playerSide: HTMLSpanElement;
  computerSide: HTMLSpanElement;
  inDraw: HTMLParagraphElement;
  resetBtn: NodeListOf<HTMLDivElement>;

  constructor() {
    this.modalOverlay =
      document.querySelector<HTMLDivElement>(".modal-overlay")!;
    this.modalContainer =
      document.querySelector<HTMLDivElement>(".modal-container")!;
    this.selectSideContainer = document.querySelector("container-select-side")!;
    this.sideO = document.querySelector<HTMLDivElement>(".sideO")!;
    this.sideX = document.querySelector<HTMLDivElement>(".sideX")!;
    this.backBtn = document.querySelector<HTMLElement>(".back-btn .fas")!;
    this.input = this.modalContainer.querySelector<HTMLInputElement>(".name")!;
    this.btnStart =
      this.modalContainer.querySelector<HTMLDivElement>(".btn-start")!;
    this.playerName = document.querySelector<HTMLParagraphElement>(
      ".playerName .text p"
    )!;
    this.computerName =
      document.querySelector<HTMLParagraphElement>(".computer .text p")!;

    this.playerSide = document.querySelector<HTMLSpanElement>(
      ".playerName p .side-font"
    )!;
    this.computerSide = document.querySelector<HTMLSpanElement>(
      ".computer p .side-font"
    )!;
    this.inDraw = document.querySelector<HTMLParagraphElement>(".inDraw p")!;
    this.resetBtn = document.querySelectorAll(
      ".reset-btn"
    ) as NodeListOf<HTMLDivElement>;

    this.chooseSide();
    this.btnStartGame();
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

        this.resetBtn.forEach((btn) => btn.classList.remove("active-side"));

        let player_side;
        let computer_side;

        if (this.sideX.classList.contains("chosenSide")) {
          player_side = "X";
          computer_side = "O";
          this.resetBtn[0].classList.add("active-side");
        } else {
          player_side = "O";
          computer_side = "X";
          this.resetBtn[1].classList.add("active-side");
        }

        this.playerName!.innerHTML = `${this.input.value} <br/> [<span class="side-font">${player_side}</span>]: <span class="yellow-color">0<span>`;
        this.computerName!.innerHTML = `Boris <br/> [<span class="side-font">${computer_side}</span>]: <span class="yellow-color">0<span>`;
        this.inDraw!.innerHTML = `<p>Played to <br/> a draw: <span class="red-color">0<span></p>`;
      }
    };
    this.btnStart.addEventListener("click", handleBnStartClick);
  }
}
