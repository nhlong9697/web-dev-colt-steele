var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer');

// APP CONFIG
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/restful_blog_app', );
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
// MONGOOSE/MONDEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
// 	title:"Test Blog",
// 	image:"https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg",
// 	body:"Hello this is a blog post!"
// });

//RESTFUL ROUTES

//HOMEAPGE ROUTE
app.get('/', function(req, res) {
	res.redirect('/blogs');
});

//INDEX ROUTE
app.get('/blogs', function(req, res) {
	//find all the blog save into @blogs variable
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log('ERROR!');
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

//NEW ROUTE
app.get('/blogs/new', function(req, res) {
	res.render('new');
});

//POST ROUTE
app.post('/blogs', function(req, res) {
	//sanitize the request before post
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//create new blog post to DB
	Blog.create(req.body.blog, function(err, newlyCreatedBlog) {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

//SHOW ROUTE
app.get('/blogs/:id', function(req, res) {
	//show the blog page
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', { blog: foundBlog });
		}
	});
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res) {
	//open edit page of a blog
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('edit', { blog: foundBlog });
		}
	});
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res) {
	//sanitize the request before update
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//find blog by id and edit 
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			//redirect to the blog page after edit
			//updateBlog._id can be replaced by @req.params.id
			res.redirect('/blogs/' + updatedBlog._id);
		}
	});
});

//DELETE ROUTE
app.delete('/blogs/:id', function(req, res) {
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(3000, function(req, res) {
	console.log('server is listening at port 3000');
});