function workWithPost(req, res, postId, callback){
  if (postId >= 0 && postId < req.posts.length) {
    callback();
  } else {
    res.status(400).send(`The postId:${postId} is invalid.`);
  }
};
module.exports = {
  getPosts(req, res) {
    //don't return the comments with the posts - there's a separate API to get comments
    const {posts} = req;
    const responseData = [];
    for (post of posts) {
      const postCopy = Object.assign({}, post);
      delete postCopy.comments;
      responseData.push(postCopy);
    }
    res.json(responseData);
  },
  addPost(req, res) {
    const {posts} = req;
    const postId = posts.length;
    const post = req.body;
    delete post.comments; //you can't send comments with new post
    posts.push(post);
    res.send(`added new post - postId:${postId}`);
  },
  updatePost(req, res) {
    const {posts} = req;
    const {postId} = req.params;
    const updatedPost = req.body;
    delete updatedPost.comments;//you can't send comments with an updated post
    workWithPost(req, res, postId, () => {
      Object.assign(posts[postId],updatedPost);
      res.send(`updated post - postId:${postId}`);
    });
  },
  removePost(req, res) {
    const {posts}  = req;
    const {postId} = req.params;
    workWithPost(req, res, postId, () => {
      posts.splice(postId,1);
      res.send(`removed post - postId:${postId}`);
    });
  }
}
