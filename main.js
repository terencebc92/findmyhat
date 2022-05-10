// IMPORT ALL REQUIRED MODULES

const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear-screen");

// DECLARED VARIABLES

const hat = "^";
const hole = "O";
const numOfHoles = 20;
const fieldCharacter = "░";
const pathCharacter = "*";
const row = 10;
const col = 10;
let isFound = false;

// CREATE FIELD CLASS

class Field {
  field = [];

  constructor() {
    // CHARACTER LOCATION STARTS AT [0,0]
    this.locationY = 0;
    this.locationX = 0;

    // CREATE STARTING FIELD, PLACE HOLES, CHARACTER AND HAT AND DISPLAY
    this.generateField();
    this.placeHoles();
    this.placeCharacter();
    this.placeHat();
    this.print();
  }

  // GENERATES FIELD IN ARRAY FORMAT
  generateField() {
    for (let y = 0; y < row; y++) {
      this.field[y] = [];
      for (let x = 0; x < col; x++) {
        this.field[y][x] = fieldCharacter;
      }
    }
  }

  // EXECUTES GAME AND DEFINES WIN/LOSS CONDITIONS
  runGame() {
    while (!isFound) {
      // GET USER INPUT
      this.askQuestion();

      // IF OUT OF BOUNDS, END GAME
      if (
        this.locationY < 0 ||
        this.locationY > row - 1 ||
        this.locationX < 0 ||
        this.locationX > col - 1
      ) {
        console.log("Out of bounds - Game End!");
        break;
      }

      // IF REACHED A HOLE, END GAME
      if (this.field[this.locationY][this.locationX] == hole) {
        console.log("Sorry, you fell down a hole!");
        break;
      }

      // UPDATE CHARACTER LOCATION
      this.placeCharacter();
      this.print();

      // IF REACHED HAT, DISPLAY WIN MESSAGE AND END GAME
      if (
        this.locationY == this.hatLocationY &&
        this.locationX == this.hatLocationX
      ) {
        isFound = true;
        console.log("Congratulations, you found your hat!");
      }
    }
  }

  // PRINT FIELD
  print() {
    // CLEAR CONSOLE
    clear();

    // CONVERT EACH ROW IN ARRAY ARRAY INTO A STRING, AND ADD LINE BREAKS FOR EACH ROW
    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");

    // PRINT TO CONSOLE
    console.log(displayString);
  }

  askQuestion() {
    // REPLACE CURRENT CHARACTER LOCATION WITH FIELD CHARACTER
    this.field[this.locationY][this.locationX] = fieldCharacter;

    // PROMPT USER FOR INPUT
    // USER IS PROMPTED CONTINUOUSLY UNTIL VALID KEY IS ENTERED (U, D, L, R)
    const validKey = ["U", "D", "L", "R"];
    let answer = prompt("Which way? ").toUpperCase();
    while (!validKey.includes(answer)) {
      answer = prompt(
        "Enter either 'u', 'd', 'l' or 'r' to move "
      ).toUpperCase();
    }

    // BASED ON USER'S INPUT, INCREMENT/DECREMENT LOCATION-X OR LOCATION-Y
    switch (answer) {
      case "U":
        this.locationY--;
        break;
      case "D":
        this.locationY++;
        break;
      case "L":
        this.locationX--;
        break;
      case "R":
        this.locationX++;
        break;
    }
  } // END OF ASKQUESTION FUNCTION

  // PLACE CHARACTER AT LOCATION-Y, LOCATION-X
  placeCharacter() {
    this.field[this.locationY][this.locationX] = pathCharacter;
  }

  // PLACE HAT AT RANDOMLY AT HATLOCATION-Y, HATLOCATION-X
  placeHat() {
    this.hatLocationY = this.randomNumber(row);
    this.hatLocationX = this.randomNumber(col);
    this.field[this.hatLocationY][this.hatLocationX] = hat;
  }

  // PLACE HOLES AT RANDOM LOCATIONS
  placeHoles() {
    let randRow;
    let randCol;

    for (let i = 0; i < numOfHoles; i++) {
      randRow = this.randomNumber(row);
      randCol = this.randomNumber(col);
      this.field[randRow][randCol] = hole;
    }
  }

  // RANDOM NUMBER GENERATOR
  randomNumber(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }
} // END OF CLASS

const myfield = new Field();
myfield.runGame();
