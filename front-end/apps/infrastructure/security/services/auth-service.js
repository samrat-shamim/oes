define(['angular'], function (angular) {
    angular.module("sercurity").service("authService", function () {

        var users = [
                {
                    name: "admin",
                    password: "admin",
                    role: "admin"
                },
                 {
                     name: "accountant",
                     password: "accountant",
                     role: "accountant"
                 },
                 {
                     name: "user",
                     password: "user",
                     role: "user"
                 },

        ];
        this.userInfo = {};

        function setUserInfo(userInfo) {
            this.userInfo = userInfo;
        }


        function authorize(username, password) {
            
            for (var i = 0; i < users.length; i++) {
                if (users[i].name == username) {
                    if (users[i].password == password) {
                        var user = {
                            username: users[i].name,
                            role: users[i].role,
                            authenticated: true
                        }
                        setUserInfo(user);
                        break;
                    }
                }
            }
        }


        function logout() {
            this.userInfo = {};
        }



        this.authorize = authorize;
        this.logout = logout;



        return this;
    });
});