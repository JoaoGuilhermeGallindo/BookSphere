<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$serverName = "ACER-ASPIRE-DE-GALLINDO\\SQLSERVER2022";
$connectionInfo = ["Database" => "bancoUsers"];
$conn = sqlsrv_connect($serverName, $connectionInfo);

if ($conn === false) {
    echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco.']);
    exit;
}

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não autenticado']);
    exit;
}

$usuario = $_SESSION['usuario'];

// Verifica se o arquivo foi enviado
if (!isset($_FILES['avatar'])) {
    echo json_encode(['success' => false, 'message' => 'Arquivo avatar não enviado']);
    exit;
} elseif ($_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Erro no envio do arquivo: ' . $_FILES['avatar']['error']]);
    exit;
}

// Verifica se é uma imagem
$mime = mime_content_type($_FILES['avatar']['tmp_name']);
if (strpos($mime, 'image/') !== 0) {
    echo json_encode(['success' => false, 'message' => 'Arquivo enviado não é uma imagem.']);
    exit;
}

// Configuração do banco de dados


// Lê o conteúdo binário da imagem
$imagem = file_get_contents($_FILES['avatar']['tmp_name']);

// ✅ Aqui entra o trecho corrigido
$sql = "UPDATE users SET foto = ? WHERE usuario = ?";
$params = [$imagem, $usuario];
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt) {
    echo json_encode(['success' => true, 'message' => 'Foto atualizada com sucesso.']);
} else {
    $mensagemErro = 'Erro ao salvar no banco.';
    if ($errors = sqlsrv_errors()) {
        foreach ($errors as $error) {
            $mensagemErro .= ' SQLSTATE: ' . $error['SQLSTATE'] . ' - Code: ' . $error['code'] . ' - Message: ' . $error['message'];
        }
    }
    echo json_encode(['success' => false, 'message' => $mensagemErro]);
}
?>
