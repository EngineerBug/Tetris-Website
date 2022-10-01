//log when the script starts
console.log("The Script Loads...");

//global constant for the game area
const tetris = document.getElementsByClassName("tetris-bg");

//Dictionary of every game piece
const pieces = {
	"L" : [ [1,1],[1,2],[1,3],[2,3] ],
	"Z" : [ [1,1],[2,1],[2,2],[2,3] ],
	"S" : [ [1,2],[2,1],[2,2],[3,1] ],
	"T" : [ [1,1],[2,1],[2,2],[3,1] ],
	"O" : [ [1,1],[1,2],[2,1],[2,2] ],
	"I" : [ [1,1],[1,2],[1,3],[1,4] ]
};

//2d Array representing the game board
var boardArray = new Array(20);
for (var i=0; i<boardArray.length; i++) {
    boardArray[i] = new Array(10).fill(null);
}

//store current piece
var currentBlock = {
    id : null,
    block : null,
    origin : {x:0 , y:0},
    rotation : 0
};

//store all divs with the className "block"
let divs = new Array(4).fill(null);

/**
 * When all squares are no longer
 * moving, a new piece should be
 * randomly selected and spawned at the top
 * of the board.
 */
function getNewPiece() {
    console.log("New Game Piece");

    //increment score
    var value = parseInt(document.getElementById('points').textContent);
    value++;
    document.getElementById('points').textContent = value;

     //check if game ends
    for (var i=0; i<boardArray[0].length; i++) {
        if (boardArray[0][i] != null) {
            return value;
        };
    };

    //reset all attributes
    currentBlock.origin.x = 0;
    currentBlock.origin.y = 0;

    //choose a rabdom id for the new divs
    let keys = Object.keys(pieces);
    let id = keys[Math.floor(keys.length * Math.random())]
    currentBlock.block = pieces[id];
    currentBlock.id = id;
    console.log(currentBlock.id);

    //add the divs to tetris-bg and the array
    for (var i=0; i<4; i++) {
        //create each div and assign the id
        let div1 = document.createElement("div");
        div1.className = "block";
        div1.id = id;
        div1.setAttribute("y", 0);
        div1.setAttribute("x", 0);
        divs[i] = div1;

        //add the piece to the game board
        document.getElementsByClassName("tetris-bg")[0].append(div1);
    };
    //move all the pieces to the correct possition
    movePiece("yStart");
};

/**
 * When the block reaches the floor
 * or lands on top of another div,
 * it should be added to the array
 * of all block positions (boardArray).
 */
function resetBlock() {
    //add all  squares in the block to boardArray
    let ori = currentBlock.origin;
    for (i=0; i<4; i++) {
        let y = (currentBlock.block[i][1])+ori.y;
        let x = (currentBlock.block[i][0])+ori.x;
        boardArray[y][x] = divs[i].id;
        divs[i] = null;
    };
};

/**
 * Sometimes a player may fill an entire row,
 * in this case all squares in that row are
 * removed. All squares above that row will 
 * be moved down one to fill the gap left.
 */
function rowElimination() {
    //store how many divs are to be moved down
    //var divsToMove = 0
    for (var i=0; i<boardArray.length; i++) {
        var count = 0;
        //check the row for how many cells are full
        for (var j=0; j<boardArray[i].length; j++) {
            if (boardArray[i][j] != null) {
                count++;
                //divsToMove++;
            };
        };
        //check if the row was full
        if (count == 10) {
            //increment score
            var value = parseInt(document.getElementById('points').textContent);
            value += 5;
            document.getElementById('points').textContent = value;

            //remove values from array
            for (var j=0; j<boardArray[i].length; j++) {
                boardArray[i][j] = null;
            };
            //removes divs from board and move higher divs down
            let divRemoveArray = document.getElementsByClassName("block");
            for (var j=0; j<divRemoveArray.length; j++) {
                let currentDiv = divRemoveArray[j];
                
                if (parseInt(currentDiv.getAttribute("y")) == i) {
                    currentDiv.style.display = "none";

                } else if (parseInt(currentDiv.getAttribute("y")) < i) {
                    //calculate the new position of each block
                    currentDiv.setAttribute("y", parseInt(currentDiv.getAttribute("y"))+1);
                    //update the position
                    currentDiv.style.transform = "translate("+20*parseInt(currentDiv.getAttribute("x"))+"px, "+20*parseInt(currentDiv.getAttribute("y"))+"px)";
                }
            };

            //move all the Ids in the board array above the removed line
            for (var y=i; y>0; y--) {
                for (var x=0; x<boardArray[y].length; x++) {
                    boardArray[y+1][x] = boardArray[y][x];
                    boardArray[y][x] = null;
                };
            };
        };
    };
    console.log(boardArray);
};

/**
 * When the up arrow is pressed,
 * the current piece should rotate
 * 90 degrees clockwise, allowing
 * more options for the player to
 * match a whole row.
 */
