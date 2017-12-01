const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

const {comments,posts} = require('./routes');

const store = {
  posts : []
};

let app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

// add posts to every request object
app.use((req,res,next) => {
  req.posts = store.posts;
  next();
});

app.get('/posts/',  posts.getPosts);
app.post('/posts/', posts.addPost);
app.put('/posts/:postId', posts.updatePost);
app.delete('/posts/:postId', posts.removePost);

const findPost = comments.findPost;//sets up the post in the request

app.get   ('/posts/:postId/comments',            findPost, comments.getComments);
app.post  ('/posts/:postId/comments',            findPost, comments.addComment);
app.put   ('/posts/:postId/comments/:commentId', findPost, comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', findPost, comments.removeComment);

app.listen(3000);
