function ex1() {
	document.getElementById("originalValue").value = "banana banana banana banana banana";
}

function ex2() {
	document.getElementById("originalValue").value = "every banana other banana word banana is banana banana";
}

function ex3() {
	document.getElementById("originalValue").value = "no repeated substring patterns in this sentence";
}

function ex4() {
	document.getElementById("originalValue").value = "ACTAGCATGCAGGACTGAGCATCGACGGATCGAGCGGATCTTTAGCGATCGATC";
}

function ex5() {
	document.getElementById("originalValue").value = "The Burrows-Wheeler Transform (BWT) rearranges a character string into groups of similar character subarrays. It is used by bzip2, as one of first steps in compression tool";
}

function bwt() {
	clearContent();
	document.getElementById("inverse").style.display = "none";
	var original = document.getElementById("originalValue").value;


	//var pattern = /^[a-z\d\s]+$/i;
	//if(!original.match(pattern)) {
	if (original.includes("$")) {
		document.getElementById("error").style.display = "block";
		return;
	} else {
		document.getElementById("error").style.display = "none";
	}

	document.getElementById("forward").style.display = "block";
	original = original + "$";
	cyclicStrings = generateShifts(original);

	sortedStrings = sortShifts(cyclicStrings, original);

	BWTOutput = generateBWTOutput(sortedStrings);

	var origChar = BWTOutput[0];
	var curString = origChar;
	var repeatedCharacters = 0;
	var repeatedStrings = 0;

	for (var i = 1; i < BWTOutput.length; i++) {
		if (origChar == BWTOutput[i]) {
			curString += BWTOutput[i];
			if (i == BWTOutput.length - 1) {
				if (curString.length >= 2) {
					document.getElementById("bwtOutput").innerHTML += "<span style=color:" + randomColor() + ";>" + curString.replace(" ", "&nbsp;") + "</span>";
					repeatedStrings = repeatedStrings + 1;
					repeatedCharacters = repeatedCharacters + curString.length;
				} else {
					document.getElementById("bwtOutput").innerHTML += "<span>" + curString + "</span>";
				}
			}
		} else {
			if (curString.length >= 2) {
				document.getElementById("bwtOutput").innerHTML += "<span style=color:" + randomColor() + ";>" + curString.replace(" ", "&nbsp;") + "</span>";
				repeatedStrings = repeatedStrings + 1;
				repeatedCharacters = repeatedCharacters + curString.length;
				if (i == BWTOutput.length - 1) {
				document.getElementById("bwtOutput").innerHTML += "<span>" + BWTOutput[i] + "</span>";
				}
			} else {
				document.getElementById("bwtOutput").innerHTML += "<span>" + curString.replace(" ", "&nbsp;") + "</span>";
			}
			curString = BWTOutput[i];
			origChar = BWTOutput[i];
		}
	}
	document.getElementById("expectedsavings").innerHTML = repeatedStrings + " runs of identical characters which make up " + repeatedCharacters + " of the total " + (original.length - 1) + " characters.";

}

function clearContent() {
	document.getElementById("forward").style.display = "none";
	document.getElementById("ibwt").style.display= "block";

	document.getElementById("rotations").innerHTML = "";
	document.getElementById("sortedRotations").innerHTML = "";
	document.getElementById("bwtOutput").innerHTML = "";
	document.getElementById("step2substr").innerHTML = "";
	document.getElementById("orig_index").innerHTML = "";
	document.getElementById("sortedbwt").innerHTML = "";
	document.getElementById("step5substr").innerHTML = "";
	document.getElementById("iorig_index").innerHTML = "";
	document.getElementById("lists").innerHTML = "";
	document.getElementById("step7substr").innerHTML = "";
	document.getElementById("expectedsavings").innerHTML = "";
}

function generateShifts(original) {
	var len = original.length;
	var curString = original;
	var cyclicStrings = [];
	for (var i = 0; i < len; i++) {
		cyclicStrings.push(curString);
		document.getElementById("rotations").innerHTML += curString.split(' ').join('&nbsp;') + " [" + i +  "]" + "<br />";
		curString = curString[len - 1] + curString.slice(0, len - 1);
	}
	return cyclicStrings;
	
}

function sortShifts(cyclicStrings, original) {
	sortedStrings = cyclicStrings.sort(function(a, b) { 
		if (a[0] == "$")
			return -1;
		if (b[0] == "$")
			return 1;
		return a.localeCompare(b, {sensitivity: 'case'});
	});
	var orig_index = 0;

	var len = sortedStrings.length;
	for (var i = 0; i < len; i++) {
		if (sortedStrings[i] == original) {
			document.getElementById("sortedRotations").innerHTML += "<b>" + sortedStrings[i].split(' ').join('&nbsp;') + " [" + i +  "]" + "</b><br />";
			orig_index = i;
			continue;
		}
		document.getElementById("sortedRotations").innerHTML += sortedStrings[i].split(' ').join('&nbsp;') + " [" + i +  "]" + "<br />";
	}

	if (original.length < 40) {
		document.getElementById("step2substr").innerHTML = original;
	} else {
		document.getElementById("step2substr").innerHTML = original.substring(0, 35) + "...";
	}
	document.getElementById("orig_index").innerHTML = orig_index;

	return sortedStrings;
}

function generateBWTOutput(sortedStrings) {
	var len = sortedStrings.length;
	var BWTOutput = "";
	for (var i = 0; i < len; i++) {
		BWTOutput += sortedStrings[i][len - 1];
	}

	document.getElementById("bwtOutputString").textContent = BWTOutput;
	return BWTOutput;
}

function mtf(data) {
  console.log(data)
  var table = _.range(256);
  var res = [];

  for (var i = 0; i < data.length; i++) {
    var code = data[i].charCodeAt();
    var idx = table.indexOf(code);
	res.push(idx);

    if (idx !== 0) {
      table.splice(idx, 1);
      table.unshift(code);
    }
  }

  return res;
}