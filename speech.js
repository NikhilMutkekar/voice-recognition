async function main() {
  // Imports the Google Cloud client library
  console.log('mai.js')
  const path = require('path')
  const fs = require('fs');

  process.env.GOOGLE_APPLICATION_CREDENTIALS= path.resolve(__dirname, 'My First Project-edfadc4e8987.json');
  const speech = require('@google-cloud/speech');
  // Creates a client

  const client = new speech.SpeechClient({
    projectId: 'absolute-code-236207',
    keyFilename: path.resolve(__dirname, 'My First Project-edfadc4e8987.json')
  });

  // The name of the audio file to transcribe
  const fileName = path.resolve(__dirname, 'audio.raw');

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}
main().catch(console.error);