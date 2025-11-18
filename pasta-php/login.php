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

// 3. CONEXÃO COM O BANCO
require_once 'conexao.php'; // $pdo

// 4. RECEBER DADOS
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

// --- VALIDAÇÃO DE E-mail ---
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail inválido";
    exit;
}

// 5. CONSULTA AO BANCO
try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "E-mail não encontrado";
        exit;
    }

    // 6. VERIFICAÇÃO DE SENHA
    if (password_verify($senha, $user['senha'])) {
        // Salva dados do usuário na sessão
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['nome'] = $user['nome'];
        $_SESSION['imagem'] = $user['imagem'];
        $_SESSION['reader_theme'] = $user['reader_theme'] ?? 'modo-claro';

        echo "sucesso"; // Resposta para o login.js
    } else {
        echo "Senha incorreta";
    }

} catch (PDOException $e) {
    echo "erro_sql: ". $e->getMessage();
}
?>