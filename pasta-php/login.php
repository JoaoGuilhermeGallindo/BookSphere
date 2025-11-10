<?php

// Define o cookie da sessão para durar 30 dias
$tempo_de_vida = 30 * 24 * 60 * 60; // 30 dias em segundos
session_set_cookie_params($tempo_de_vida);

session_start(); // Inicia a sessão

// ================================================================
// 1. CONEXÃO COM O BANCO (MODIFICADO)
// ================================================================
// Removemos as credenciais e a conexão manual (mysqli)
// e chamamos seu arquivo de conexão centralizado (PDO).
require_once 'conexao.php';
// Agora temos a variável $pdo disponível
// ================================================================

// Receber dados do JS
$usuario = $_POST['usuario'] ?? '';
$senha   = $_POST['senha'] ?? '';

// --- VALIDAÇÃO DE LIMITE NO SERVIDOR ---
if (mb_strlen($usuario, 'UTF-8') > 30) {
    echo "Usuário muito longo";
    exit;
}
// --- FIM DA VALIDAÇÃO ---

// ================================================================
// 2. CONSULTA (Convertida de MySQLi para PDO)
// ================================================================
try {
    // Preparar a consulta usando $pdo
    $stmt = $pdo->prepare("SELECT * FROM users WHERE usuario = ? LIMIT 1");
    
    // Executar a consulta passando o usuário em um array
    $stmt->execute([$usuario]);
    
    // Buscar o usuário
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 3. VERIFICAÇÃO
    if (!$user) {
        // Usuário não foi encontrado
        echo "Usuário não encontrado";
        exit;
    }

    // Verificar senha
    if (password_verify($senha, $user['senha'])) {
        // Salva dados do usuário na sessão
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['nome']    = $user['nome'];
        $_SESSION['imagem']  = $user['imagem'];
        
        // Salva o tema do leitor na sessão
        // (Usa 'modo-claro' como padrão se estiver nulo no banco)
        $_SESSION['reader_theme'] = $user['reader_theme'] ?? 'modo-claro';

        echo "sucesso";
    } else {
        echo "Senha incorreta";
    }

} catch (PDOException $e) {
    // Captura qualquer erro de banco de dados
    echo "erro_sql: " . $e->getMessage();
}

// 4. FECHAR CONEXÃO
// Não é necessário $stmt->close() ou $conn->close() em PDO.
?>