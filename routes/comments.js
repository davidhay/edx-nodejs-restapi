const createText = text => ({text});

const workWithComment = (req, res, postId, comments, commentId, callback) => {
  if (comments && commentId >= 0 && commentId < comments.length) {
    callback();
  } else {
    res.status(400).send(`The commentId : ${commentId} for postId ${postId} does not exist.`);
  }
};

const workWithText = (req, res, callback) => {
  if (typeof req.body.text === 'string' || req.body.text.trim().length > 0 ) {
      callback(req.body.text.trim());
  } else {
      res.send(`To add a new commment, the body must contain a non-empty String for the JSON String 'text'.`);
  }
};

module.exports = {
  findPost(req,res,next) {
      const {posts} = req;
      const {postId} = req.params;
      if (postId >= 0 && postId < posts.length) {
        req.post = posts[postId];
        next();
      } else {
        res.status(400).send(`The postId : ${postId} does not exist.`);
      }
  },

  getComments(req, res) {
    const {postId} = req.params;
    const {post} = req;
    const comments = post.comments || [];
    console.log(`The comments for postId: ${postId} are ${JSON.stringify(comments)}`)
    res.json(comments);
  },

  addComment(req, res) {
    const {postId} = req.params;
    const {post} = req;
    workWithText(req, res, (text) => {
      post.comments = post.comments || [];
      const commentId = post.comments.length;
      post.comments.push(createText(text));
      res.send(`For postId:${postId}, just added comment - commentId:${commentId}`);
    });
  },

  updateComment(req, res) {
    const {postId, commentId} = req.params;
    workWithComment(req, res, postId, req.post.comments, commentId, () => {
      workWithText(req, res, (text) => {
        Object.assign(req.post.comments[commentId], createText(text));
        res.send(`updated comment - postId:${postId}, commentId:${commentId}`);
      });
    });
  },

  removeComment(req, res) {
    const {postId, commentId} = req.params;
    workWithComment(req, res, postId, req.post.comments, commentId, () => {
        req.post.comments.splice(commentId,1);
        res.send(`removed comment - postId:${postId}, commentId:${commentId}`);
    });
  }
}
