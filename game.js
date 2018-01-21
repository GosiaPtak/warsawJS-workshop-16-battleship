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

class GameBoard extends ViewComponent {
    constructor() {
        const rowCount = 10;
        const columnCount = 10;

        super();
        this._state = 'unknown';
        this._element = document.createElement('table');

        for (let i = 0; i < rowCount; i++) {
            const row = document.createElement('tr');
            for (let i = 0; i < columnCount; i++) {
                const cell = new GameCell;
                row.appendChild(cell.getElement());
                //this._element = document.createElement('td');
            }
            this._element.appendChild(row);
        }
    }
}
class GameCell extends ViewComponent {
    constructor() {
        super();
        this._state = 'unknown'; // podkreslenie mowi ze zmienna jest prywatna - dobra praktyka
        this._element = document.createElement('td');
        const self = this;
        this._element.addEventListener('click', function() {
            self.setState('miss');

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

const board = new GameBoard;
document.getElementById('game').appendChild(board.getElement());
//const main = document.getElementById('game');
//main.appendChild(board.getElement());

//const main = document.getElementById('game').appendChild(board.getElement());
//const gameElement = document.getElementById('game');
//const
//const row = document.createElement('tr');
//gameElement.appendChild(row);
//row.appendChild(cell1.getElement());