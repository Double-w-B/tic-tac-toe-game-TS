export class GameLogic {
  resetBtns: NodeListOf<HTMLDivElement>;
  modalOverlay: HTMLDivElement;
  btnStart: HTMLButtonElement;
  btnCancel: HTMLButtonElement;
  playerName: HTMLParagraphElement;
  modalInput: HTMLInputElement;
  sideO: HTMLDivElement;
  sideX: HTMLDivElement;

  constructor() {
    this.resetBtns = document.querySelectorAll(
      ".reset-btn"
    ) as NodeListOf<HTMLDivElement>;
    this.modalOverlay =
      document.querySelector<HTMLDivElement>(".modal-overlay")!;
    this.btnStart = document.querySelector<HTMLButtonElement>(".btn-start")!;
    this.btnCancel = document.querySelector<HTMLButtonElement>(".btn-cancel")!;
    this.playerName = document.querySelector<HTMLParagraphElement>(
      ".playerName .text p"
    )!;
    this.modalInput = document.querySelector<HTMLInputElement>(".name")!;
    this.sideO = document.querySelector<HTMLDivElement>(".sideO")!;
    this.sideX = document.querySelector<HTMLDivElement>(".sideX")!;

    this.changeSide();
  }

  changeSide() {
    const openModal = () => {
      this.modalOverlay.classList.remove("close-modal");
      this.btnStart!.textContent = "Change";
      this.btnCancel!.classList.remove("hide");
      this.modalInput!.value = this.playerName.firstChild!.textContent!.trim();

      if (this.playerName.children[1].textContent === "X") {
        this.sideX!.className = "sideX chosenSide";
        this.sideO!.className = "sideO vsSide";
      } else {
        this.sideX!.className = "sideX vsSide";
        this.sideO!.className = "sideO chosenSide";
      }
    };

    const closeModal = () => {
      this.modalOverlay.classList.add("close-modal");
    };

    this.btnCancel.addEventListener("click", closeModal);

    this.resetBtns.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });
  }
}
