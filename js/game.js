class Game {
    players;
    turn;

    constructor() {
        this.players = [new Player(0), new Player(1)];
        this.players[0].enemy = this.players[1];
        this.players[1].enemy = this.players[0];
        this.turn = 0;
    }
}

class Player {
    number;
    shootBoard = [];
    boatsBoard = [];
    boats = [];
    enemy = null;

    constructor(number) {
        this.number = number;

        // shootBoard and boatsBoard
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.shootBoard[i] = [];
            this.boatsBoard[i] = [];

            for (let j = 0; j < BOARD_SIZE; j++) {
                this.shootBoard[i][j] = new ShootBoardField(i, j);
                this.boatsBoard[i][j] = new BoatsBoardField(i, j);
            }
        }



        // boats
        const cart = [[-1, -1], [-1, 0], [-1, 1], [0, -1], /*[0, 0],*/ [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < BOATS_SIZES.length; i++) {
            let condition = true;
            
            while (condition) {
                const boat = new Boat(BOATS_SIZES[BOATS_SIZES.length - 1 - i]);

                let partCondition = true;

                for (let j = 0; j < boat.length && partCondition; j++) {

                    for (let k of cart) {

                        try {
                            if (this.boatsBoard[boat.fields[j].x + k[0]][boat.fields[j].y + k[1]].boat != null) {
                                partCondition = false;
                                break;
                            }
                        } catch (e) {}

                    }

                }
                
                if (partCondition) {
                    condition = false;

                    this.boats.push(boat);

                    for (let field of boat.fields) {
                        this.boatsBoard[field.x][field.y].boat = boat;
                    }
                }

            }
        }
    }

    shoot(x, y) {
        const boatsBoardField = this.enemy.boatsBoard[x][y];

        boatsBoardField.shot = true;

        if (boatsBoardField.boat != null) { // if hit

            boatsBoardField.boat.fields.find((field => {
                return field.x == x && field.y == y;
            })).hit = true;

        }
    }


}

class Field {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ShootBoardField extends Field {
    hit = false;

    constructor(x, y) {
        super(x, y);
    }
}

class BoatsBoardField extends Field {
    boat = null;
    shot = false;

    constructor(x, y) {
        super(x, y);
    }
}

class BoatField extends Field {
    hit = false;

    constructor(x, y) {
        super(x, y);
    }
}

class Boat {
    fields = [];
    length;
    direction;

    constructor(length) {
        this.length = length;
        let x, y, direction;
        do {
            x = getRandomInt(BOARD_SIZE),
            y = getRandomInt(BOARD_SIZE);
    
            direction = getRandomInt(2) // 0 = horizontal, 1 = vertical
        } while (x + direction * length >= BOARD_SIZE || y + (1 - direction) * length >= BOARD_SIZE);

        this.direction = (direction) ? 'vertical' : 'horizontal';

        for (let i = 0; i < length; i++) {
            this.fields.push(new BoatField(
                x + direction * i,
                y + (1 - direction) * i
            ));
        }
    }

    isDestroyed() {
        for (let boatField of fields) {
            if (boatField.hit === false) return false;
        }
        
        return true;
    }
}
