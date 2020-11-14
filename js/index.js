
		var app = angular.module('myapp',[]);

		app.controller('loginCtrl', function($scope){
			$scope.email="";
			$scope.senha="";
			$scope.msg="";

			$scope.entrar = function(){
				if($scope.senha.length==0){
					$scope.msg = "Insira a sua senha.";
				}


				if($scope.email.length==0){
					$scope.msg = "Insira o seu email.";
				}

				if($scope.senha.length != 0 && $scope.email.length != 0){

					var json = sessionStorage.getItem('usuario');

					var usuario = JSON.parse(json);

					if($scope.senha.localeCompare(usuario.senha) != 0){
						$scope.msg = "A senha não confere!";
					}

					if($scope.email.localeCompare(usuario.email) != 0){
						$scope.msg = "O email não confere!";
					}

					if($scope.senha.localeCompare(usuario.senha) == 0 && $scope.email.localeCompare(usuario.email) == 0){

						json = undefined;

						sessionStorage.setItem('nome',usuario.nome);

						usuario = undefined;

						window.location.replace("tarefas.html");
					}
				}
			}
		});