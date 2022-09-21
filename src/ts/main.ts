import { GameBoard } from "./gameBoard.js";
import { Modal } from "./modal.js";
import { ModalLogic } from "./modal-logic.js";

class App {
  appContainer: HTMLElement;
  constructor() {
    this.appContainer = document.getElementById("app") as HTMLElement;
    this.appContainer.appendChild(new GameBoard().createResultsDashboard());
    this.appContainer.appendChild(new GameBoard().createPlayingBoard());
    this.appContainer.appendChild(new GameBoard().createResetBtns());
    this.appContainer.appendChild(new GameBoard().createFooter());
    this.appContainer.appendChild(new Modal().createModal());
    new ModalLogic();
  }
}

new App();
