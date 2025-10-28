<?php
// Configuração do banco de dados MySQL (Hostinger)
$servername = "srv791.hstgr.io";
$username   = "u831223978_root";
$password   = "BookSphere1";
$dbname     = "u831223978_bancousers";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("erro_sql: " . $conn->connect_error);
}

// Receber os dados do formulário
$nome      = $_POST['nome'] ?? '';
$email     = $_POST['email'] ?? '';
$usuario   = $_POST['usuario'] ?? '';
$senha     = $_POST['senha'] ?? '';
$confirmar = $_POST['confirmar_senha'] ?? '';

// Verifica se senha e confirmação conferem
if ($senha !== $confirmar) {
    echo "senhas_diferentes";
    exit;
}

// Criptografar senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// =====================
// Upload da imagem
// =====================
$imagem_nome = null;

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
    $pasta = "imagens-usuarios/";
    $extensao = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
    $imagem_nome = uniqid("user_", true) . "." . strtolower($extensao);
    $caminho_final = $pasta . $imagem_nome;

    // Verifica se a pasta existe
    if (!is_dir($pasta)) {
        mkdir($pasta, 0755, true);
    }

    // Move o arquivo
    if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $caminho_final)) {
        echo "erro_upload";
        exit;
    }
} else {
    echo "nenhuma_imagem";
    exit;
}

// =====================
// Inserir no banco
// =====================
$stmt = $conn->prepare("INSERT INTO users (nome, email, usuario, senha, imagem) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $email, $usuario, $senhaHash, $imagem_nome);

if ($stmt->execute()) {
    echo "sucesso";
} else {
    echo "erro_sql: " . $stmt->error;
}

// Fechar
$stmt->close();
$conn->close();
?>
