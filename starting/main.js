const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;

    // Pick a random safe starting point
    let startRow, startCol;
    do {
      startRow = Math.floor(Math.random() * this.field.length);
      startCol = Math.floor(Math.random() * this.field[0].length);
    } while (this.field[startRow][startCol] !== fieldCharacter);

    this.playerRow = startRow;
    this.playerCol = startCol;
    this.field[this.playerRow][this.playerCol] = pathCharacter;
  }

  // Print the field
  print() {
    const displayString = this.field.map((row) => row.join("")).join("\n");
    console.log(displayString);
  }

  // Check if the player won
  hasWon() {
    return this.field[this.playerRow][this.playerCol] === hat;
  }

  // Check if the player lost
  hasLost() {
    if (
      this.playerRow < 0 ||
      this.playerRow >= this.field.length ||
      this.playerCol < 0 ||
      this.playerCol >= this.field[0].length
    ) {
      console.log("You went out of bounds! Game over.");
      return true;
    }
    if (this.field[this.playerRow][this.playerCol] === hole) {
      console.log("You fell into a hole! Game over.");
      return true;
    }
    return false;
  }

  // Ask player for a direction
  askDirection() {
    const direction = prompt(
      "Which way? (u = up, d = down, l = left, r = right) "
    );
    switch (direction.toLowerCase()) {
      case "u":
        this.playerRow -= 1;
        break;
      case "d":
        this.playerRow += 1;
        break;
      case "l":
        this.playerCol -= 1;
        break;
      case "r":
        this.playerCol += 1;
        break;
      default:
        console.log("Invalid input. Use u, d, l, or r.");
    }
  }

  // Main game loop
  playGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.askDirection();

      if (this.hasLost()) {
        playing = false;
        break;
      }

      if (this.hasWon()) {
        console.log("🎉 You found your hat! You win!");
        playing = false;
        break;
      }

      this.field[this.playerRow][this.playerCol] = pathCharacter;
    }
  }

  // Generate a random field
  static generateField(height, width, holePercentage = 0.2) {
    const field = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(Math.random() < holePercentage ? hole : fieldCharacter);
      }
      field.push(row);
    }

    // Place the hat at a random location
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while (field[hatRow][hatCol] !== fieldCharacter);

    field[hatRow][hatCol] = hat;

    return field;
  }
}

// Example: generate a random 5x5 field with 20% holes
const myField = new Field(Field.generateField(5, 5, 0.2));
myField.playGame();


