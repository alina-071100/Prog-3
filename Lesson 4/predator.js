
   class Predator extends LivingCreature{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCell2(character, character1) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }

    eat() {
        let emptyCells = this.chooseCell2(1, 2);
        let grasseater = random(emptyCells);

        if (grasseater) {
            let newX = grasseater[0];
            let newY = grasseater[1];



            if (matrix[newY][newX] == 1) {
                for (let i in grassArr) {
                    if (newX === grassArr[i].x && newY === grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }

            if (matrix[newY][newX] == 2) {
                for (let i in grasseaterArr) {
                    if (newX === grasseaterArr[i].x && newY === grasseaterArr[i].y) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }

                matrix[newY][newX] = this.index;
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy += 3
            }
        }
    }
    mul() {

        // var newCell = random(this.chooseCell(0));
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.energy >= 6 && newCell) {

            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 6;
        }
    }
    die() {
        if (this.energy <= -10) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}