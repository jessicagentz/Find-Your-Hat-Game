const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let playing = true;
//Game instructions: You have lost your hat(^). You must navigate back to it without falling down a hole (O) or leaving the game field. The asterick marks your start point and path you take. Open the terminal and type ? to begin.

//

class Field {
    constructor (field) {
        this.field = field
        this.x = 0;
        this.y = 0;
    }

    print () {
        let joined = [];
        for (let i=0; i<this.field.length; i++) {
            joined.push(this.field[i].join(''));
        }
        return joined.join('\r\n');
    }

    static generateField (height, width, percent) {
        let field = [];
        //generates basic field
        for (var i = 0 ; i < height; i++) {
          field[i] = [];
          for (var j = 0; j < width; j++) {
            field[i][j] = fieldCharacter;
            }
        }
        let numberHole = height * width * percent;
        //adds O values to percent of field
        for (let i=0; i<numberHole; i++) {
            field[Math.floor(Math.random()* height)][Math.floor(Math.random() * width)] = hole;
            }
        //adds had excluding position 0 0 
        do {
            field[Math.floor(Math.random()* height)][Math.floor(Math.random() * width)] = hat
            } while (field[0][0] === hat);
        //add start in upper left
        field[0][0] = pathCharacter;
        return field;
    }

    move () {
        let input = prompt('Which direction would you like to move? Type l for left, r for right, u for up, and d for down.');
        input = input.toLowerCase();
        if (input === 'l') {
            this.x -=1;
            console.log('moving left');
        }
        else if (input === 'r') {
            this.x +=1;
            console.log('moving right');
        }
        else if (input === 'u') {
            this.y -=1;
            console.log('moving up');
        }
        else if (input === 'd') {
            this.y +=1;
            console.log('moving down');
        }
        else {
            console.log('Please enter valid input.')}
    }

    decipher () {
        if (this.field[this.y][this.x] === hat) {
            playing = false;
            console.log('You win - you found the hat!')
        }
        else if (this.field[this.y][this.x] === hole) {
            playing = false;
            console.log('You lose - you stepped in a hole!');
        }
        else if (this.field[this.y][this.x] === fieldCharacter) {
            console.log('Keep looking for the hat!');
            this.field[this.y][this.x] = pathCharacter;
        }
        else if (this.field[this.y][this.x] === pathCharacter) {
            console.log('You are stepping on a *');
        }
        else if (this.field[this.y][this.x] === undefined) {
            playing = false;
            console.log('You lose - you left the playing field!');
        }
    }

    static playGame () {
        let gameField = new Field(Field.generateField(10, 10, 0.2));
        while (playing === true) {
            console.log(gameField.print());
            gameField.move();
            gameField.decipher();
        }
        console.log('Game over!')
    }
}

Field.playGame();


/*const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

const field2 = new Field(Field.generateField(8, 8, 0.3));

const field3 = new Field(Field.generateField(4, 6, 0.4));

const field4 = new Field(Field.generateField(6, 6, 0.2));*/

