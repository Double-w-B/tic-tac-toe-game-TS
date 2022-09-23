import { ModalLogic } from "./modal-logic.js";
export class GameLogic {
    constructor() {
        this.changeSide();
    }
    changeSide() {
        const modal = new ModalLogic();
        const openModal = () => {
            modal.modalOverlay.classList.remove("close-modal");
            modal.btnStart.textContent = "Change";
            modal.btnCancel.classList.remove("hide");
            modal.input.value = modal.playerName.firstChild.textContent.trim();
            if (modal.playerName.children[1].textContent === "X") {
                modal.sideX.className = "sideX chosenSide";
                modal.sideO.className = "sideO vsSide";
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
}
//# sourceMappingURL=game-logic.js.map