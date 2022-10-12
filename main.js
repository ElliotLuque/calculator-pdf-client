import { showToast } from "./modules/toast.js";
import { generatePDF } from "./modules/pdf.js";

const BASE_URL = "http://localhost:8085/authajaxcalculator/calculadora";

const app = angular.module('app-calc', ['ngRoute']);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true
}]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/calculadora.html",
        controller: "loginController"
    })
    .when("/pdf", {
        templateUrl : "pages/pdf.html",
        controller: "pdfController"
    })
    .when("/login", {
        templateUrl : "pages/login.html",
        controller: "loginController"
    })
    .when("/logout", {
        templateUrl : "pages/logout.html",
        controller: "logoutController"
    })
    .when("/calculadora", {
        templateUrl : "pages/calculadora.html",
        controller: "calculadoraController"
    })
    .otherwise({
        redirectTo: "/"
    });
});

app.controller('pdfController', function($scope, $http) {
    $scope.pdf = function() {
        $http.get(`${BASE_URL}?op=getdata`)
        .then(function(response) {
            const msg = response.data;
            if (msg === "No hay sesión iniciada!") {
                showToast("error-toast", response.data);
            } 
            else {
                generatePDF(msg, "ejemplo.pdf");
            }     
        });
    }
});

app.controller('loginController', function($scope, $http) {
    $scope.login = function() {
        const login = $scope.loginInput
        const pass = $scope.passInput

        $http.post(`${BASE_URL}?op=login`, {
            login: login,
            pass: pass
        })
        .then(function(response) {
            const msg = response.data
            if (msg === "Datos incorrectos!") {
                showToast("error-toast", msg);
            } else {
                showToast("success-toast", "Bienvenido " + msg.login + "!");
            }
        });
    }
});

app.controller('logoutController', function($scope, $http) {
    $scope.logout = function() {
        $http.post(`${BASE_URL}?op=logout`)
        .then(function(response) {
            const msg = response.data
            showToast("success-toast",msg)
        });
    }
});


app.controller('calculadoraController', function($scope, $http) {
    $scope.calcular = function() {
        const operacion = $scope.operacion;
        const op1 = $scope.op1;
        const op2 = $scope.op2;

        $http.post(`${BASE_URL}?op=calcular`, {
            op1: op1,
            op2: op2,
            operacion: operacion
        })
        .then(function(response) {
            const msg = response.data
            $scope.resultado = msg
            
            if (msg === "No hay sesión iniciada!") {
                $scope.resultado = "";
                showToast("error-toast", msg);
            } else {
                $scope.resultado = "Resultado: " + msg;
            }
        });
    }
});