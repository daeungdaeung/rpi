const record=require('node-record-lpcm16');
const mplayer=require('mplayer');
const aikit=require('./aimakerskitutil');
const ktkws=require('./ktkws');
const motor=require('./led');

const client_id='Y2xpZW50X2tleTE1MzM3MDYzNzg3MTQ='
const client_key='Y2xpZW50X2lkMTUzMzcwNjM3ODcxNA=='
const client_secret='Y2xpZW50X3NlY3JldDE1MzM3MDYzNzg3MTQ='
const cert_path='./ca-bundle.pem';
const proto_path='./gigagenieRPC.proto'

const kwstext=['기가지니','지니야','친구야'];
const kwsflag=parseInt(process.argv[2]);
let pcm=null;
function initMic(){
	return record.start({
		sampleRateHertz: 16000,
		threshold: 0,
		verbose: false,
		recordProgram: 'arecord',
	})
};
process.env.LD_LiBRARY_PATH='./kwslib';
ktkws.initialize('./kwslib/kwsmodel.pack');
ktkws.startKws(kwsflag);
let mic=initMic();

aikit.initialize(client_id,client_key,client_secret,cert_path,proto_path);

let mode=0;
let ktstt=null;
mic.on('data',(data)=>{
	if(mode===0){
		result=ktkws.pushBuffer(data);
		if(result===1) {
			console.log('KWS Detected');
			player.openFile('./sample_sound.wav');
			setTimeout(startStt,1000);
		}
	} else {
		ktstt.write({audioContent:data})
	}
});
console.log('say :'+kwstext[kwsflag]);
function startStt(){
	ktstt=aikit.getVoice2Text();
	ktstt.on('error',(error)=>{
		console.log('Error:'+error);
	});
	ktstt.on('data',(data)=>{
		console.log('stt result:'+JSON.stringify(data));
if(data.resultCd===201){
			if(data.recognizedText.includes('켜')) led.turnOn;
else if(data.recognizedText.includes('꺼')) led.turnOff;
		}
		if(data.resultCd!==200) mode=0;
	});
	ktstt.on('end',()=>{
		console.log('stt text stream end');
		mode=0;
	});
	ktstt.write({reqOptions:{mode:0,lang:0}});
	mode=1;
};
