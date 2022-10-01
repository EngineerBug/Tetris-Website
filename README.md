# Tetris-Website

Contents of a webserver with functionality for logging in, running tetris in the browser, logging scores and displaying a leaderboard.

____________________________________________________________________

**Version 0.5.0**

No new updates.
____________________________________________________________________

**Contributors:**

Designer and programmer: Benjamin Finch
Moral support: AJ Finch
____________________________________________________________________

**Contents:**

  - header.php

To stick to the DRY principle, all HTML and CSS shared between the pages is stored in header.php and called with an include_once statment in index, register, tetris and leaderboard. Remember that this file was NOT deisgned with orthogonality in mind, it relies on being called by another php file in the correct curcumstance (i.e. header.php provides the opening <html> tag, <head></head> tags and opening <body> tag, but relies on being provided a closing </head> and </body> tag by another file and therefore consideration must be taken when changing the scope of header.php).

Consists of a bar with links to index.php, tetris.php and leaderboard.php

  - index.php

Landing page. Presents the user with a login <form> or a link to the tetris page if the user is already logged in. Using cookies, the php detects if the user is logged in and begins a session to display the link to play tetris instead of the login page.

  - register.php

Uses the <form> tag to ask the user for their username, first and last name, and a password (which is entered twice and compared) and asks the user if they want their scores to be displayed on the public leaderboard. A post request is then sent to index.php which adds the users details to the database.

  - tetris.php

This page displays a button which when clicked, will execute the main() function from tetris.js. This will begin the game, which the user can play until the game ends. When the game ends, a post request will be sent to leaderboard.php with the username and score of the user.

  - leaderboard.php

Detects if there is a new score to be added to the database. If there is, the php will add the score. It will then calculate the top five scores and display them in a <table> using the MySQL query:
  SELECT * FROM Scores ORDER BY Score DESC LIMIT 5
The page then formats the table in the order recived from the database.

  - db_login.php

To stick to the DRY principle, all pages wich send or recive information from the database call db_login to access the database. When editing this code, this file will need changing to suit the environment including details about the database itself.

  - tetris.js

getNewPieces()
  When all squares are no longer moving, a new piece should be randomly secected and spawned at the top of the board.

resetBlock()
  When the block reaches the floor or lands on top of another div, it should be added to the array of all block positions (boardarray).
  
rowElimination()
  Sometimes a player may fill an entire row, in this case all squares in that row are removed. All squares above that row will be moved down one to fill     the gap left.
  
function rotatePiece()
  When the up arrow is pressed, the current piece should rotate 90 degrees clockwise, allowing more options for the player to match a whole row.
  
function movePiece (direction)
  This function changes all the translate attributes of all div elements with class name "block".
  @param direction a string with the direction to move the block.

function endGame()
  Sends a post request to leadeboard.php with the score.

function main()
  This function is executed when the start button is pressed. It removes the start button before starting a loop at an interval of 1 second which either     updates the current piece or creates a new piece. The loop terminates when the top line on the board has a piece in it which is not the current piece.

function control(key)
  The game has four controls.
  Left: move the current block -20px
  Right move the current block 20px
  Down: drop the current block 20px
  Up: rotate the current piece
