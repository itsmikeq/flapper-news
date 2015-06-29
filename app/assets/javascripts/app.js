angular.module('flapperNews', ['ui.router', 'templates', 'Devise','ngSanitize'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            delete $httpProvider.defaults.headers.common['X-Content-Type-Options'];
            $httpProvider.defaults.useXDomain = true;
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/assets/home/_home.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['posts', function (posts) {
                            return posts.getAll();
                        }]
                    }
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/assets/posts/_posts.html',
                    controller: 'PostsCtrl',
                    resolve: {
                        post: ['$stateParams', 'posts', function ($stateParams, posts) {
                            return posts.get($stateParams.id);
                        }]
                    }

                })
                .state('login', {
                    url: '/login',
                    templateUrl: '/assets/auth/_login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: '/assets/auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                });

            $urlRouterProvider.otherwise('/home');
        }])
    .run(function ($rootScope) {
        // catch me some errors
        $rootScope.$on("$stateChangeError", console.log.bind(console));
    });