function rotatePiece() {
    let block = currentBlock.block;
    //change the value of currentblock.block depending on the rotation
    //does the piece have an id of I?
    if (currentBlock.id == "I") {
        for (var i=0; i<block.length; i++) {
            var store = block[i][0];
            block[i][0] = block[i][1];
            block[i][1] = store;
        };
    
    //does the piece have an id of S?
    } else if (currentBlock.id == "S") {
        if (currentBlock.rotation == 0) {
            block[1] = [1,1];
            block[3] = [2,3];
            currentBlock.rotation = 1;
        } else {
            block[1] = [2,1];
            block[3] = [3,1];
            currentBlock.rotation = 0;
            
        };
    
    //does the piece have an id of L or Z?
    } else if (currentBlock.id == "L" || currentBlock.id == "Z") {
        if (currentBlock.rotation == 0) {
            block[0] = [1,1];
            block[1] = [1,2];
            block[2] = [3,1];
            block[3] = [2,1]; 
            currentBlock.rotation = 1;

        } else if (currentBlock.rotation == 1) {
            block[1] = [2,1];
            block[2] = [2,2];
            block[3] = [2,3]; 
            currentBlock.rotation = 2;

        } else if (currentBlock.rotation == 2) {
            block[0] = [3,1];
            block[1] = [1,2];
            block[3] = [3,2]; 
            currentBlock.rotation = 3;

        } else if (currentBlock.rotation == 3) {
            block[0] = [1,1];
            block[2] = [1,3];
            block[3] = [2,3]; 
            currentBlock.rotation = 0;
        }
        const TArray = { 
            "0" : [ [1,1],[2,1],[3,1],[2,2] ], 
            "1" : [ [1,1],[2,1],[2,-1],[2,2] ], 
            "2" : [ [1,1],[2,1],[2,-1],[3,1] ],
            "3" : [ [3,1],[2,1],[2,-1],[2,2] ] 
        };
    //does the piece have an id of T?
    } else if (currentBlock.id == "T") {
        if (currentBlock.rotation == 0) {
            block[3] = [2,0];
            currentBlock.rotation = 1;
        } else if (currentBlock.rotation == 1) {
            block[2] = [3,1];
            currentBlock.rotation = 2;
        } else if (currentBlock.rotation == 2) {
            block[0] = [2,2];
            currentBlock.rotation = 3;
        } else if (currentBlock.rotation == 3) {
            block[0] = [1,1];
            block[2] = [2,2];
            block[3] = [3,1];
            currentBlock.rotation = 0;
        }
    };
};

/**
 * This function changes all the translate attributes
 * of all div elements with class name "block".
 * 
 * @param direction a string with the direction to move the block
 */
function movePiece (direction) {
    let ori = currentBlock.origin;

    //calculate if the transformation will occure
    for (i=0; i<4; i++) {
        let y = (currentBlock.block[i][1])+ori.y;
        let x = (currentBlock.block[i][0])+ori.x;

        //is the block pushing against the right wall?
        if (direction == "+x" && x == 9) {
            return;
        //is there another piece directly right of the block?
        } else if (direction == "+x" && boardArray[y][x+1] != null) {
            return;
        };

        //is the block pushing against the left wall?
        if (direction == "-x" && x == 0) {
            return;
        //is there another piece directly left of the block?
        } else if (direction == "-x" && boardArray[y][x-1] != null) {
            return;
        };

        //has the block hit the floor?
        if (direction == "+y" && y == 19) {
            //since this should stop the piece, empty the current div array
            resetBlock();
            rowElimination();
            return;
        //is there another piece directly under the block?
        } else if (direction == "+y" && boardArray[y+1][x] != null) {
            resetBlock();
            rowElimination();
            return;
        };
    };
    
    //update the origin if requirments are satisfied
    if (direction == "+x") {
        ori.x += 1;
    } else if (direction == "-x") {
        ori.x -= 1;
    } else if (direction == "+y") {
        ori.y += 1;
    };
    
    for (var i=0; i<4; i++) {
        //calculate the new position of each block
        let yNew = (currentBlock.block[i][1])+ori.y;
        let xNew = (currentBlock.block[i][0])+ori.x;

        if (direction == "+x") {
            divs[i].setAttribute("x", xNew);
        } else if (direction == "-x") {
            divs[i].setAttribute("x", xNew);
        } else if (direction == "+y") {
            divs[i].setAttribute("y", yNew);
        };
        
        //update the board
        divs[i].style.transform = "translate("+20*xNew+"px, "+20*yNew+"px)";
    };
};

/**
 * 
 * 
 */
function endGame() {
    var score = document.getElementById('points').textContent;
    var x = new XMLHttpRequest();
    x.open("POST", "leaderboard.php", true);
    x.setRequestHeader("Score", "application/json");
    x.send(score);
}


/**
 * This function is executed when the start button is
 * pressed. It removes the start button before starting
 * a loop at an interval of 1 second which either updates
 * the current piece or creates a new piece.
 * 
 * The loop terminates when the top line on the board
 * has a piece in it which is not the current piece.
 */
function main() {
    console.log("Game Begins")
    //remove the start button
	document.getElementById("start-button").style.display = "none";

    //Game Loop
    var gameLoop = setInterval (function () {
    //is there no block falling?
    if (divs[0] == null) {
        getNewPiece();
    //is there a block that needs to be moved?
    } else {
        console.log("Update");
        movePiece("+y");
    //has the game has ended?
    };
    
    //End Game
    for (var i=0; i<boardArray[0].length; i++) {
        if (boardArray[0][i] != null) {
            endGame();
            clearInterval(gameLoop);
        }; 
    };
    }, 1000);
};

//when a keyUp event occures execute the function
document.addEventListener("keyup", control, false);

/**
 * The game has four controls.
 * Left: move the current block -20px
 * Right move the current block 20px
 * Down: drop the current block 20px
 * Up: rotate the current piece
 */
function control(key) {
    if (key.keyCode == "37") {
        console.log("Left");
        movePiece("-x");
            
    } else if (key.keyCode == "39") {
        console.log("Right");
        movePiece("+x")
        
    } else if (key.keyCode == "40") {
        console.log("Down");
        movePiece("+y");
    } else if (key.keyCode == "38") {
        console.log("Rotate");
        rotatePiece();
    };
};

console.log("The Script Has Loaded.");
