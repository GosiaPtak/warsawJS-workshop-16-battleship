//model

class ViewComponent { //nic nie robi, nie ma konstruktora
    constructor() {
        if (new.target === ViewComponent) { //sprawdzamy, czy targetem new jest komponent ViewComponent
            throw new Error("Abstract class");
        }
    }
    getElement() {
        return this._element;
    }
}

class GameCell extends ViewComponent { //widok
    constructor(handleCellClick, row, column) {
        super();
        this._state = 'unknown'; // podkreslenie mowi ze zmienna jest prywatna - dobra praktyka
        this._element = document.createElement('td');
        const self = this;
        this._element.addEventListener('click', function() {
            handleCellClick(row, column);
        });
    }

    setState(state) {
        if (state !== 'unknown' && state !== 'miss' && state !== 'hit') {
            throw new Error('invalid state');
        }
        this._state = state;
        this._element.className = 'cell_' + state;
    };


}

class GameBoard extends ViewComponent { //widok
    constructor(handleCellClick) {
        const rowCount = 10;
        const columnCount = 10;
        super();
        this._cells = {};
        this._state = 'unknown';
        this._element = document.createElement('table');

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const row = document.createElement('tr');
            for (let cellIndex = 0; cellIndex < columnCount; cellIndex++) {
                const cell = new GameCell(handleCellClick, rowIndex, cellIndex);
                row.appendChild(cell.getElement());
                const coordinateText = rowIndex + " - " + cellIndex;
                this._cells[coordinateText] = cell;
            }
            this._element.appendChild(row);
        }
    }
    setStateAt(row, column, state) {
        const coordinateText = row + " - " + column;
        this._cells[coordinateText].setState(state);
    }
}
class GameController { // kontroler
    constructor(gameModel) {
        this._gameModel = gameModel;
    }
    handleCellClick(row, column) {
        this._gameModel.fireAt(row, column);
    }
}

// model, musi byc niezalezny
class GameModel {
    constructor() {
        const rowCount = 10;
        const columnCount = 10;
        this._cells = {};
        this._state = 'unknown';
        this._observers = [];


        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            for (let cellIndex = 0; cellIndex < columnCount; cellIndex++) {
                const modelText = rowIndex + " / " + cellIndex;
                const hasShip = (Math.random() >= 0.8);
                this._cells[modelText] = { hasShip: hasShip, firedAt: false };
            }
        }
    }
    fireAt(row, column) {
        const modelText = row + " / " + column;
        const targetCell = this._cells[modelText];
        if (targetCell.fireAt) {
            return;
        }
        targetCell.fireAt = true;
        // console.log("has ship " + targetCell.hasShip);
        const result = targetCell.hasShip ? 'hit' : 'miss';
        this._observers.forEach(function(observer) {
            observer('fireAt', { result, row, column });
        })

    }
    addObserver(observerFunction) {
        this._observers.push(observerFunction);
    }
}
class ScoreCounter {
    constructor() {
        this._element = document.createElement('p');
    }
}

// app init
const gameElement = document.getElementById('game');
let board;
let controller;
let counter;
//let model;

function handleCellClick(row, column) {
    controller.handleCellClick(row, column);
}

board = new GameBoard(handleCellClick);
const model = new GameModel();
model.addObserver(function(eventType, param) {
    switch (eventType) {
        case 'fireAt':
            board.setStateAt(param.row, param.column, param.result);
            break;
    }
});
controller = new GameController(model);
gameElement.appendChild(board.getElement());

board.setStateAt(5, 1, 'miss');