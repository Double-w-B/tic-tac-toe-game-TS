export class GameBoard {
    constructor() { }
    createResultsDashboard() {
        const container = document.createElement("div");
        container.className = "players no-select";
        container.appendChild(new UserSection("playerName").createUserIcon());
        container.appendChild(new UserSection("computer").createUserIcon());
        container.appendChild(new UserSection().createInDrawSection());
        return container;
    }
    createPlayingBoard() {
        const board = document.createElement("div");
        board.className = "board no-select";
        for (let i = 0; i < 9; i++) {
            const box = document.createElement("div");
            box.className = `box t${i}`;
            board.appendChild(box);
        }
        const winLine = document.createElement("div");
        winLine.className = "winLine";
        board.appendChild(winLine);
        return board;
    }
    createResetBtns() {
        const container = document.createElement("div");
        container.className = "reset";
        const wrapper = document.createElement("div");
        wrapper.className = "reset-div";
        const sideX = document.createElement("div");
        sideX.className = "reset-btn no-select";
        sideX.innerText = "X";
        const sideO = document.createElement("div");
        sideO.className = "reset-btn no-select";
        sideO.innerText = "O";
        const icon = document.createElement("i");
        icon.className = "fas fa-exchange-alt";
        wrapper.append(sideX, icon, sideO);
        container.appendChild(wrapper);
        return container;
    }
    createFooter() {
        const footer = document.createElement("footer");
        const txtParagraph = document.createElement("p");
        const link = document.createElement("a");
        link.href = "https://github.com/Double-w-B";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerText = "Władysław Balandin";
        const textNode = document.createTextNode("made by ");
        txtParagraph.append(textNode, link);
        footer.appendChild(txtParagraph);
        return footer;
    }
}
export class UserSection {
    constructor(className = "") {
        this.className = className;
    }
    createUserIcon() {
        const container = document.createElement("div");
        container.className = `${this.className}`;
        const imgContainer = document.createElement("div");
        imgContainer.className = "img-box";
        const icon = document.createElement("i");
        icon.className = "fas fa-user";
        imgContainer.appendChild(icon);
        const nameContainer = document.createElement("div");
        nameContainer.className = "text";
        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = "Name[]:";
        nameContainer.appendChild(nameParagraph);
        container.append(imgContainer, nameContainer);
        return container;
    }
    createInDrawSection() {
        const container = document.createElement("div");
        container.className = "inDraw";
        const txtParagraph = document.createElement("p");
        txtParagraph.innerText = `Played to \n a draw:`;
        container.appendChild(txtParagraph);
        return container;
    }
}
//# sourceMappingURL=gameBoard.js.map