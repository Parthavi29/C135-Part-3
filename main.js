video = "";
myStatus = "";
animal = "";
object = [];

function setup() {
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(400, 400);
    canvas.center();
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 400, 400);
    if (myStatus != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            //document.getElementById("status").innerHTML = "Status : Objects Detected";
            percent = floor(object[i].confidence * 100);

            fill(255, 0, 0);
            strokeWeight(2);
            text(object[i].label + " " + percent + " %", object[i].x + 20, object[i].y + 20);
            noFill();
            stroke(255, 0, 0);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label == animal) {
                document.getElementById("number").innerHTML = animal + " found";
                video.stop();
                objectDetector.detect(gotResult)

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(document.getElementById("number").innerHTML);
                synth.speak(utterThis);
            } else {
                document.getElementById("number").innerHTML = animal + " not found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status : Detecting Objects';
    animal = document.getElementById("input1").value;
}

function modelLoaded() {
    console.log('Model Loaded');
    myStatus = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}