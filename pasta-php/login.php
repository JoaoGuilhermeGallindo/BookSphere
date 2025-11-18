<?php
// ===================================
// LÓGICA "LEMBRAR-ME" (A ORDEM CORRETA E FINAL)
// ===================================

// 1. Define os parâmetros do cookie (ANTES de session_start)
if (isset($_POST['rememberMe'])) {
    // Se SIM (veio do FormData do JS), define 90 dias
    $tempo_de_vida = 90 * 24 * 60 * 60; // 90 dias
    session_set_cookie_params($tempo_de_vida);
    
} else {
    // Se NÃO, força o cookie a expirar quando o navegador fechar
    session_set_cookie_params(0);
}

// 2. INICIA A SESSÃO
session_start();
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