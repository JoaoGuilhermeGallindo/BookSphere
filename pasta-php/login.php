<?php
// ===================================
// ✅ CORREÇÃO "LEMBRAR-ME"
// ===================================

// 1. Verifique se "Lembrar-me" foi marcado
if (isset($_POST['rememberMe'])) {
    // Se SIM, define o cookie da sessão para durar 90 dias
    $tempo_de_vida = 90 * 24 * 60 * 60; // 90 dias
    session_set_cookie_params($tempo_de_vida);
} else {
    // Se NÃO, força o cookie a expirar quando o navegador fechar (lifetime = 0)
    session_set_cookie_params(0);
}

// 2. INICIA A SESSÃO (Sempre DEPOIS de session_set_cookie_params)
session_start();
// ===================================

// 3. CONEXÃO COM O BANCO (PDO)
require_once 'conexao.php';

// Receber dados do JS
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

// --- VALIDAÇÃO DE E-mail ---
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail inválido";
    exit;
}

// 4. CONSULTA
try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "E-mail não encontrado";
        exit;
    }

    // 5. VERIFICAÇÃO DE SENHA
    if (password_verify($senha, $user['senha'])) {
        // Salva dados do usuário na sessão
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['nome'] = $user['nome'];
        $_SESSION['imagem'] = $user['imagem'];
        $_SESSION['reader_theme'] = $user['reader_theme'] ?? 'modo-claro';

        echo "sucesso";
    } else {
        echo "Senha incorreta";
    }

} catch (PDOException $e) {
    echo "erro_sql: " . $e->getMessage();
}
?>