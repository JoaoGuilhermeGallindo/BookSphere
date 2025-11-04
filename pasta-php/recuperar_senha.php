<?php
// Configuração do banco de dados (igual ao seu 'cadastrar.php')
$servername = "srv791.hstgr.io";
$username  = "u831223978_root";
$password  = "BookSphere1";
$dbname   = "u831223978_bancousers";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
die("erro_sql: " . $conn->connect_error);
}

// Receber os dados do formulário
$email = $_POST['email'] ?? '';
$novaSenha = $_POST['nova_senha'] ?? '';
$confirmar = $_POST['confirmar_senha'] ?? '';

// 1. Verifica se as senhas coincidem (validação de servidor)
if ($novaSenha !== $confirmar) {
 echo "senhas_diferentes";
 $conn->close();
 exit;
}

// 2. Verifica se o e-mail existe no banco
$stmt_check = $conn->prepare("SELECT email FROM users WHERE email = ?");
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows === 0) { // E-mail não encontrado
  echo "email_nao_encontrado";
  $stmt_check->close();
  $conn->close();
  exit;
}
$stmt_check->close();

// 3. Se o e-mail existe, criptografa a nova senha
$senhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);

// 4. Prepara o UPDATE para atualizar a senha
$stmt_update = $conn->prepare("UPDATE users SET senha = ? WHERE email = ?");
$stmt_update->bind_param("ss", $senhaHash, $email);

// 5. Executa a atualização
if ($stmt_update->execute()) {
 echo "sucesso";
} else {
 echo "erro_sql: " . $stmt_update->error;
}

// Fechar
$stmt_update->close();
$conn->close();
?>