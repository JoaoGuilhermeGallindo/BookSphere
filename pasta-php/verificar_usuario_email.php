<?php
require_once 'conexao.php'; 

header('Content-Type: application/json');

// Captura os dados da URL
$usuario = $_GET['usuario'] ?? '';
$email   = $_GET['email'] ?? '';

// --- VERIFICAÇÃO DE USUÁRIO ---
if (!empty($usuario)) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE usuario = ?");
    $stmt->execute([$usuario]);
    $existe = $stmt->fetchColumn();
    
    echo json_encode(['disponivel' => ($existe == 0)]);
    exit;
}

// --- VERIFICAÇÃO DE EMAIL ---
if (!empty($email)) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existe = $stmt->fetchColumn();
    
    echo json_encode(['disponivel' => ($existe == 0)]);
    exit;
}

// Se não enviou nada
echo json_encode(['status' => 'parametros_vazios']);
?>