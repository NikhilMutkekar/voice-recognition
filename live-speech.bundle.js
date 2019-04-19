"use strict";

async function main() {
  // Imports the Google Cloud client library
  console.log('mai.js');

  var path = require('path');

  var fs = require('fs');

  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, 'My First Project-edfadc4e8987.json');

  var record = require('node-record-lpcm16');

  var speech = require('@google-cloud/speech'); // Creates a client


  var client = new speech.SpeechClient({
    projectId: 'absolute-code-236207',
    keyFilename: path.resolve(__dirname, 'My First Project-edfadc4e8987.json')
  }); // The audio file's encoding, sample rate in hertz, and BCP-47 language code

  var config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  };
  var request = {
    config: config,
    interimResults: false // If you want interim results, set this to true

  };
  var recognizeStream = client.streamingRecognize(request).on('error', console.error).on('data', function (data) {
    return process.stdout.write(data.results[0] && data.results[0].alternatives[0] ? "Transcription: ".concat(data.results[0].alternatives[0].transcript, "\n") : "\n\nReached transcription time limit, press Ctrl+C\n");
  }); // Start recording and send the microphone input to the Speech API

  record.start({
    sampleRateHertz: 16000,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'sox',
    // Try also "arecord" or "sox"
    silence: '5.0'
  }).on('error', console.error).pipe(recognizeStream);
  console.log('Listening, press Ctrl+C to stop.'); // [END speech_transcribe_streaming_mic]
}

main().catch(console.error);

function start() {
  console.log('start')
}