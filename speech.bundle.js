"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

async function main() {
  // Imports the Google Cloud client library
  console.log('mai.js');

  var path = require('path');

  var fs = require('fs');

  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, 'My First Project-edfadc4e8987.json');

  var speech = require('@google-cloud/speech'); // Creates a client


  var client = new speech.SpeechClient({
    projectId: 'absolute-code-236207',
    keyFilename: path.resolve(__dirname, 'My First Project-edfadc4e8987.json')
  }); // The name of the audio file to transcribe

  var fileName = path.resolve(__dirname, 'audio.raw'); // Reads a local audio file and converts it to base64

  var file = fs.readFileSync(fileName);
  var audioBytes = file.toString('base64'); // The audio file's encoding, sample rate in hertz, and BCP-47 language code

  var audio = {
    content: audioBytes
  };
  var config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  };
  var request = {
    audio: audio,
    config: config
  }; // Detects speech in the audio file

  var _ref = await client.recognize(request),
      _ref2 = _slicedToArray(_ref, 1),
      response = _ref2[0];

  var transcription = response.results.map(function (result) {
    return result.alternatives[0].transcript;
  }).join('\n');
  console.log("Transcription: ".concat(transcription));
}

main().catch(console.error);