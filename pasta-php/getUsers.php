<?php
session_start();
// Verifica sessão básica
if (!isset($_SESSION['usuario']) || !isset($_SESSION['nome'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não está logado.']);
    exit;
}

$response = [
    'usuario' => $_SESSION['usuario'],
    'nome' => $_SESSION['nome'],
    'imagem' => $_SESSION['imagem'] ?? ''
];

// Tenta conectar ao banco e buscar progressos do usuário (se possível)
// Se ocorrer qualquer erro, retornamos apenas os dados de sessão
try {
    $servername = "srv791.hstgr.io";
    $username   = "u831223978_root";
    $password = "BookSphere1";
    $dbname  = "u831223978_bancousers";

    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // busca id numérico do usuário
    $stmt = $conn->prepare("SELECT id FROM users WHERE usuario = :usuario LIMIT 1");
    $stmt->execute(['usuario' => $_SESSION['usuario']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $user_id = $user['id'];

        // busca todos progressos do usuário
        $stmt2 = $conn->prepare("SELECT book_identifier, last_page FROM user_reading_progress WHERE user_id = :uid");
        $stmt2->execute(['uid' => $user_id]);
        $progress = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        $response['progress'] = $progress ?: [];
    } else {
        $response['progress'] = [];
    }

} catch (Exception $e) {
    // Falha ao conectar ou consultar: apenas retorna dados mínimos
    $response['progress'] = [];
}

echo json_encode($response);

