class Cell{
  constructor(x, y, cellWidth, iIndex, jIndex){
    this.pos = createVector(x,y);
    this.cellWidth = cellWidth; 
    this.isMine = false; 
    this.isBlank = false; 
    this.isNUmber = false; 
    this.value = 0; 
    this.isHovered = false; 
    this.cellColor = color('white'); 
    this.neighbors = [];
    this.iIndex = iIndex; 
    this.jIndex = jIndex; 
    this.exploded = false; 
    this.isRevealed = false; 
    this.isFlagged = false; 
  }

  show(){
    stroke('black');
    strokeWeight(2);
    this.cellColor = color('gray');
    if(this.isRevealed){
        this.cellColor = color('white'); 
    }
    else if(this.isHovered){
      this.cellColor = color('lightGray');  
    }
    fill(this.cellColor);
    rect(this.pos.x, this.pos.y, cellWidth);  
    textAlign(CENTER);
    fill('black');
    textSize(25); 
    if(this.isMine){
        this.value = "💣"; 
        this.isBlank = false; 
    }if(this.exploded){
        this.value = "💥";
    }
    if(this.isRevealed){
        text(this.value, this.pos.x + this.cellWidth/2, this.pos.y + this.cellWidth/2 + 10); 
    }else if(this.isFlagged){
        text("🚩",this.pos.x + this.cellWidth/2, this.pos.y + this.cellWidth/2 + 10); 
    }
 
    
  }

  findNeighbors(i, j, array){
    let neighbors = [];
    //Top Left Cell 
    if(i == 0 && j == 0){
        neighbors = [
            array[i + 1][j],
            array[i + 1][j + 1],
            array[i][j + 1]
        ];
    //Bottom Right Cell
    }else if(i == array.length - 1 && j == array.length - 1){
        neighbors = [
            array[i - 1][j],
            array[i - 1][j - 1],
            array[i][j-1]
        ];
    // Bottom Left Cell
    }else if(i == 0 && j == array.length - 1){
        neighbors = [
            array[i][j-1],
            array[i + 1][j - 1],
            array[i + 1][j]
        ];
    //Top Right Cell
    }else if(i == array.length - 1 && j == 0){
        neighbors = [
            array[i - 1][j],
            array[i -1][j + 1],
            array[i][j+1]
        ];
    //Left Column
    }else if(i == 0){
        neighbors = [
            array[i][j-1],
            array[i][j+1],
            array[i + 1][j-1],
            array[i + 1][j],
            array[i + 1][j+1]
        ];
    //Right Column
    }else if(i == array.length - 1){
        neighbors = [
            array[i][j-1],
            array[i][j+1],
            array[i - 1][j-1],
            array[i - 1][j],
            array[i - 1][j+1]
        ];
    //Top Row
    }else if(j == 0){
        neighbors = [
            array[i-1][j],
            array[i+1][j],
            array[i-1][j+1],
            array[i + 1][j + 1],
            array[i][j+1]
        ];
    //Bottom Row
    }else if(j == array.length - 1){
        neighbors = [
            array[i-1][j],
            array[i+1][j],
            array[i-1][j-1],
            array[i][j - 1],
            array[i + 1][j -  1]
        ];
    //Anything not on the edge
    }else{
        neighbors = [
            array[i - 1][j-1],
            array[i][j-1],
            array[i+1][j-1],
            array[i-1][j],
            array[i + 1][j],
            array[i-1][j+1],
            array[i][j+1],
            array[i+1][j+1]
        ];
    }

    this.neighbors = neighbors;    
    
}

checkHovered(mouseX, mouseY){
  if(mouseX < this.pos.x + this.cellWidth && mouseX > this.pos.x){
    if(mouseY < this.pos.y + this.cellWidth && mouseY > this.pos.y){
      this.isHovered = true; 
    }
  }
}

countNeighbors(){
    for(let i = 0; i < this.neighbors.length; i++){
        if(!this.mine){
            if(this.neighbors[i].isMine){
                this.value ++; 
                this.isBlank = false; 
            }
        }
    }
    if(this.value == 0){
        this.value = "";
        this.isBlank = true; 
    }
}


}