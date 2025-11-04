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
$email  = $_POST['email'] ?? '';
$novoUsuario  = $_POST['novo_usuario'] ?? '';
$confirmarUsuario = $_POST['confirmar_usuario'] ?? '';

// 1. Verifica se os nomes de usuário coincidem
if ($novoUsuario !== $confirmarUsuario) {
 echo "usuarios_diferentes";
 $conn->close();
 exit;
}

// 2. Verifica se o e-mail existe no banco
$stmt_check_email = $conn->prepare("SELECT email FROM users WHERE email = ?");
$stmt_check_email->bind_param("s", $email);
$stmt_check_email->execute();
$result_email = $stmt_check_email->get_result();

if ($result_email->num_rows === 0) { // E-mail não encontrado
 echo "email_nao_encontrado";
 $stmt_check_email->close();
 $conn->close();
 exit;
}
$stmt_check_email->close();

// 3. VERIFICAÇÃO EXTRA: Checa se o NOVO nome de usuário já está em uso
$stmt_check_user = $conn->prepare("SELECT usuario FROM users WHERE usuario = ?");
$stmt_check_user->bind_param("s", $novoUsuario);
$stmt_check_user->execute();
$result_user = $stmt_check_user->get_result();

if ($result_user->num_rows > 0) {
// Novo nome de usuário já existe
echo "usuario_ja_existe";
$stmt_check_user->close(); 
$conn->close();
 exit;
}
$stmt_check_user->close();


// 4. Se tudo estiver OK, prepara o UPDATE para atualizar o usuário
$stmt_update = $conn->prepare("UPDATE users SET usuario = ? WHERE email = ?");
$stmt_update->bind_param("ss", $novoUsuario, $email);

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