img="";
Status="";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video =createCapture(VIDEO);
    video.size(380,380);
    video.hide();
};

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
};

function modelLoaded(){
    console.log("Model is Loaded");
    Status = "True";
    objectDetector.detect(video,gotresults)
}

function gotresults(error , results){
    if (error){
    console.error(error);
    }
    console.log(results);
    objects=results;
};


function draw(){
    image(video,0,0,380,380);

    if(Status != ""){

        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotresults)
        for (i=0; i <objects.length; i++){

            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="The number of objects are : "+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function stop(){
    video.stop();
}

function pause(){
    video.pause();
}