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

class GameCell extends ViewComponent {
    constructor(handleCellClick, row, column) {
        super();
        this._state = 'unknown'; // podkreslenie mowi ze zmienna jest prywatna - dobra praktyka
        this._element = document.createElement('td');
        const self = this;
        this._element.addEventListener('click', function() {
            //self.setState('miss');
            //self.handleCellClick(row, column);
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

class GameBoard extends ViewComponent {
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
class GameController {
    constructor(boardView) {
        this._boardView = boardView;
    }
    handleCellClick(row, column) {
        this._boardView.setStateAt(row, column, 'miss');
    }
}


const gameElement = document.getElementById('game');
let board;
let controller;

function handleCellClick(row, column) {
    controller.handleCellClick(row, column);
}

//const board = new GameBoard();
board = new GameBoard(handleCellClick);
controller = new GameController(board);
gameElement.appendChild(board.getElement());
board.setStateAt(5, 1, 'miss');