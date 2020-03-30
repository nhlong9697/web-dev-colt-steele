var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
// //adding a new cat to database
// var george = new Cat({
// 	name: "Mrs.Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// george.save(function(err, cat) {
// 	if (err) {
// 		console.log("smt wrong");
// 	}
// 	else {
// 		console.log(cat);
// 		console.log("Cat is saved to the database");
// 	}
// });
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland" 
}, function(err, cat) {
	if (err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});
//retrieve all cats from DB and console.log each one
Cat.find({}, function(err, cats){
	if (err) {
		console.log("oh no, error!");
		console.log(err);
	}	else {
		console.log("ALL THE CATS");
		console.log(cats);
	}
})
