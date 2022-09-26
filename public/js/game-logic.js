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
}
//# sourceMappingURL=game-logic.js.map