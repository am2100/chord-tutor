var data_02 = [
	[['A', '2100'],['G', '0232']],
	[['D', '3330'],['E', '4447']],
	[['G7', '0212'], ['A9','3203']]
];

var content_selection = [1,1,1];
var practice_session = [];

//
// Log an array to the console
//
function log_array(a){
	for(var i = 0; i < a.length; i++){
		console.log(a[i]);
	}
}

//
// Identify selected content and collect in
// practice_session array
//
function load_practice_session(data_array, selection_array, session_array){

	for(var i = 0; i < selection_array.length; i++){
		if (selection_array[i]){
			for(var j = 0; j < data_array[i].length; j++){
				session_array.push(data_array[i][j]);
			}
		}
	}
}

//
// Shuffle array
//
function shuffle_array(a){
	for(var i = a.length - 1; i > 0; i--){
		var n = Math.floor(Math.random() * i); // random index
		var tmp = a[i]; // store i'th value in tmp
		a[i] = a[n];
		a[n] = tmp;	
	}
}

function display_chord(chord_name, chord_pattern){

	var min = 14;
	var max = 0;

	for(var i = 0; i < chord_pattern.length; i++){
		var n = parseInt(chord_pattern[i]);
		if(n > 0){
			if(n < min){
				min = n;
			}
			if(n > max){
				max = n;
			}
		}
	}

	//console.log('max: ' + max);
	//console.log('min: ' + min);
	//console.log('----');
}

function find_fretted(chord_pattern){

	var min = 14;
	var max = 0;

	for(var i = 0; i < chord_pattern.length; i++){
		var n = parseInt(chord_pattern[i]);
		if(n > 0){
			if(n < min){
				min = n;
			}
			if(n > max){
				max = n;
			}
		}
	}
} 

function build_fretboard(chord_pattern){
	var NUM_FRETS = 14,
	    DOT_FRETS = [3,5,7,10,12],
	    fretboard = [], 
	    chord_box = [],
	    min_fret = 14,
	    max_fret = 0,
	    chord_box_size = 4,
	    start_fret,
	    end_fret,
	    fret_nums_flag = false,
	    open_strings_flag = false,
	    nut_flag = false,
	    i,
	    j,
	    tmp,
	    str = ''
		    ;
	// build blank fretboard
	for ( i = 0; i <= NUM_FRETS; i++ ){
		fretboard.push([0,0,0,0]);
	}

	// add significant fret numbers
	for ( i = 0; i < DOT_FRETS.length; i++){
		fretboard[DOT_FRETS[i]].push(DOT_FRETS[i]);
	}

	// record open strings and fretted frets
	for ( i = 0; i < chord_pattern.length; i++ ){
		tmp = parseInt(chord_pattern[i]);
		if ( tmp == 0 ){
			fretboard[0][i] = 1;
			open_strings_flag = true;
		} else {
			fretboard[0][i] = 0;
			fretboard[tmp][i] = 1;
			if ( tmp < min_fret){
				min_fret = tmp;
			}
			if ( tmp > max_fret ){
				max_fret = tmp;
			}
		}
	}

	// chord box settings
	if ( max_fret <= 4 ){
		nut_flag = true;
		fret_nums_flag = false;
		start_fret = 1;
		end_fret = 4;
	} else if ( max_fret >= 5 ){
		nut_flag = false;
		fret_nums_flag = true;
		start_fret = min_fret;
		if ((max_fret - min_fret + 1) < 4 ){
			end_fret = min_fret + 4;
		} else {
			end_fret = start_fret + (max_fret - min_fret);
		}
	}
	
	chord_box_size = end_fret - start_fret + 1;

	console.log('start_fret: ' + start_fret);
	console.log('end_fret: ' + end_fret);
	console.log('chord_box_size: ' + chord_box_size);



	for ( i = start_fret - 1; i < start_fret + chord_box_size - 1; i++ ){
		chord_box.push(fretboard[i + 1]);
		console.log(fretboard[i + 1]);
	}

	//console.log('----');

	// print out fretboard
	for ( i = 0; i < fretboard.length; i++ ){
		//console.log(fretboard[i]);
	}

	// print out min / max
	//console.log('min_fret: ' + min_fret);
	//console.log('max_fret: ' + max_fret);

	// print out chord box
	// 
	// if any open strings, print open strings
	if (open_strings_flag) {
		for ( i = 0; i < fretboard[0].length; i++ ){
			if (fretboard[0][i] == 1){
				str += 'o ';
			} else {
				str += '  ';
			}
		}
		document.writeln(str);
	}

	// Print nut or first fret bar
	if (nut_flag){
		document.writeln('=======');
	} else {
		document.writeln('-------');
	}

	// Print chord box
	str = '';
	for ( i = 0; i < chord_box_size; i++ ){
		for ( j = 0; j < chord_box[i].length; j++ ){
			if ( chord_box[i][j] == 1){
				str += 'X ';
			} else if ( chord_box[i][j] > 1 && fret_nums_flag){
				str += chord_box[i][j];
				fret_nums_flag = false;
			} else if ( chord_box[i][j] > 1 && !fret_nums_flag){
				str += '';
			} else {
				str += '| ';
			}
		}
		document.writeln(str);
		document.writeln('-------');
		str = '';
	}
	// print fretboard[1] - fretboard[4]
	//
	// else print fret
	// 
	// print_fret_nums = true
	//
	// chord_span = max - min + 1
	// 
	// if chord_span <= 4
	//
	// print fretboard[min] - fretboard[min + 4]
	//
	// else print fretboard[min] - fretboard[max]
}

load_practice_session(data_02, content_selection, practice_session);
//log_array(practice_session);

//console.log('----');

shuffle_array(practice_session);
//log_array(practice_session);

//console.log('----');

//display_chord('E', '4447');

//display_chord('D', '3330');

// build_fretboard('0232');

build_fretboard('4447');
/*
   o          
   =======    -------
   | | | |    X X X |
   -------
   | X | X
   -------
   | | X | 3
   -------
   | | | |
   -------
   */
