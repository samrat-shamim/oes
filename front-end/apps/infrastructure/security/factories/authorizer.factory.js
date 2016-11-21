angular.module("security").
factory('authorizer', ['$rootScope', '$state', 'identifier',
  function ($rootScope, $state, identifier) {
      return {
          authorize: function () {
            $rootScope.authorized = true;
            var isAuthenticated = identifier.isAuthenticated();

            if ($rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0
              && !identifier.isInAnyRole($rootScope.toState.data.roles)) {
              if (isAuthenticated) $state.go('access-denied'); // user is signed in but not authorized for desired state
              else {
                // user is not authenticated. stow the state they wanted before you
                // send them to the signin state, so you can return them when you're done
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;

                // now, send them to the signin state so they can log in
                $state.go('login');
              }
            }else {
              $state.go($rootScope.toState.name);
            }
          }
      };
  }
])
