angular.module('flapperNews')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        function ($scope, posts) {
            $scope.test = 'Hello world!';
            $scope.posts = posts.posts;
            $scope.addPost = function () {
                if (!$scope.title || $scope.title === '') {
                    return;
                }
                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    content: $scope.content,
                    upvotes: 0
                });
                $scope.title = '';
                $scope.link = '';
                $scope.content = '';
            };
            $scope.incrementUpvotes = function(post) {
                posts.upvote(post);
            };
            $scope.addPost = function(){
                if(!$scope.title || $scope.content === '') { return; }
                posts.create({
                    title: $scope.title,
                    content: $scope.content
                });
                $scope.title = '';
                $scope.content = '';
            };
        }]);
