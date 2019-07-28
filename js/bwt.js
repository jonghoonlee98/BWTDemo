function bwt() {
	clearContent();
	var original = document.getElementById("originalValue").value;

	document.getElementById("step1").style.display = "block";
	original = original + "$";
	cyclicStrings = generateShifts(original);

	document.getElementById("step2").style.display = "block";
	sortedStrings = sortShifts(cyclicStrings);

	document.getElementById("step3").style.display = "block";
	BWTOutput = generateBWTOutput(sortedStrings);
}

function clearContent() {
	document.getElementById("step1").style.display = "none";
	document.getElementById("step2").style.display = "none";
	document.getElementById("step3").style.display = "none";

	document.getElementById("rotations").innerHTML = "";
	document.getElementById("sortedRotations").innerHTML = "";
	document.getElementById("bwtOutput").innerHTML = "";

	document.getElementById("rotations").style.display = "none";
	document.getElementById("sortedRotations").style.display = "none";
	document.getElementById("bwtOutput").style.display = "none";
}

function generateShifts(original) {
	console.log(original);
	var len = original.length;
	var curString = original;
	var cyclicStrings = [];
	for (var i = 0; i < len; i++) {
		cyclicStrings.push(curString);
		document.getElementById("rotations").innerHTML += "• " +  curString + "<br />"
		curString = curString[len - 1] + curString.slice(0, len - 1);
	}
	document.getElementById("rotations").style.display = "block";
	console.log(cyclicStrings);
	return cyclicStrings;
	
}

function sortShifts(cyclicStrings) {
	sortedStrings = cyclicStrings.sort((a, b) => a.localeCompare(b)); 
	console.log(sortedStrings);

	var len = sortedStrings.length;
	for (var i = 0; i < len; i++) {
		document.getElementById("sortedRotations").innerHTML += "• " + sortedStrings[i] + "<br />"
	}
	document.getElementById("sortedRotations").style.display = "block";

	return sortedStrings;
}

function generateBWTOutput(sortedStrings) {
	var len = sortedStrings.length;
	var BWTOutput = "";
	for (var i = 0; i < len; i++) {
		BWTOutput += sortedStrings[i][len - 1];
	}
	console.log(BWTOutput);

	document.getElementById("bwtOutput").style.display = "block";

	document.getElementById("bwtOutput").textContent = BWTOutput;
	return BWTOutput;
}