class Maus {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 1, this.y + 2],

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
    chooseCell2(character, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        // let newCell = random(this.chooseCell(0, 1));

        if (newCell) {

            let newX = newCell[0];
            let newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index


            this.x = newX;
            this.y = newY;
            this.energy--;

        }

    }
    eat() {
        let emptyCells = this.chooseCell2(1, 3);
        let foood = random(emptyCells);

        if (foood) {
            let newX = foood[0];
            let newY = foood[1];


            if (matrix[newY][newX] == 3) {
                for (let i in predatorArr) {
                    if (newX === predatorArr[i].x && newY === predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (newX === grassArr[i].x && newY === grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }


                this.x = newX;
                this.y = newY;
                this.energy += 4
            }


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.energy >= 18 && newCell) {

            var newMaus = new Maus(newCell[0], newCell[1], this.index);
            mausArr.push(newMaus);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 15;
        }
    }


    die() {
        if (this.energy <= -30) {
            matrix[this.y][this.x] = 0;
            for (var i in mausArr) {
                if (this.x == mausArr[i].x && this.y == mausArr[i].y) {
                    mausArr.splice(i, 1);
                }
            }
        }

    }
}