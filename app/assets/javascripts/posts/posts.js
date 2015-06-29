angular.module('flapperNews')
    .factory('posts', ['$http', function ($http, posts) {
        var o = {
            posts: []
        };
        o.get = function (id) {
            return $http.get('/posts/' + id + '.json').then(function (res) {
                return res.data;
            });
        };
        o.getAll = function () {
            return $http.get('/posts.json').success(function (data) {
                // Copy the data into the current view
                angular.copy(data, o.posts);
            });

        };
        o.upvote = function (post) {
            return $http.put('/posts/' + post.id + '/upvote.json')
                .success(function (data) {
                    post.upvotes += 1;
                });
        };
        o.upvoteComment = function (post, comment) {
            return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/upvote.json')
                .success(function (data) {
                    comment.upvotes += 1;
                });
        };
        o.create = function (post) {
            return $http.post('/posts.json', post).success(function (data) {
                o.posts.push(data);
            });
        };
        o.addComment = function (id, comment) {
            return $http.post('/posts/' + id + '/comments.json', comment);
        };
        return o;

    }]);
