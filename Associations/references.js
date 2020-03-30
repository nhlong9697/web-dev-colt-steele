var mongoose = require("mongoose");
		
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/blog_demo_2");
//POST - title, content
var Post = require("./models/post");
//USER - email, name
var User = require("./models/user");
// Post.create({
// 	title:"How to cook the best burger pt.4",
// 	content:"filthy frank buger"
// }, function(err, post) {
// 	User.findOne({email:"bob@gmail.com"}, function(err, foundUser){
// 		if(err) {
// 			console.log(err)
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save(function(err, data){
// 				if(err) {
// 					console.log(err);
// 				} else {
// 					console.log(data);
// 				}
// 			})
// 		}
// 	})
// });


//find User
//find all user post
User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err, user) {
	if (err) {
		console.log(err);
	}
	else {
		console.log(user);
	}
})