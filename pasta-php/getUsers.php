<?php

// Define o cookie da sessão para durar 30 dias
$tempo_de_vida = 30 * 24 * 60 * 60; // 30 dias em segundos
session_set_cookie_params($tempo_de_vida);

session_start();

// Define o tipo de conteúdo para TODAS as respostas
header('Content-Type: application/json; charset=utf-8');

// Verifica sessão básica
if (!isset($_SESSION['usuario']) || !isset($_SESSION['nome'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não está logado.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$response = [
    'usuario' => $_SESSION['usuario'],
    'nome' => $_SESSION['nome'],
    'imagem' => $_SESSION['imagem'] ?? ''
];

// ================================================================
// 1. CONEXÃO COM O BANCO (MODIFICADO)
// ================================================================
// Removemos as credenciais e a conexão manual daqui
// e chamamos seu arquivo de conexão centralizado.
require_once 'conexao.php';
// Agora temos a variável $pdo disponível
// ================================================================


// Tenta conectar ao banco e buscar progressos do usuário (se possível)
// Se ocorrer qualquer erro, retornamos apenas os dados de sessão
try {
    // 2. SUBSTITUÍDO $conn por $pdo
    // busca id numérico do usuário
    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE usuario = :usuario LIMIT 1"); // <-- Atenção: Mudei 'id' para 'user_id' para ser consistente com seus outros scripts
    $stmt->execute(['usuario' => $_SESSION['usuario']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $user_id = $user['user_id']; // <-- Atenção: Mudei 'id' para 'user_id'

        // Se for POST e ação de salvar progresso, processa a requisição
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $raw = file_get_contents('php://input');
            $input = json_decode($raw, true);
            if (!is_array($input)) {
                http_response_code(400);
                echo json_encode(['erro' => 'JSON inválido.'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            if (isset($input['action']) && $input['action'] === 'save_progress') {
                $book_identifier = trim(substr($input['book_identifier'] ?? '', 0, 255)); // limitar tamanho
                $last_page = intval($input['last_page'] ?? 0);
                // se informado, limita last_page ao total de páginas informado pelo cliente
                $total_pages = isset($input['total_pages']) ? intval($input['total_pages']) : 0;
                if ($total_pages > 0 && $last_page > $total_pages) $last_page = $total_pages;

                if ($book_identifier === '' || $last_page < 0) {
                    http_response_code(400);
                    echo json_encode(['erro' => 'Dados inválidos para salvar progresso.'], JSON_UNESCAPED_UNICODE);
                    exit;
                }

                // 2. SUBSTITUÍDO $conn por $pdo
                // Verifica se já existe registro
                $stmtCheck = $pdo->prepare("SELECT id FROM user_reading_progress WHERE user_id = :uid AND book_identifier = :bid LIMIT 1");
                $stmtCheck->execute(['uid' => $user_id, 'bid' => $book_identifier]);
                $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

                if ($existing) {
                    // 2. SUBSTITUÍDO $conn por $pdo
                    $stmtUpd = $pdo->prepare("UPDATE user_reading_progress SET last_page = :lp, last_updated = CURRENT_TIMESTAMP WHERE id = :id"); // <-- BÔNUS: Atualizei o last_updated
                    $stmtUpd->execute(['lp' => $last_page, 'id' => $existing['id']]);
                } else {
                    // 2. SUBSTITUÍDO $conn por $pdo
                    $stmtIns = $pdo->prepare("INSERT INTO user_reading_progress (user_id, book_identifier, last_page) VALUES (:uid, :bid, :lp)");
                    $stmtIns->execute(['uid' => $user_id, 'bid' => $book_identifier, 'lp' => $last_page]);
                }

                // 2. SUBSTITUÍDO $conn por $pdo
                // Retorna o novo estado do registro
                $stmt3 = $pdo->prepare("SELECT book_identifier, last_page FROM user_reading_progress WHERE user_id = :uid");
                $stmt3->execute(['uid' => $user_id]);
                $allProgress = $stmt3->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['ok' => true, 'progress' => $allProgress], JSON_UNESCAPED_UNICODE);
                exit;
            }
            // se chegou aqui, ação inválida
            http_response_code(400);
            echo json_encode(['erro' => 'Ação inválida.'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // 2. SUBSTITUÍDO $conn por $pdo
        // busca todos progressos do usuário (GET)
        $stmt2 = $pdo->prepare("SELECT book_identifier, last_page, last_updated FROM user_reading_progress WHERE user_id = :uid"); // <-- BÔNUS: Buscando last_updated
        $stmt2->execute(['uid' => $user_id]);
        $progress = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        $response['progress'] = $progress ?: [];
    } else {
        $response['progress'] = [];
    }

} catch (Exception $e) {
    // Falha ao conectar ou consultar: apenas retorna dados mínimos
    // Em caso de erro, é bom logar a falha
    error_log("Erro em getUsers.php: " . $e->getMessage());
    $response['progress'] = [];
    // Você pode opcionalmente informar o erro
    // $response['erro_db'] = 'Falha ao processar dados do banco.';
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>