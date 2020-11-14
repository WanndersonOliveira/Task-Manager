
		var url = "";

		function inicio(){
			var nome = sessionStorage.getItem('nome');
			var data = new Date();
			var msg = "";

			if(data.getHours() >= 5 && data.getHours() <= 11){
				msg = "Bom dia ";
			} 

			if(data.getHours() >= 12 && data.getHours() <= 17){
				msg = "Boa tarde ";
			}

			if(data.getHours() >= 18 && data.getHours() <= 0){
				msg = "Boa noite ";
			}


			if(data.getHours() >= 0 && data.getHours() <= 4){
				msg = "Olá ";
			}

			document.getElementById("msg").innerHTML = msg+nome+"!";
		}


		var openFile = function(event){
			var input = event.target;

			var reader = new FileReader();
			reader.onload = function(){
				url = reader.result;
			};
			reader.readAsDataURL(input.files[0]);
		};




		var app = angular.module('myapp',[]);

		app.controller('taskCtrl', function($scope){
			$scope.tarefas = [];

			$scope.params=[{data:"Assunto",cor:"#d9d9d9"},{data:"Local",cor:"white"},{data:"Data",cor:"#d9d9d9"},{data:"Horário",cor:"White"},{data:"Duração",cor:"#d9d9d9"},{data:"Comentário",cor:"White"},{data:"Anexo",cor:"#d9d9d9"}, {data:"Concluído",cor:"White"}]

			$scope.alerta="Você não tem tarefas cadastradas.";
			$scope.btn=["Adicionar Tarefa","Criar Tarefa","Concluir"];
			$scope.duracao=["0 minutos", "30 minutos", "1 hora", "90 minutos", "2 horas", "Dia inteiro"];

			$scope.assunto="Assunto";
			$scope.local="Local";
			$scope.data="";
			$scope.time="";
			$scope.comentario="";

			$scope.aparecer = function(){

				var json = sessionStorage.getItem('tarefas');

				if(json != null){
					$scope.tarefas = JSON.parse(json);

					document.getElementById("alerta").style.display="none";
				}

				document.getElementById('criarTarefa').style.display="block";

				$scope.assunto="Assunto";
				$scope.local="Local";
				$scope.data="";
				$scope.time="";
			}

			$scope.fechar = function(){
				document.getElementById('criarTarefa').style.display="none";
			}

			$scope.gravar = function(){

				document.getElementById('criarTarefa').style.display="none";
				var data = document.getElementById("data").value;
				var time = document.getElementById("time").value;
				var duracao = document.getElementById("duracao").value;

				data = data.split("-");

				data = data[2]+"/"+data[1]+"/"+data[0];

				var tarefa = {assunto:"",local:"",data:"",time:"",duracao:"",comentario:"", anexo:"",cor:"",id:"", idDload:""};

				tarefa.assunto = $scope.assunto;
				tarefa.local = $scope.local;
				tarefa.data = data;
				tarefa.time = time;
				tarefa.duracao = duracao;
				tarefa.comentario = $scope.comentario;
				tarefa.anexo = url;
				tarefa.id = "t"+$scope.tarefas.length;
				tarefa.idDload = "d"+$scope.tarefas.length;

				if($scope.tarefas.length % 2 == 0){
					tarefa.cor="grey";
				} else {
					tarefa.cor="#999999";
				}

				$scope.tarefas.push(tarefa);

				var json = JSON.stringify($scope.tarefas);

				sessionStorage.setItem('tarefas',json);

				document.getElementById("alerta").style.display="none";


					setInterval(function(){

						var data = new Date();
						var time = {dia:data.getDate(),mes:data.getMonth()+1,ano: data.getFullYear(), hora:data.getHours(), min:data.getMinutes()};

						for(var i = 0; i < $scope.tarefas.length; i++){
							var id="t"+i;
							var idDload = "d"+i;

							var tarefa_data = $scope.tarefas[i].data.split("/");
							var tarefa_time = $scope.tarefas[i].time.split(":");

							var elem = document.getElementById(id);


							if(time.mes == tarefa_data[1]){
								if(time.dia == tarefa_data[0]){
									if(time.hora == tarefa_time[0]){
										if(time.min == tarefa_time[1]){
											$scope.tarefas[i].cor = "#ff6666";
										}
									}
								}
							}



							if(elem != null){

								var check = document.getElementById(id).checked;

								if(check == true){
									document.getElementById(id).style.display = "none";
									document.getElementById(idDload).style.display = "none";
									$scope.tarefas[i].assunto="";
									$scope.tarefas[i].data="";
									$scope.tarefas[i].time="";
									$scope.tarefas[i].local="";
									$scope.tarefas[i].duracao="";
									$scope.tarefas[i].comentario="";
									$scope.tarefas[i].anexo="";

									var json = sessionStorage.getItem('tarefas');
									var tarefas = JSON.parse(json);

									tarefas[i].assunto="";
									tarefas[i].data="";
									tarefas[i].time="";
									tarefas[i].local="";
									tarefas[i].duracao="";
									tarefas[i].comentario="";
									tarefas[i].anexo="";

									json = JSON.stringify(tarefas);

									sessionStorage.setItem('tarefas', json);
								}
							}
						}

					},3000);
			}


		});
