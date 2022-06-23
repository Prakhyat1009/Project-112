//https://teachablemachine.withgoogle.com/models/g96mq9aWu/
camera = document.getElementById("camera");

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 100,
    crop_width: 350,
    crop_height: 250
});

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img src='" + data_uri + "' id='snapshot'>";
    })
}

console.log("Ml5 version- ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/x78Dct0cJ/model.json", modelloaded);

function modelloaded() {
    console.log("Model loaded");
}

function check() {
    img = document.getElementById("snapshot");
    classifier.classify(img, got_results)
}

function speak() {
    var synth = window.speechSynthesis;
    text_1 = "The first prediction is " + prediction_1;
    text_2 = "And the second prdiction is " + prediction_2;
    repeated_text = new SpeechSynthesisUtterance(text_1 + text_2);
    repeated_text.rate = 0.8;
    synth.speak(repeated_text);
}

function got_results(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("emotion_1").innerHTML = prediction_1;
        document.getElementById("emotion_2").innerHTML = prediction_2;
        speak();

        if (prediction_1 == "Hello") {
            document.getElementById("emoji_1").innerHTML = "&#128400;";
        }
        if (prediction_1 == "Clapping") {
            document.getElementById("emoji_1").innerHTML = "&#128079;";
        }
        if (prediction_1 == "Peace out") {
            document.getElementById("emoji_1").innerHTML = "&#9996;";
        }
        if (prediction_1 == "Thumbs up") {
            document.getElementById("emoji_1").innerHTML = "&#128077;";
        }
        if (prediction_1 == "Okay") {
            document.getElementById("emoji_1").innerHTML = "&#128076;";
        }




        if (prediction_2 == "Hello") {
            document.getElementById("emoji_2").innerHTML = "&#128400;";
        }
        if (prediction_2 == "Clapping") {
            document.getElementById("emoji_2").innerHTML = "&#128079;";
        }
        if (prediction_2 == "Peace out") {
            document.getElementById("emoji_2").innerHTML = "&#9996;";
        }
        if (prediction_2 == "Thumbs up") {
            document.getElementById("emoji_2").innerHTML = "&#128077;";
        }
        if (prediction_2 == "Okay") {
            document.getElementById("emoji_2").innerHTML = "&#128076;";
        }
    }
}