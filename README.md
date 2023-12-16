 Game Website: 2k48 Puzzle Game

Introduction:

The "2k48" project is an immersive online gaming website centered around the 
renowned 2048 puzzle game. The vision is to provide players of all skill levels with an 
enjoyable and challenging gaming experience. The project encompasses various 
functionalities, including registration, login, error handling, input validation, music and 
a global rankings system.

Description of the Website:

A Gateway to the 2k48 Puzzle

The 2k48 Puzzle website is a comprehensive online gaming platform that brings the 
beloved 2048 puzzle game to a global audience. Boasting an engaging and strategic 
gameplay experience, the platform encourages players to think critically, solve 
problems, and plan ahead. One of the standout features is the Global Leaderboard, 
allowing users to register, log in, and compete internationally. Players can track their 
progress, and witness their rankings rise on the dynamic leaderboard that showcases 
all participants from around the world.
To ensure a smooth onboarding process, the website includes a How-to-Play Guide, 
catering to players of all skill levels. This guide not only introduces newcomers to the 
intricacies of the game but also provides valuable strategies for achieving higher 
scores. For additional support, the FAQ section offers quick insights, tips, and solutions 
to common queries, enhancing the overall gaming experience.
In essence, the 2k48 Puzzle website transcends the traditional gaming platform. It 
represents a holistic approach to online gaming, providing entertainment, fostering 
competition, and instilling a sense of achievement for players worldwide. Welcome to 
the future of online gaming – where every move counts and victories are celebrated 
on a global scale.

Functionality Description:

Game functionality:

The gameplay of the game “2048” is a relatively simple yet highly addictive puzzle 
game. The objective of the game is to combine numbered tiles on a 4 x 4 grid to reach 
the tile with the number 2048, hence the name of the game.

1. Board setup: The game begins with a 4x4 grid, and two tiles with the number 
2 are randomly placed on the grid.
2. Tile Movement: You can move the tiles in four directions with the Arrows keys: 
up, down, left, and right or WASD keys. All tiles on the grid will slide in the 
chosen direction, and two tiles with the same number collide, they will merge 
into a single tile with a value equal to the sum of the two merged tiles. For 
example, if two tiles with the number 2 collide, they will merge to form a single 
tile with the number 4.
3. Scoring: Your score is based on the number of tiles you merge. For each merge, 
the value of the merged tile is added to your score, the goal is to keep merging 
tiles and increasing their values until you reach the 2048 tile. You can still 
advance in the game and earn greater scores even after choosing to reach 
2048.
4. Tile generation: After each move, a new tile with a value of 2 or 4 will appear 
on the grid in a random empty slot. The probability of the tile with the number 
2 appearing is 70% higher than that of the tile with the number 4.
5. Winning: The game is considered won when you successfully merge tiles to 
create the 2048 tile. However, you can continue playing to achieve a higher 
score and bigger tiles. Alternatively, a display message will show indicating that 
the game is won once the user reaches the tile with the number 8129.
6. Losing: The game is over when the grid is full, and no more valid moves can be 
made. If there are no empty spaces for new tiles and no adjacent tiles with the 
same value to merge, the game ends, and your final score is displayed.

Registration and Login functionality:

The registration process invites users to unlock the full potential of the gaming 
experience by providing essential information such as their name, last name, chosen 
username, and password. After the password is entered, it is safely decrypted by the 
software using the SHA-256 algorithm and SubtleCrypto API, converting it to a data 
digest (hash). All user data, including name, last name, username, password, and score 
(which is set to 0 by default), is kept in a key in the local storage UserDataList. Users 
who successfully complete the registration process are given access to additional 
features. First, logging in saves the current user to the session storage with all the 
player's details. This allows the user to keep track of their gaming score. If they achieve 
a higher score, the player's score is updated, and their position on the leaderboard is 
displayed on the global leaderboard. This personalized login experience adds a layer 
of engagement and competition to the gaming platform.

Error Handling/Input Validation functionality:

To ensure a seamless user experience, robust error-handling mechanisms guide users 
through potential issues during both registration and login. The input fields are 
mandatory, emphasizing the necessity of providing complete information. Clear and 
concise error messages promptly assist users in resolving any issues. Stringent input 
validation measures are in place to guarantee the accuracy and security of user data. 
Notably, passwords are encrypted using the SubteCrypto API, enhancing the overall 
security of user information. Users are systematically guided through the registration 
process, with specific prompts in case of a weak password, an inappropriate username 
length, or if the chosen username is already taken. These measures contribute to a 
secure and user-friendly registration and login experience. Users are guided through 
the registration process, ensuring adherence to specified requirements. If their 
password is weak a message will appear and ask for capitals or numbers to make the 
password, if the username is too long or too short a message will appear and ask for 
a 6 to 12 digits password, if the username is taken then a message will appear and ask 
again for a different username or if it less than 3 characters is too short.

Rankings Functionality:

The platform incorporates a dynamic global leaderboard that showcases the best 
scores achieved by players worldwide. The system compiles and sorts registered users 
from the local storage based on their best scores, presenting the rankings from the 
highest to the lowest. This feature adds a competitive element to the gaming 
experience, fostering a sense of community and achievement among players. The 
global leaderboard serves not only as a testament to individual accomplishments but 
also as a source of motivation for players to strive for higher scores and recognition 
within the gaming community.

Project Screenshots:

Screenshot of Homepage:
![Screenshot 2023-12-10 212506](https://github.com/SadikHyseni/2k48-game/assets/122787525/f62c17b0-1234-425c-8670-bcdb9ff1c8fa)

Screenshot of Login Page: 
![Screenshot 2023-12-10 212536](https://github.com/SadikHyseni/2k48-game/assets/122787525/89b6f90b-863f-4369-a749-431da2db0e69)

Screenshot of Registration Page:
![Screenshot 2023-12-10 212556](https://github.com/SadikHyseni/2k48-game/assets/122787525/6d4afc41-551a-475b-98b8-20abdcc72222)

Screenshot of How to play:
![Screenshot 2023-12-10 212651](https://github.com/SadikHyseni/2k48-game/assets/122787525/f90f1563-c1e6-42d8-863d-230ad506c0fc)

Screenshot of FAQ:
![Screenshot 2023-12-10 212713](https://github.com/SadikHyseni/2k48-game/assets/122787525/8f20699c-cbb7-4434-8929-db36bdaf47dd)
![Screenshot 2023-12-10 212744](https://github.com/SadikHyseni/2k48-game/assets/122787525/aa00788a-197c-463f-bbf8-00593c0f42a3)

Screenshot of Gameplay and Ranking:
![Screenshot 2023-12-10 212849](https://github.com/SadikHyseni/2k48-game/assets/122787525/f8d500e8-8ba0-423f-9501-c6975e6cd472)
