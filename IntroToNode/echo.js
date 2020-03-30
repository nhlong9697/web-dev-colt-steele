function average(scores) {
	var total = 0;
	scores.forEach(function(score) {
		total += score;
	});
	return Math.round(total/scores.length);
}

var scores = [1, 2, 3, 4, 5];

console.log(average(scores));