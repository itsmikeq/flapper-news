angular.module('flapperNews')
    .controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        'posts',
        'post',
        function ($scope, $stateParams, posts, post) {
            $scope.addPost = function () {
                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    content: $scope.content,
                    upvotes: 0,
                    comments: []
                });
            };
            // Set the current post
            $scope.post = post;
            // Add a comment
            $scope.addComment = function () {
                if ($scope.body === '') {
                    return;
                }
                posts.addComment(post.id, {
                    body: $scope.body,
                    author: 'user'
                }).success(function (comment) {
                    $scope.post.comments.push(comment);
                });
                $scope.body = '';
            };
            $scope.incrementUpvotes = function (comment) {
                posts.upvoteComment(post, comment);
            };
        }]);

