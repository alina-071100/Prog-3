var matrix = [
];

var side = 25;
var m = 30;
var n = 30;

var grassArr = [];
var grasseaterArr = [];
var eaterArr = [];
var predatorArr = [];
var mausArr = [];
var catArr = [];

function setup() {

    for (let i = 0; i < m; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = Math.floor(random([0, 1, 2, 2, 0, 1, 1, 3, 1, 3, 0, 1, 4, 5, 2, 2, 2, 1]));
        }
    };




    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);

            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grasseaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pe = new Predator(x, y, 3);
                predatorArr.push(pe);
            }
            else if (matrix[y][x] == 4) {
                var ma = new Maus(x, y, 4);
                mausArr.push(ma);
            }
            else if (matrix[y][x] == 5) {
                var ca = new Cat(x, y, 5);
                catArr.push(ca);
            }
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    console.log(predatorArr);
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {

                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].eat();
        grasseaterArr[i].mul();
        grasseaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in mausArr) {
        mausArr[i].move();
        mausArr[i].eat();
        mausArr[i].mul();
        mausArr[i].die();
    }
    for (var i in catArr) {
        catArr[i].move();
        catArr[i].eat();
        catArr[i].create();
        catArr[i].mul();
        catArr[i].die();

    }

}










