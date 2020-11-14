
		var app = angular.module('myapp',[]);

		app.controller('cadCtrl', function($scope){
			$scope.nome="";
			$scope.email="";
			$scope.senha="";
			$scope.senha2="";
			$scope.msg = "";

			$scope.cadastrar = function(){

				if($scope.senha2.length==0){
					$scope.msg = "Insira novamente a sua senha.";
				}

				if($scope.senha.length==0){
					$scope.msg = "Insira a sua senha.";
				}


				if($scope.email.length==0){
					$scope.msg = "Insira o seu email.";
				}

				if($scope.nome.length==0){
					$scope.msg = "Insira o seu nome.";
				}

				if($scope.senha.localeCompare($scope.senha2) != 0){
					$scope.msg = "As senhas não são iguais!";
				}

				if($scope.senha.localeCompare($scope.senha2) == 0 && $scope.senha2.length != 0 && $scope.senha.length != 0 && $scope.email.length != 0 && $scope.nome.length != 0){
					var user = {nome: $scope.nome, email: $scope.email, senha: $scope.senha};
					var json = JSON.stringify(user);

					sessionStorage.setItem('usuario',json);


					document.getElementById("msg").style.color="green";
					$scope.msg = "Usuário cadastrado com sucesso!";
				}
			}
		});
