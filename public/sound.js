var pitch = 4,
	duration = 2,
	instrument = "piano";

document.onkeypress = function (event) {
	var x =  event.which || event.keyCode;
	simKey(x);
};

function simKey(x){
	x=+x;
	switch (x) {
		case 113:
			play('C', pitch);
			break;
		case 50:
			play('C#', pitch);
			break;
		case 119:
			play('D', pitch);
			break;
		case 51:
			play('D#', pitch);
			break;
		case 101:
			play('E', pitch);
			break;
		case 114:
			play('F', pitch);
			break;
		case 53:
			play('F#', pitch);
			break;
		case 116:
			play('G', pitch);
			break;
		case 54:
			play('G#', pitch);
			break;
		case 121:
			play('A', pitch);
			break;
		case 55:
			play('A#', pitch);
			break;
		case 117:
			play('B', pitch);
			break;
		case 105:
			play('C', pitch+1);
			break;
		case 57:
			play('C#', pitch+1);
			break;
		case 111:
			play('D', pitch+1);
			break;
		case 48:
			play('D#', pitch+1);
			break;
		case 112:
			play('E', pitch+1);
			break;
		case 91:
			pitchy(0);
			break;
		case 93:
			pitchy(1);
			break;
	}
}

function play(n, p) {
	var dataPrep = { "instrument": instrument, "n": n, "p": p, "nickname": sessionStorage.nickname,"isDC": false};
	connections.forEach(function (conn) {
		conn.send(dataPrep);
	});
    playLocal(n, p, instrument);
}

function playLocal(n, p, inst2) {
	var inst = Synth.createInstrument(inst2);
	inst.play(n, p, duration);
}

function switchInstrument(x) {
	$(".selected").removeClass('selected');
	instrument = x.id;
	$("#"+x.id).addClass('selected');
}

function pitchy(x) {
	if(x && pitch<8){
		pitch++;
	}
	else if(!x && pitch>2){
		pitch--;
	}
	document.getElementById('pitch').textContent = pitch;
}