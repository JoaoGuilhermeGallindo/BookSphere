<?php

// Define que a resposta será em formato JSON
header('Content-Type: application/json');

// Define o cookie da sessão para durar 30 dias
$tempo_de_vida = 30 * 24 * 60 * 60; // 30 dias em segundos
session_set_cookie_params($tempo_de_vida);

// Inicia a sessão
session_start();

// 1. Verifique se o usuário está logado
if (!isset($_SESSION['usuario'])) { 
    echo json_encode(['status' => 'error', 'message' => 'Usuário não logado']);
    exit;
}

// ================================================================
// 2. CONEXÃO COM O BANCO (MODIFICADO)
// ================================================================
// Removemos as credenciais e a conexão manual daqui
// e chamamos seu arquivo de conexão centralizado.
require_once 'conexao.php';
// Agora temos a variável $pdo disponível
// ================================================================


// 3. ENCONTRAR O ID NUMÉRICO DO USUÁRIO
// (Lógica mantida, apenas trocamos $conn por $pdo)
try {
    $username_from_session = $_SESSION['usuario'];
    
    // Lembre-se, sua coluna é 'user_id' na tabela 'users'
    // Usando $pdo (do conexao.php) em vez de $conn
    $stmt_user = $pdo->prepare("SELECT user_id FROM users WHERE usuario = :username"); 
    $stmt_user->execute(['username' => $username_from_session]);
    $user = $stmt_user->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status' => 'error', 'message' => 'Usuário da sessão não encontrado no banco.']);
        exit;
    }
    
    $user_id = $user['user_id']; 

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao buscar ID do usuário: ' . $e->getMessage()]);
    exit;
}

// 4. BUSCAR TODOS OS REGISTROS DE PROGRESSO DO USUÁRIO
// (Lógica mantida, apenas trocamos $conn por $pdo)
try {
    // Usando $pdo (do conexao.php) em vez de $conn
    $stmt_progress = $pdo->prepare("SELECT * FROM user_reading_progress WHERE user_id = :user_id ORDER BY last_updated DESC");
    $stmt_progress->execute(['user_id' => $user_id]);
    $progress_data = $stmt_progress->fetchAll(PDO::FETCH_ASSOC);

    // Envia os dados como JSON
    echo json_encode(['status' => 'success', 'data' => $progress_data]);
    exit;

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao buscar progresso: ' . $e->getMessage()]);
    exit;
}
?>