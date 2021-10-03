prediction_1 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:90
});
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id = 'captured_img' src = '" + data_uri + "'/>"
    });
}

console.log("ml5 version:",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DpX9IfESm/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!")
}

function speak(){
    var synth = window.speechSynthesis;
    utterThis =  new SpeechSynthesisUtterance('this means ' + prediction_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify( img, gotResult);
}

function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        prediction_1 = result[0].label;
        speak();
        if(result[0].label == 'super'){
            document.getElementById("update_emoji").innerHTML = "👌🏽";
        }
        else if(result[0].label == 'Good'){
            document.getElementById("update_emoji").innerHTML = "👍🏽";
        }
        else if(result[0].label == 'peace'){
            document.getElementById("update_emoji").innerHTML = "✌🏽";
        
        }
    }
}