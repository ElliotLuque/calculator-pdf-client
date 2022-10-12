import { calcularUI, loginUI, logoutUI } from "./modules/ui.js";

const BASE_URL = "http://localhost:8085/authajaxcalculator/calculadora";

const app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

    $scope.login = function() {
        const login = $scope.loginInput
        const pass = $scope.passInput

        $http.post(`${BASE_URL}?op=login`, {
            login: login,
            pass: pass
        }, {withCredentials: true}).then(function(response) {
            const msg = response.data
            loginUI(msg)
        });
    }

    $scope.logout = function() {
        $http.post(`${BASE_URL}?op=logout`, {}, {withCredentials: true}).then(function(response) {
            const msg = response.data
            logoutUI(msg)
        });
    }

    $scope.calcular = function() {
        const operacion = $scope.operacion;
        const op1 = $scope.op1;
        const op2 = $scope.op2;

        $http.post(`${BASE_URL}?op=calcular`, {
            op1: op1,
            op2: op2,
            operacion: operacion
        }, {withCredentials: true}).then(function(response) {
            const msg = response.data
            calcularUI(msg)
        });
    }
});