var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(500, 600);
    canvas.parent('canvascontainer');
    database = firebase.database()
    background("powderblue")


}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}