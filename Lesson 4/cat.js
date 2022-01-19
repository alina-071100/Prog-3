
  class Cat extends LivingCreature{   
       constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.xot = 0
        this.xotu = 0
        this.energy = 10;
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
        let emptyCells = this.chooseCell2(3, 4);
        let utel = random(emptyCells);

        if (utel) {
            let newX = utel[0];
            let newY = utel[1];

            if (matrix[newY][newX] == 4) {
                for (let i in mausArr) {
                    if (newX === mausArr[i].x && newY === mausArr[i].y) {
                        mausArr.splice(i, 1);
                        break;
                    }
                }
            }

            if (matrix[newY][newX] == 3) {
                for (let i in predatorArr) {
                    if (newX === predatorArr[i].x && newY === predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            this.x = newX;
            this.y = newY;
            this.energy += 3
        }
    }
    mul() {

        var emptyCells = this.chooseCell(0);

        var newCell = random(emptyCells);

        if (this.energy >= 30 && newCell) {

            var newCat = new Cat(newCell[0], newCell[1], this.index);
            catArr.push(newCat);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 10;
        }
    }
    die() {
        if (this.energy <= -20) {
            matrix[this.y][this.x] = 0;
            for (var i in catArr) {
                if (this.x == catArr[i].x && this.y == catArr[i].y) {
                    catArr.splice(i, 1);
                }
            }
        }
    }


    create() {

        this.xot++
        this.xotu++
        if (this.xot == 10) {
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);
            if (newCell) {

                var gro = new Grass(newCell[0], newCell[1], 1);
                grassArr.push(gro);
                matrix[newCell[1]][newCell[0]] = 1;
                this.xot = 0;
            }
        }

        if (this.xotu == 25) {


            var emptyCells = this.chooseCell(0);

            var newCell = random(emptyCells);

            if (newCell) {
                var utox = new GrassEater(newCell[0], newCell[1], 2);
                grasseaterArr.push(utox);
                matrix[newCell[1]][newCell[0]] = 2;
                this.xotu = 0;
            }
        }

    }

}
