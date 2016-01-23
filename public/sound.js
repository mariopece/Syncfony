var pitch = 4,
	duration = 2,
	instrument = "piano";


document.onkeypress = function (event) {
	var x =  event.which || event.keyCode;
	//console.log(x);
	piano(x);
};

function piano(x){
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
	}
}

function play(n, p) {
	var inst = Synth.createInstrument(instrument);
	inst.play(n, p, duration);
	
	// Send note played
}

function switchInstrument(x) {
	$(".selected").removeClass('selected');
	instrument = x.id;
	$("#"+x.id).addClass('selected');
}

