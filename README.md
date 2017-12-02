# edx-nodejs-restapi

node.js project with rest api

 API
* GET and POST /posts
* PUT and DELETE /posts/:postId/
* GET and POST /posts/:postId/comments
* PUT and DELETE /posts/:postId/comments/commentId

 Design
1. Used suggested nested arrays to hold posts and comments. The zero based indexes of the posts and comments are to be used in the rest api URLS  
when manipuating specific posts and comments.
2. To keep things simple - you cannot add comments when adding/updating a post.
3. When adding/updating a comment - the comment must be provided as the value of the json document property test. {"text":&lt;comment&gt;}
4. When returning posts - the data returned will not return comments. You can only see he comments of a specific post.
5. I used a simple middleware for all routes that target comments to make sure that a valid post was specified in the URL. The post would then be made available in req.post.

Testing
1. There are no automated tests.
2. Testing was done manually with help of POSTMAN - the postman collection of API calls is provided as 'EDX-NODEJS.postman_collection.json'.
