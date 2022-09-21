import { GameBoard } from "./gameBoard.js";
import { Modal } from "./modal.js";
class App {
    constructor() {
        this.appContainer = document.getElementById("app");
        this.appContainer.appendChild(new GameBoard().createResultsDashboard());
        this.appContainer.appendChild(new GameBoard().createPlayingBoard());
        this.appContainer.appendChild(new GameBoard().createResetBtns());
        this.appContainer.appendChild(new GameBoard().createFooter());
        this.appContainer.appendChild(new Modal().createModal());
    }
}
new App();
//# sourceMappingURL=main.js.map