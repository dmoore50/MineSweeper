let cells; 
let rows; 
let cellWidth; 
let cols; 
let numberOfMines;
let numberOfCells = 81;  
let gameOver = true; 
let buttonCreated = true;
let revealedCells = 0; 
 

function setup(){
createGame(numberOfCells); 

}

function createGame(numberOfCells){
    createCanvas(400,400); 

    cols = sqrt(numberOfCells);
    rows = cols; 
    cellWidth = width/cols;
    cells = new Array(cols);
    numberOfMines = sqrt(numberOfCells);   
    
    for(let i = 0; i < cols; i++){
        cells[i] = new Array(rows);
        for(let j = 0; j < rows; j++){
            cells[i][j] = new Cell(cellWidth * i, cellWidth * j, cellWidth,i, j); 
        } 
    }

    for(let i = 0; i < cells.length; i++){
        for(let j = 0; j < rows; j++){
            cells[i][j].findNeighbors(i, j, cells);
        }
    }

    for(let i = 0; i < numberOfMines; i++){
        let randomI = random(cells); 
        let randomCell = random(randomI);
        if(!randomCell.isMine){
            randomCell.isMine = true; 
        }else{
            i--; 
        }
    }

    for(let i = 0; i < cells.length; i++){
        for(let j = 0; j < rows; j++){
            cells[i][j].countNeighbors();
        }
    }
    revealedCells = 0; 
    gameOver = false; 
}

function draw(){
    if(!gameOver){

        for(let i = 0; i < cells.length; i++){
            for(let j = 0; j < cells[i].length; j++){
                let cell = cells[i][j]; 
                cell.isHovered = false; 
                cell.checkHovered(mouseX, mouseY); 
                cell.show();
                if(cell.exploded){
                    gameOver = true; 
                }else if(cell.isRevealed && cell.isBlank){
                    for(let k = cell.neighbors.length - 1; k >= 0; k--){
                        cell.neighbors[k].isRevealed = true; 
                    }
                }

                if(cell.isRevealed && !cell.counted){
                    revealedCells ++; 
                    cell.counted = true;
                }

            }
        }
        if(revealedCells == numberOfCells - numberOfMines){
            document.getElementById("GameWin").innerHTML = "You Win!";
            gameOver = true; 
        }
    }else if(gameOver){
        for(let i = 0; i < cells.length; i++){
            for(let j = 0; j < rows; j++){
                let cell = cells[i][j];
                if(cell.isMine && !cell.exploded){
                    cell.isRevealed = true; 
                }
                cell.show();
            }
        }
        document.getElementById("GameWin").innerHTML = "YOU DUMB BITCH";
    }

}

function mousePressed(){
    if(mouseButton == LEFT){
        if(gameOver){
            setup(); 
        }
        if(!gameOver){
            for(let i = 0; i < cells.length; i++){
                for(let j = 0; j < rows; j++){
                    cell = cells[i][j];
                    if(mouseX > cell.pos.x && mouseX < cell.pos.x + cell.cellWidth){
                        if(mouseY > cell.pos.y && mouseY < cell.pos.y + cell.cellWidth){
                            if(!cell.isRevealed && !cell.isFlagged){
                                cell.isRevealed = true; 
                                if(cell.isMine){
                                    cell.exploded = true; 
                                }
                            }

                        }
                    }
                }
            }
        }
    }
    if(mouseButton == CENTER){
        for(let i = 0; i < cells.length; i++){
            for(let j = 0; j < rows; j++){
                cell = cells[i][j];
                if(mouseX > cell.pos.x && mouseX < cell.pos.x + cell.cellWidth && mouseY > cell.pos.y && mouseY < cell.pos.y + cellWidth){
                    if(!cell.isFlagged){
                        cell.isFlagged = true; 
                    }else{
                        cell.isFlagged = false; 
                    }
                }

            }
        }
    }

    return false; 
}

function newGame(cellNumbers){
    createGame(cellNumbers)
    gameOver = false; 
    buttonCreated = false; 
}



