<?php
// progress_handler.php
session_start();

// 1. Verifique se o usuário está logado usando a variável de sessão do seu login
if (!isset($_SESSION['usuario'])) { 
    echo json_encode(['status' => 'error', 'message' => 'Usuário não logado']);
    exit;
}

// ================================================================
// 2. DETALHES DA CONEXÃO - (JÁ PREENCHIDOS COM SEUS DADOS)
// ================================================================
$servername = "srv791.hstgr.io"; 
$username   = "u831223978_root";
$password = "BookSphere1";
$dbname  = "u831223978_bancousers";
// ================================================================

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Falha na conexão: ' . $e->getMessage()]);
    exit;
}

// 3. ENCONTRAR O ID NUMÉRICO DO USUÁRIO
// O script de login salva o NOME do usuário na sessão.
// Precisamos do ID numérico para salvar na tabela 'user_reading_progress'.
try {
    $username_from_session = $_SESSION['usuario'];
    
    $stmt_user = $conn->prepare("SELECT id FROM users WHERE usuario = :username");
    $stmt_user->execute(['username' => $username_from_session]);
    $user = $stmt_user->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status' => 'error', 'message' => 'Usuário da sessão não encontrado no banco.']);
        exit;
    }
    
    // Este é o ID que usaremos (ex: 1, 2, 3...)
    $user_id = $user['id']; 

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao buscar ID do usuário: ' . $e->getMessage()]);
    exit;
}

// ===================================
// DAQUI PARA BAIXO, TUDO FUNCIONA COM O $user_id
// ===================================

$action = $_REQUEST['action'] ?? ''; // Pega a ação (save ou load)

// AÇÃO: SALVAR PROGRESSO (SAVE)
if ($action === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $book_id = $_POST['book_id'] ?? null;
    $page = $_POST['page'] ?? null;

    if (!$book_id || !$page) {
        echo json_encode(['status' => 'error', 'message' => 'Parâmetros ausentes']);
        exit;
    }

    $sql = "INSERT INTO user_reading_progress (user_id, book_identifier, last_page) 
            VALUES (:user_id, :book_id, :page)
            ON DUPLICATE KEY UPDATE last_page = :page";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        'user_id' => $user_id, // Usando o ID numérico que encontramos
        'book_id' => $book_id, 
        'page' => $page
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Progresso salvo']);
    exit;
}

// AÇÃO: CARREGAR PROGRESSO (LOAD)
if ($action === 'load' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $book_id = $_GET['book_id'] ?? null;

    if (!$book_id) {
        echo json_encode(['status' => 'error', 'message' => 'Identificador do livro ausente']);
        exit;
    }

    $sql = "SELECT last_page FROM user_reading_progress 
            WHERE user_id = :user_id AND book_identifier = :book_id";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute(['user_id' => $user_id, 'book_id' => $book_id]); // Usando o ID numérico
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['status' => 'success', 'page' => $result['last_page']]);
    } else {
        echo json_encode(['status' => 'not_found', 'page' => 1]);
    }
    exit;
}

// Se nenhuma ação válida for fornecida
echo json_encode(['status' => 'error', 'message' => 'Ação inválida']);
?>