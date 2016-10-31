angular.module("security").
factory('identifier', ['$q', '$http', '$timeout',
  function ($q, $http, $timeout) {
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
              _authenticated = identity != null;
          },
          logout : function() {
              _identity = undefined;
              _authenticated = false;
          },
          identity: function (force) {
              var deferred = $q.defer();

              if (force === true) _identity = undefined;

              if (angular.isDefined(_identity)) {
                  deferred.resolve(_identity);

                  return deferred.promise;
              }

              var self = this;
              $timeout(function () {
                  self.authenticate(null);
                  deferred.resolve(_identity);
              }, 10);

              return deferred.promise;
          }
      };
  }
])