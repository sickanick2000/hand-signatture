prediction_1 = "";
prediction_2 = "";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function Take_Snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>'
});
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wNpsQCagg/model.json', modelLoaded);
function modelLoaded(){
console.log("model is loaded and ready to strike")
}

function speak(){
var synth = window.speechSynthesis;
speak_data1 = "The First Prediction Is-"+ prediction_1;
speak_data1 = "The Second Prediction Is-"+ prediction_2;
var UtterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
synth.speak(UtterThis);
}

function check(){
img = document.getElementById('capture_image');
classifier.classify(img, gotResult);
}

function gotResult(error, results){
if(error){
console.error(error);
} else {
console.log(results);
document.getElementById("result_1").innerHTML = results[0].label;
document.getElementById("result_2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();
if(results[0].label == "circle"){
document.getElementById("update_gesture").innerHTML = "&#9994";
}
if(results[0].label == "2"){
    document.getElementById("update_gesture").innerHTML = "&#9995";
    }
    if(results[0].label == "all"){
        document.getElementById("update_gesture").innerHTML = "&#9996";
        }
        if(results[1].label == "circle"){
            document.getElementById("update_gesture2").innerHTML = "&#&#9994";
            }
            if(results[1].label == "2"){
                document.getElementById("update_gesture2").innerHTML = "&#9995";
                }
                if(results[1].label == "all"){
                    document.getElementById("update_gesture2").innerHTML = "&#9996";
                    }
}
}