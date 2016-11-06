angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$cordovaCamera) {
      var end=false;
       $scope.datalists=[];
       $scope.params={ //设置加载的数据每页加载2个数据
            page:1,
            rows:10,
            id:20,
            callback:'JSON_CALLBACK'
      }

      $scope.loadMore=function(){
        if(end){
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }

        $http({
          url:'http://www.tngou.net/api/cook/list',
          method:'jsonp',
          params:$scope.params
        }).then(function(res){
          
            if(res.data.tngou!=undefined &&res.data.tngou.length>0){

              angular.forEach(res.data.tngou,function(item){
                $scope.datalists.push(item)
              })
              $scope.params.page+=1;
            }else{
              end=true;
            }
        }).finally(function(){
            $scope.$broadcast('scroll.infiniteScrollComplete');//加载完之后这个必须要写的
          })
      }
})

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }


  var end=false;
       $scope.datalists=[];
       $scope.params={ //设置加载的数据每页加载2个数据
            page:1,
            rows:10,
            id:20,
            callback:'JSON_CALLBACK'
      };

      $scope.loadMore=function(){
        if(end){
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }

        $http({
          url:'http://www.tngou.net/api/lore/list',
          method:'jsonp',
          params:$scope.params
        }).then(function(res){
            if(res.data.tngou!=undefined &&res.data.tngou.length>0){
              angular.forEach(res.data.tngou,function(item){
                $scope.datalists.push(item)
              })
              $scope.params.page+=1;
            }else{
              end=true;
            }
        }).finally(function(){
            $scope.$broadcast('scroll.infiniteScrollComplete');//加载完之后这个必须要写的
          })
      }
})




.controller('dashDetailCtrl', function($scope, $stateParams,$http, Chats) {
   $scope.params={
    id:$stateParams.dashId,
    callback:"JSON_CALLBACK"
  }
  $http({
    url:'http://www.tngou.net/api/cook/show',
    method:'jsonp',
    params:$scope.params
  }).then(function(res){
    //console.log(res.data)
    $scope.item=res.data;
  })
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$http) {
  $scope.params={
    id:$stateParams.chatId,
    callback:"JSON_CALLBACK"
  }
  $http({
    url:'http://www.tngou.net/api/lore/show',
    method:'jsonp',
    params:$scope.params
  }).then(function(res){
    console.log(res.data)
    $scope.item=res.data;
  })
})

.controller('AccountCtrl', function($scope,$http) {
  var end=false;
       $scope.datalists=[];
       $scope.params={ //设置加载的数据每页加载2个数据
            page:1,
            rows:10,
            id:20,
            callback:'JSON_CALLBACK'
      };

      $scope.loadMore=function(){
        if(end){
          $scope.$broadcast('scroll.infiniteScrollComplete');
          return;
        }

        $http({
          url:'http://www.tngou.net/api/ask/list',
          method:'jsonp',
          params:$scope.params
        }).then(function(res){
            console.log(res)
            if(res.data.tngou!=undefined &&res.data.tngou.length>0){
              angular.forEach(res.data.tngou,function(item){
                $scope.datalists.push(item)
              })
              $scope.params.page+=1;
            }else{
              end=true;
            }
        }).finally(function(){
            $scope.$broadcast('scroll.infiniteScrollComplete');//加载完之后这个必须要写的
          })
      }

})


.controller('accountDetailCtrl', function($scope, $stateParams,$http) {
  $scope.params={
    id:$stateParams.accountId,
    callback:"JSON_CALLBACK"
  }
  $http({
    url:'http://www.tngou.net/api/ask/show',
    method:'jsonp',
    params:$scope.params
  }).then(function(res){
    console.log(res.data)
    $scope.item=res.data;
  })
})












.controller('IntroCtrl',function($scope,$ionicSlideBoxDelegate,$http,$timeout,$state){
     

      var getHtml=function(index){
          $http({
              url:'templates/intro'+index+'.html',
              method:'get'
            }).then(function(response){
              $scope.html=response.data;
            })
      }

       getHtml(0);

      $scope.slideHasChanged=function(index){
            getHtml(index);
      }

      $scope.goHome=function(){
        $state.go('tab.dash');
        window.localStorage.hasIntro=false;
        //console.log(window.localStorage.key)
      }


})