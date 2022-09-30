# Tetris-Website

Contents of a webserver with functionality for logging in, running tetris in the browser, logging scores and displaying a leaderboard.

____________________________________________________________________

Contributors:

Designer and programmer: Benjamin Finch
Moral support: AJ Finch
____________________________________________________________________

  - header.php

To honour the DRY principle, all HTML and CSS shared between the pages is stored in header.php and called with an include_once statment in index, register, tetris and leaderboard. Remember that this file was NOT deisgned with orthogonality in mind, it relies on being called by another php file in the correct curcumstance (i.e. header.php provides the opening <html> tag, <head></head> tags and opening <body> tag, but relies on being provided a closing </head> and </body> tag by another file and therefore consideration must be taken when changing the scope of header.php).

Consists of a bar with links to index.php, tetris.php and leaderboard.php

  - index.php

Landing page. Presents the user with a login box or a link to the tetris page if the user is already logged in. Using cookies, the php detects if the user is logged in and begins a session to display the link to play tetris instead of the login page.

  - register.php

  - tetris.php

  - leaderboard.php

  - db_login.php

tetris.js

