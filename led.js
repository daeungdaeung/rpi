const rpio = require('rpio');

rpio.init({gpiomem:false, mapping:'gpio'})
rpio.open(4,rpio.OUTPUT);

const stopMillis=100;

module.exports.turnOn=()=>{
	rpio.write(4,rpio.HIGH);
	setTimeout(stop,stopMillis,null);
};
module.exports.turnOff=()=>{
	rpio.write(4,rpio.LOW);
	stopsetTimeout(stop,stopMillis,null);
};
module.exports.stop=()=>{
	rpio.write(4,rpio.LOW);
};
