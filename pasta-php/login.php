<?php
// ===================================
// LÓGICA "LEMBRAR-ME" (A ORDEM CORRETA)
// ===================================

// 1. Define os parâmetros do cookie (ANTES de session_start)
if (isset($_POST['rememberMe'])) {
    
    // Se o JS enviou 'rememberMe', ele ENTRA AQUI
    
    // Vamos parar o script e enviar uma mensagem de teste
    die("DEBUG: O PHP viu o 'rememberMe: on'");
    
    // O código abaixo (90 dias) não será executado neste teste
    $tempo_de_vida = 90 * 24 * 60 * 60;
    session_set_cookie_params($tempo_de_vida);
    
} else {
    // Se o JS não enviou, ele entra aqui
    session_set_cookie_params(0);
}
// 2. INICIA A SESSÃO
session_start();

// ===================================
// ✅ DEBUG: O "LOGGER"
// ===================================
// Este bloco vai escrever TUDO que o JS enviar para um arquivo debug.log
try {
    // Converte o array $_POST em uma string legível
    $post_data = print_r($_POST, true);
    
    // Escreve os dados no arquivo (o "a" significa 'append' - adicionar ao final)
    $log_file = fopen("debug.log", "a");
    fwrite($log_file, "--- NOVA TENTATIVA ---\n");
    fwrite($log_file, $post_data . "\n");
    fclose($log_file);

} catch (Exception $e) {
    // Se falhar ao escrever o log, não quebre o login
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
    echo "erro_sql: " . $e->getMessage();
}
?>