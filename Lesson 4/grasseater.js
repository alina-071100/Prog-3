
 class GrassEater extends LivingCreature {   
     constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
	}


    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
    }



    eat() {
        var grass = random(this.chooseCell(1));


        if (grass) {
            var newX = grass[0];
            var newY = grass[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }

    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.energy >= 12 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;

        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1)
                }
            }
        }
    }
}
