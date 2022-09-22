export class GameLogic {
    constructor() {
        this.resetBtns = document.querySelectorAll(".reset-btn");
        this.modalOverlay =
            document.querySelector(".modal-overlay");
        this.btnStart = document.querySelector(".btn-start");
        this.btnCancel = document.querySelector(".btn-cancel");
        this.playerName = document.querySelector(".playerName .text p");
        this.modalInput = document.querySelector(".name");
        this.sideO = document.querySelector(".sideO");
        this.sideX = document.querySelector(".sideX");
        this.changeSide();
    }
    changeSide() {
        const openModal = () => {
            this.modalOverlay.classList.remove("close-modal");
            this.btnStart.textContent = "Change";
            this.btnCancel.classList.remove("hide");
            this.modalInput.value = this.playerName.firstChild.textContent.trim();
            if (this.playerName.children[1].textContent === "X") {
                this.sideX.className = "sideX chosenSide";
                this.sideO.className = "sideO vsSide";
            }
            else {
                this.sideX.className = "sideX vsSide";
                this.sideO.className = "sideO chosenSide";
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
//# sourceMappingURL=game-logic.js.map