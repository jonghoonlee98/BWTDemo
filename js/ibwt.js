String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function indexOf(str, ch) { 
	for (var i = 0; i < str.length; i++) {
		if (str[i] == ch)
			return i;
	}
}

function ibwt() {
	document.getElementById("ibwt").style.display= "none";
	document.getElementById("inverse").style.display = "block";

	var bwtOutput = document.getElementById("bwtOutputString").textContent;
	const bwt = bwtOutput;

	if (bwtOutput.length < 40) {
		document.getElementById("step5substr").innerHTML = bwtOutput;
	} else {
		document.getElementById("step5substr").innerHTML = bwtOutput.substring(0, 35) + "...";
	}


	var original = document.getElementById("originalValue").value;
	original = original + "$";
	originalArray = original.split('');

	var sortedString = originalArray.sort(function(a, b) { 
		if (a[0] == "$")
			return -1;
		if (b[0] == "$")
			return 1;
		return a.localeCompare(b, {sensitivity: 'case'});
	});

	sortedString = sortedString.join('');

	var htmlSortedString = sortedString.split(' ').join('&nbsp;');

	document.getElementById("sortedbwt").innerHTML = htmlSortedString;

	var orig_index = document.getElementById("orig_index").innerHTML;
	document.getElementById("iorig_index").innerHTML = orig_index;

	var prev = "$"
	var str = bwtOutput;
	var left_index = [];
	left_index.push(parseInt(orig_index));
	document.getElementById("lists").innerHTML = prev + ": [" + orig_index;
	for (var i = 1; i < sortedString.length; i++) {
		if (sortedString[i] != prev) {
			if (sortedString[i] == ' ') {
				document.getElementById("lists").innerHTML += "]<br />&nbsp;: [";
			} else {
				document.getElementById("lists").innerHTML += "]<br /><b>" + sortedString[i] + "</b>: [";
			}
		} 
		var j = str.indexOf(sortedString[i]);
		document.getElementById("lists").innerHTML += " " + j + " "
		//var j = indexOf(str, sortedString[i]);
		left_index.push(j);

		str = str.replaceAt(j, '$');

		prev = sortedString[i];
	}
	document.getElementById("lists").innerHTML += "]"

	var x = parseInt(orig_index);
	var finalOutput = [];
	for (var i = 0; i < left_index.length; i++) {
		x = left_index[x];

		finalOutput.push(bwt[x]);
	}

	finalOutput = finalOutput.join('');

	document.getElementById("step7substr").innerHTML = original;

}