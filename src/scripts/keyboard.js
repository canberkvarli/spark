   document.addEventListener('DOMContentLoaded',function(event){

       //Web Audio API
        let audioContext = new (window.AudioContext || window.webkitAudioContext)(); //base contex
         //instrument
        let mainGainNode = audioContext.createGain(); //gain
        let filter = audioContext.createBiquadFilter(); //effect 
        let oscList = []; //store key pressed oscilliators
        let noteFreq = {
            //octave-1
            '90': 261.626, //Z, C4
            '83': 277.183, //S, C4#
            '88': 293.665, //X, D4
            '68': 311.127, //D, D4#
            '67': 329.628, //C, E4
            '86': 349.228, //V, F4
            '71': 369.994, //G, F4#
            '66': 391.995, //B, G4
            '72': 415.305, //H, G4#
            '78': 440.000, //N, A4
            '74': 466.164, //J, A4#
            '77': 493.883, //M, B4
            '81': 523.251, //Q, C5
            '50': 554.365, //2, C5#
            '87': 587.329, //W, D5
            '51': 622.254, //3, D5
            '69': 659.255, //E, E5
            '82': 698.456, //R, F5
            '53': 739.989, //5, F5#
            '84': 783.991, //T, G5
            '54': 830.609, //6, G5#
            '89': 880.000, //Y, A5
            '55': 932.328, //7, A5#
            '85': 987.767, //U, B5
            '73': 1046.50, //I, C6
    
        } //key codes & note frequencies
    
        //DOM 
    
        // let keyboard = document.querySelector(".lower-container");
        let white_keys = document.querySelectorAll('white');
        let black_keys = document.querySelectorAll('black');
        let keys = document.querySelectorAll('key');
        let waveForm = document.querySelector("select[name='waveform']");
        
        //Event Listeners


        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
        waveForm.addEventListener('change', function(event) {
        waveForm = event.target.value;
       });     
        //FUNCTIONS
    
        // function createNoteTable(){
        //     let noteFreq = [];
    
        //     for (let i = 0; i < 9; i++) {
        //         noteFreq[i] = [];
    
        //         //octave-1
        //         noteFreq[1]["C"] = 32.703195662574829;
        //         noteFreq[1]["C#"] = 34.647828872109012;
        //         noteFreq[1]["D"] = 36.708095989675945;
        //         noteFreq[1]["D#"] = 38.890872965260113;
        //         noteFreq[1]["E"] = 41.203444614108741;
        //         noteFreq[1]["F"] = 43.653528929125485;
        //         noteFreq[1]["F#"] = 46.249302838954299;
        //         noteFreq[1]["G"] = 48.999429497718661;
        //         noteFreq[1]["G#"] = 51.913087197493142;
        //         noteFreq[1]["A"] = 55.000000000000000;
        //         noteFreq[1]["A#"] = 58.270470189761239;
        //         noteFreq[1]["B"] = 61.735412657015513;
    
        //         //octave-2
        //         noteFreq[2]["C"] = 65.40639;
        //         noteFreq[2]["C#"] = 69.29566;
        //         noteFreq[2]["D"] = 73.41619;
        //         noteFreq[2]["D#"] = 77.78175;
        //         noteFreq[2]["E"] = 82.40689;
        //         noteFreq[2]["F"] = 87.30706;
        //         noteFreq[2]["F#"] = 92.49861;
        //         noteFreq[2]["G"] = 97.99886;
        //         noteFreq[2]["G#"] = 103.8262;
        //         noteFreq[2]["A"] = 110.0000;
        //         noteFreq[2]["A#"] = 116.5409;
        //         noteFreq[2]["B"] = 123.4708;
    
        //         //Last C note
        //         noteFreq[3]["C"] = 130.8128;
        //         return noteFreq;
        //     }
        // }

        function keyDown(e) {
            const key = (e.keyCode).toString(); //key code            
            if (noteFreq[key] && !oscList[key]) {
                playNote(key);
                //if noteFreq.includes(white_keys.note_freq){
                    //changeColor();
                // }
            }
        };
    
        function keyUp(e) {
            const key = (e.keyCode).toString();
            if (noteFreq[key] && oscList[key]) {
                oscList[key].stop();
                delete oscList[key];
            }

        };
    
        function playNote(key) {
            const osc = audioContext.createOscillator();
            osc.frequency.setValueAtTime(noteFreq[key], audioContext.currentTime);
            osc.type = waveForm;
            oscList[key] = osc;
            oscList[key].connect(mainGainNode); //sound connected
            oscList[key].start();
        }
    

        //connections
        mainGainNode.connect(filter);
        filter.connect(audioContext.destination);


});    

