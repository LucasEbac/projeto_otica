<?php
	// $hostname="your_hostname";
	// $username="root";
	// $password="";
	// $dbname="otica";
	// $usertable="ordem_de_servico";
	// $yourfield = "grau";
	
	// mysqli_connect($hostname,$username, $password) or die ("html>script language='JavaScript'>alert('Unable to connect to database! Please try again later.'),history.go(-1)/script>/html>");
	// mysqli_select_db($dbname);
	
	// # Check If Record Exists
	
	// $query = "SELECT * FROM $usertable";
	
	// $result = mysqli_query($query);
	
	// if($result){
	// 	while($row = mysqli_fetch_array($result)){
	// 		$name = $row["$yourfield"];
	// 		echo "Name: ".$name."br/>";
	// 	}
	// }

    ECHO "ENTREI";

    // if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //     // Verifica se os campos foram preenchidos
    //     if (isset($_POST['grau-cliente']) && isset($_POST['armacao']) && isset($_POST['valor']) && isset($_POST['descricao']) && isset($_POST['nome_cliente'])  && isset($_POST['telefone'])) {
    //         // Inclui a classe PHP que processa o formulário
    //         require_once 'ClasseFormulario.php';
    
    //         // Instancia a classe
    //         $formulario = new ClasseFormulario();
    
    //         // Obtém os dados do formulário
    //         $grau_cliente = $_POST['grau-cliente'];
    //         $armacao = $_POST['armacao'];
    //         $valor = $_POST['valor'];
    //         $descricao = $_POST['descricao'];
    //         $nome_cliente= $_POST['nome_cliente'];
    //         $telefone = $_POST['telefone'];
    
    
    //         // Processa os dados com a classe
    //         $resultado = $formulario->processarFormulario($grau_cliente, $armacao,$valor,$descricao,$nome_cliente,$telefone);
    
    //         // Exibe o resultado
    //         echo $resultado;
    //     } else {
    //         echo "Por favor, preencha todos os campos.";
    //     }
    // } else {
    //     // Redireciona se acessado diretamente
    //     header("Location: arquivo_formulario.html");
    //     exit();
    // }
?>