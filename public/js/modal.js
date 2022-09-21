export class Modal {
    constructor() { }
    createModal() {
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "modal-overlay";
        const modalContainer = document.createElement("div");
        modalContainer.className = "modal-container";
        const h1 = document.createElement("h1");
        h1.className = "no-select";
        h1.textContent = "Hello my friend! Wanna play with me?";
        const nameInputContainer = document.createElement("div");
        nameInputContainer.className = "name-input";
        const h2 = document.createElement("h2");
        h2.className = "no-select";
        h2.textContent = "Type your name:";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "name";
        nameInputContainer.appendChild(h2);
        nameInputContainer.appendChild(nameInput);
        const selectSideContainer = document.createElement("div");
        selectSideContainer.className = "container-select-side no-select";
        const selectSide = document.createElement("div");
        selectSide.className = "select-side";
        const sideX = document.createElement("div");
        sideX.className = "sideX";
        sideX.textContent = "X";
        const sideO = document.createElement("div");
        sideO.className = "sideO";
        sideO.textContent = "O";
        selectSide.appendChild(sideX);
        selectSide.appendChild(sideO);
        const backBtn = document.createElement("div");
        backBtn.className = "back-btn";
        const icon = document.createElement("i");
        icon.className = "fas fa-undo-alt";
        backBtn.appendChild(icon);
        selectSideContainer.appendChild(selectSide);
        selectSideContainer.appendChild(backBtn);
        const btn = document.createElement("button");
        btn.className = "btn-start no-select";
        btn.textContent = "Let's play";
        modalContainer.appendChild(h1);
        modalContainer.appendChild(nameInputContainer);
        modalContainer.appendChild(selectSideContainer);
        modalContainer.appendChild(btn);
        modalOverlay.appendChild(modalContainer);
        return modalOverlay;
    }
}
//# sourceMappingURL=modal.js.map