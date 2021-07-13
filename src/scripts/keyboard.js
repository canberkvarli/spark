

//Web Audio API
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
// sound source 
// gain control
// connect

let keyboard = document.querySelector(".lower-container");
let wavePicker = document.querySelector("select[name='waveform']");


//Event Listeners




//FUNCTIONS

function createNoteTable(){
    let noteFreq = [];

    for (let i = 0; i < 9; i++) {
        noteFreq[i] = [];

        //octave-1
        noteFreq[1]["C"] = 32.703195662574829;
        noteFreq[1]["C#"] = 34.647828872109012;
        noteFreq[1]["D"] = 36.708095989675945;
        noteFreq[1]["D#"] = 38.890872965260113;
        noteFreq[1]["E"] = 41.203444614108741;
        noteFreq[1]["F"] = 43.653528929125485;
        noteFreq[1]["F#"] = 46.249302838954299;
        noteFreq[1]["G"] = 48.999429497718661;
        noteFreq[1]["G#"] = 51.913087197493142;
        noteFreq[1]["A"] = 55.000000000000000;
        noteFreq[1]["A#"] = 58.270470189761239;
        noteFreq[1]["B"] = 61.735412657015513;

        //octave-2
        noteFreq[2]["C"] = 65.40639;
        noteFreq[2]["C#"] = 69.29566;
        noteFreq[2]["D"] = 73.41619;
        noteFreq[2]["D#"] = 77.78175;
        noteFreq[2]["E"] = 82.40689;
        noteFreq[2]["F"] = 87.30706;
        noteFreq[2]["F#"] = 92.49861;
        noteFreq[2]["G"] = 97.99886;
        noteFreq[2]["G#"] = 103.8262;
        noteFreq[2]["A"] = 110.0000;
        noteFreq[2]["A#"] = 116.5409;
        noteFreq[2]["B"] = 123.4708;

        //Last C note
        noteFreq[3]["C"] = 130.8128;
    }
}

function setup(){
    
}