'use strict';


/* Controllers */
var appCtrls = angular.module('appControllers', []);

/* 封装ng的api,以尽量解耦ng与业务逻辑 */
appCtrls
  .service('ngApis', ['$http', '$location', '$routeParams',
   function($http, $location, $routeParams){
    this.http = $http;
    this.location = $location;
    this.routeParams = $routeParams;
  }])

appCtrls
  .controller('IndexCtrl', ['$scope', 'ngApis', IndexCtrl])
  .controller('AddPostCtrl', ['$scope', 'ngApis', AddPostCtrl])
  .controller('ReadPostCtrl', ['$scope', 'ngApis', ReadPostCtrl])
  .controller('EditPostCtrl', ['$scope', 'ngApis', EditPostCtrl])
  .controller('DeletePostCtrl', ['$scope', 'ngApis', DeletePostCtrl]);



function IndexCtrl(thisScope, apis) {
  apis.http.get('/api/posts').
      success(function(data, status, headers, config) {
        thisScope.posts = data.posts;
      });
  }

function AddPostCtrl(thisScope, apis) {
  thisScope.form = {};
  thisScope.submitPost = function () {
    apis.http.post('/api/post', thisScope.form).
      success(function(data) {
        apis.location.path('/');
      });
  };
}

function ReadPostCtrl(thisScope, apis) {
  apis.http.get('/api/post/' + apis.routeParams.id).
    success(function(data) {
      thisScope.post = data.post;
    });
}

function EditPostCtrl(thisScope, apis) {
  thisScope.form = {};
  apis.http.get('/api/post/' + apis.routeParams.id).
    success(function(data) {
      thisScope.form = data.post;
    });

  thisScope.editPost = function () {
    apis.http.put('/api/post/' + apis.routeParams.id, thisScope.form).
      success(function(data) {
        apis.location.url('/readPost/' + apis.routeParams.id);
      });
  };
}

function DeletePostCtrl(thisScope, apis) {
  apis.http.get('/api/post/' + apis.routeParams.id).
    success(function(data) {
      thisScope.post = data.post;
    });

  thisScope.deletePost = function () {
    apis.http.delete('/api/post/' + apis.routeParams.id).
      success(function(data) {
        apis.location.url('/');
      });
  };

  thisScope.home = function () {
    apis.location.url('/');
  };
}
