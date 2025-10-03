<?php

// Configuração do banco de dados MySQL
$servername = "localhost";   // ou 127.0.0.1
$username   = "root";        // usuário
$password   = "";            // senha (em branco no MySQL padrão do XAMPP/WAMP)
$dbname     = "bancousers";  // seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("erro_sql: " . $conn->connect_error);
}

// Receber os dados do formulário
$nome     = $_POST['nome'] ?? '';
$email    = $_POST['email'] ?? '';
$usuario  = $_POST['usuario'] ?? '';
$senha    = $_POST['senha'] ?? '';
$confirmar = $_POST['confirmar_senha'] ?? '';

// Verifica se senha e confirmação conferem
if ($senha !== $confirmar) {
    echo "senhas_diferentes";
    exit;
}

// Criptografar senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Preparar INSERT
$stmt = $conn->prepare("INSERT INTO users (nome, email, usuario, senha) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nome, $email, $usuario, $senhaHash);

// Executar
if ($stmt->execute()) {
    echo "sucesso";
} else {
    echo "erro_sql: " . $stmt->error; // Mostra erro real
}

// Fechar
$stmt->close();
$conn->close();
?>
