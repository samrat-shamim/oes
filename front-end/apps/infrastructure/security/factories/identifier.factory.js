angular.module("security").
factory('identifier', ['$q', '$http', '$timeout','$rootScope',
  function ($q, $http, $timeout, $rootScope) {
      var _identity = undefined,
        _authenticated = false;

      return {
          isIdentityResolved: function () {
              return angular.isDefined(_identity);
          },
          isAuthenticated: function () {
              return _authenticated;
          },
          isInRole: function (role) {
              if (!_authenticated || !_identity.roles) return false;

              return _identity.roles.indexOf(role) != -1;
          },
          isInAnyRole: function (roles) {
              if (!_authenticated || !_identity.roles) return false;
              for (var i = 0; i < roles.length; i++) {
                  if (this.isInRole(roles[i])) return true;
              }
              return false;
          },
          authenticate: function (identity) {
              _identity = identity;
              $rootScope.$broadcast("authenticated");
              _authenticated = identity != null;
          },
          logout : function() {
              _identity = undefined;
              _authenticated = false;
          },
          identity: function (force) {
              if (force === true) _identity = undefined;

              if (angular.isDefined(_identity)) {
                  return _identity;
              }
          }
      };
  }
])
