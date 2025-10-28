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

        // Se for POST e ação de salvar progresso, processa a requisição
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            if (is_array($input) && isset($input['action']) && $input['action'] === 'save_progress') {
                $book_identifier = trim($input['book_identifier'] ?? '');
                $last_page = intval($input['last_page'] ?? 0);

                if ($book_identifier === '' || $last_page < 0) {
                    http_response_code(400);
                    echo json_encode(['erro' => 'Dados inválidos para salvar progresso.']);
                    exit;
                }

                // Verifica se já existe registro
                $stmtCheck = $conn->prepare("SELECT id FROM user_reading_progress WHERE user_id = :uid AND book_identifier = :bid LIMIT 1");
                $stmtCheck->execute(['uid' => $user_id, 'bid' => $book_identifier]);
                $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

                if ($existing) {
                    $stmtUpd = $conn->prepare("UPDATE user_reading_progress SET last_page = :lp WHERE id = :id");
                    $stmtUpd->execute(['lp' => $last_page, 'id' => $existing['id']]);
                } else {
                    $stmtIns = $conn->prepare("INSERT INTO user_reading_progress (user_id, book_identifier, last_page) VALUES (:uid, :bid, :lp)");
                    $stmtIns->execute(['uid' => $user_id, 'bid' => $book_identifier, 'lp' => $last_page]);
                }

                // Retorna o novo estado do registro
                $stmt3 = $conn->prepare("SELECT book_identifier, last_page FROM user_reading_progress WHERE user_id = :uid");
                $stmt3->execute(['uid' => $user_id]);
                $allProgress = $stmt3->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['ok' => true, 'progress' => $allProgress]);
                exit;
            }
        }

        // busca todos progressos do usuário (GET)
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

