<?php
session_start(); // Inicia a sessão

// Configuração do banco de dados MySQL
$servername = "localhost";   // ou IP do servidor
$username   = "root";        // usuário do MySQL
$password   = "";        // senha do MySQL
$dbname     = "bancousers";  // nome do banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco: " . $conn->connect_error);
}

// Receber dados do JS
$usuario = $_POST['usuario'] ?? '';
$senha   = $_POST['senha'] ?? '';

// Preparar e executar a consulta
$stmt = $conn->prepare("SELECT * FROM users WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "Usuário não encontrado";
    exit;
}

$user = $result->fetch_assoc();

// Verificar senha
if (password_verify($senha, $user['senha'])) {
    // Salva dados do usuário na sessão
    $_SESSION['usuario'] = $user['usuario'];
    $_SESSION['nome']    = $user['nome']; // Certifique-se de que existe um campo 'nome'

    echo "sucesso";
} else {
    echo "Senha incorreta";
}

// Fechar conexão
$stmt->close();
$conn->close();
?>
