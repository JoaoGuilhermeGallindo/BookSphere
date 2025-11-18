<?php
// ===================================
// LÓGICA "LEMBRAR-ME" (PARA O GOOGLE)
// ===================================

// 1. Tenta definir os 90 dias (pode falhar)
$tempo_de_vida = 90 * 24 * 60 * 60; // 90 dias
session_set_cookie_params($tempo_de_vida);

// 2. Inicia a sessão
session_start();

// 3. ✅ FORÇAR O COOKIE (A SOLUÇÃO)
// Google login é SEMPRE "Lembrar-me", então
// re-defina o cookie manualmente para 90 dias.
setcookie(session_name(), session_id(), time() + $tempo_de_vida, "/");
// ===================================

header('Content-Type: application/json');

// 4. Conexão
require_once 'conexao.php'; // $pdo
// ... (O resto do seu código Google continua igual) ...
?>