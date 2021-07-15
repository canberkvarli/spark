# Spark: The Synthesizer Keyboard


Spark is an interactive demo project which is intented to improve the frontend skills of the oneself as well as creating a musical spark within every soul in the world. Anyone who is curious, interested, or even just to play around with it can find something bigger in themselves that I hope Spark will illuminate their emotions and ideas into music. 


## Functionality & MVP


#### In Spark, users will be able to:

• Play notes using the keyboard. (e.g. Press A to play #C note)

• Adjust the type of the sounds. (e.g. square, sine, sawtooth, etc.)

• Drop an envelope(ADSR) on a tone to change it's behaviour. ADSR: Attack, Delay, Sustain, Release.

#### In addition, this project will include:

• Instructions on how to enlight your musical mind.
• README.md


### Future Implementations

• Wavelength Display: 
  – Unwind the eyes as the wavelength display will dance while playing with sounds.
  
• User Accounts:
  – Sign up and be able to save uniquely created sounds.
  – Sign in and be able to play existing recordings.
  
• Record and Play buttons

• Drum pads on the keyboard


## Wireframes

![spark_wireframe](https://user-images.githubusercontent.com/25483888/125225888-dca08580-e284-11eb-8c9e-553d94356d7d.png)

## Technologies, Libraries, APIs

• [Canvas api](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to render the keyboard.

• [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for the Osciliator, gain controls, envelope and many more features to play the sound from the browser.

• [tones.js](http://bit101.github.io/tones/) is a web audio framework which will offer many common features that in any DAW(Digital Audio Workstation).


## Implementation Timeline

**Monday 07/12**  
• Build the piano keyboard with 25 keys and the notes table.  
• Press keys to start and stop the sound.  
• UI  
**Tuesday 07/13**  
• Setup the options to be able to change the type of the sound from the knob.  
• Add an Envelope filter.  
• UI  
**Wednesday 07/13**  
• UI  
• Test  
**Thursday 07/14**  
• Bugfix  
• UI improve  
• Test  
• Deploy  


