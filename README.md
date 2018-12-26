# Don't Fret!

Don't Fret! is a fretboard trainer for the guitar. Currently v0.1.

It uses these excellent resources:

[VexFlow](https://github.com/0xfe/vexflow/)
[ToneJS](https://tonejs.github.io/)
[CSS Reset](https://meyerweb.com/eric/tools/css/reset/)

It's a work in progress. The goal is to make a simple, free, and easily-adaptable tool to learn the notes on the fretboard of the guitar. I'd like the design philosophy to keep in mind alternative tunings and other stringed instruments: banjo, ukulele, etc. An ultimate goal could be to have the trainer configurable to any tuning and number of strings so that you can train for any instrument.

## Basic instructions:

Click the neck for a new note. Can visit page with optional query parameters:

min=[minimum fret to train, inclusive]
max=[maximum fret to train, inclusive]
strings=[comma-delimited, array, of, strings, 1, through, 6]

e.g., /index.html?min=0&max=5&string=1,2,3 trains frets open-thru 5 inclusive only on strings G, B, E

## TBD:
* make mobile friendly (perhaps with React Native)
* make tone more customizable (more string-y, set the duration and volume)
* better tracking of which notes were correct and incorrect to incorporate training on things you don't know
* could add training for scales or modes
* some lightweight JSON configuration to save off status and training progress in localStorage
* keyboard support
* better UI perhaps