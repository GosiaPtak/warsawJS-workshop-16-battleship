const gameElement = document.getElementById('game');
const row = document.createElement('tr');
const cell = document.createElement('td');
const cell1 = document.createElement('td');

gameElement.appendChild(row);
gameElement.appendChild(row);
row.appendChild(cell);
row.appendChild(cell1);

//observer is part of controller

const cells = [cell, cell1];

for (let i = 0; i < cells.length; i++) {
    const currentCell = cells[i];
    currentCell.addEventListener('click', function() {
        currentCell.classList.add('clicked');
    })
}

//cell.addEventListener('click', function() {
//    cell.classList.add('clicked');
//});

//cell1.addEventListener('click', function() {
//   event.target.classList.add('clicked');
//});