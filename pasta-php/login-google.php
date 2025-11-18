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

// 1. INCLUI SUA CONEXÃO PDO (a correta)
require_once 'conexao.php'; // Usa $pdo

// 2. Recebe o JSON enviado pelo JavaScript
$jsonEntrada = file_get_contents('php://input');
$dados = json_decode($jsonEntrada, true);
$token = $dados['token'] ?? '';

if (empty($token)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Token não fornecido.']);
    exit;
}

// 3. Valida o Token com o Servidor do Google
try {
    $urlValidacao = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $token;
    $respostaGoogle = @file_get_contents($urlValidacao);
    if ($respostaGoogle === false) {
        throw new Exception("Falha ao contatar o servidor do Google.");
    }
    
    $infoUsuario = json_decode($respostaGoogle, true);

    if (!$infoUsuario || isset($infoUsuario['error'])) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Token inválido ou expirado.']);
        exit;
    }

    // 4. Extrai os dados confiáveis do Google
    $emailGoogle = $infoUsuario['email'];
    $nomeGoogle = $infoUsuario['name'];
    $fotoGoogle = $infoUsuario['picture'] ?? '../IMAGENS/SemFoto.jpg'; // Pega a foto ou usa a padrão

    // 5. Verifica no Banco de Dados (tabela 'users')
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$emailGoogle]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
        // --- CENÁRIO 1: USUÁRIO JÁ CADASTRADO ---
        // Apenas loga o usuário e atualiza a foto (opcional)
        
        $stmt_update_pic = $pdo->prepare("UPDATE users SET imagem = ? WHERE user_id = ?");
        $stmt_update_pic->execute([$fotoGoogle, $usuario['user_id']]);

        // Cria a sessão (com as colunas corretas do seu banco)
        $_SESSION['usuario'] = $usuario['usuario'];
        $_SESSION['nome'] = $usuario['nome'];
        $_SESSION['imagem'] = $fotoGoogle; // Usa a foto mais recente
        $_SESSION['reader_theme'] = $usuario['reader_theme'] ?? 'modo-claro';
        
        echo json_encode(['sucesso' => true]);

    } else {
        // --- CENÁRIO 2: PRIMEIRO ACESSO (AUTO-CADASTRO) ---
        
        // Gera um nome de usuário único (ex: "gabriel492")
        $primeiroNome = explode(' ', trim($nomeGoogle))[0];
        $usuarioGerado = strtolower(preg_replace("/[^a-zA-Z0-9]/", "", $primeiroNome)) . rand(100, 999);
        
        // Define uma senha vazia (ou aleatória), pois o login será sempre via Google
        $senhaVaziaHash = password_hash(bin2hex(random_bytes(16)), PASSWORD_DEFAULT);

        // Insere no banco (usando as colunas do seu 'cadastrar.php')
        $sqlInsert = "INSERT INTO users (nome, email, usuario, senha, imagem) VALUES (?, ?, ?, ?, ?)";
        $stmtInsert = $pdo->prepare($sqlInsert);
        $stmtInsert->execute([$nomeGoogle, $emailGoogle, $usuarioGerado, $senhaVaziaHash, $fotoGoogle]);

        // Cria a sessão imediatamente
        $_SESSION['usuario'] = $usuarioGerado;
        $_SESSION['nome'] = $nomeGoogle;
        $_SESSION['imagem'] = $fotoGoogle;
        $_SESSION['reader_theme'] = 'modo-claro';

        echo json_encode(['sucesso' => true, 'novo_cadastro' => true]);
    }

} catch (PDOException $e) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro de Banco de Dados: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro Geral: ' . $e->getMessage()]);
}
?>