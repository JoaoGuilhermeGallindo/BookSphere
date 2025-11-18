<?php
// ===================================
// LÓGICA "LEMBRAR-ME" (A ORDEM CORRETA E FINAL)
// ===================================

// 1. Tenta definir os parâmetros (pode falhar se o Hostinger auto-iniciar)
if (isset($_POST['rememberMe'])) {
    $tempo_de_vida = 90 * 24 * 60 * 60; // 90 dias
    session_set_cookie_params($tempo_de_vida);
} else {
    session_set_cookie_params(0); // Session
}

// 2. INICIA A SESSÃO
session_start();

// 3. ✅ FORÇAR O COOKIE (A SOLUÇÃO)
// Se 'rememberMe' foi enviado, re-defina o cookie manualmente
// para garantir os 90 dias, sobrescrevendo a configuração do servidor.
if (isset($_POST['rememberMe'])) {
    $tempo_de_vida = 90 * 24 * 60 * 60;
    // (session_name() = 'PHPSESSID', session_id() = o ID da sessão)
    setcookie(session_name(), session_id(), time() + $tempo_de_vida, "/");
}
// ===================================

// 4. CONEXÃO COM O BANCO
require_once 'conexao.php'; // $pdo

// 5. RECEBER DADOS
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

// ... (O resto do seu código de login está 100% correto e continua igual) ...
// (Validação de e-mail, consulta ao banco, verificação de senha, etc.)
?>