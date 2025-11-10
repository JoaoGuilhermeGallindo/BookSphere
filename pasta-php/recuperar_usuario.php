<?php
// 1. Incluir a conexão PDO
require_once 'conexao.php';
// A variável $pdo já está disponível

// Receber os dados do formulário
$email            = $_POST['email'] ?? '';
$novoUsuario      = $_POST['novo_usuario'] ?? '';
$confirmarUsuario = $_POST['confirmar_usuario'] ?? '';

// 2. Verifica se os nomes de usuário coincidem
if ($novoUsuario !== $confirmarUsuario) {
    echo "usuarios_diferentes";
    exit;
}

// 3. Lógica do banco de dados com PDO e try...catch
try {
    // 4. Verifica se o e-mail existe no banco
    $stmt_check_email = $pdo->prepare("SELECT email FROM users WHERE email = ?");
    $stmt_check_email->execute([$email]);
    $user_email = $stmt_check_email->fetch(PDO::FETCH_ASSOC);

    if (!$user_email) { // E-mail não encontrado
        echo "email_nao_encontrado";
        exit;
    }

    // 5. VERIFICAÇÃO EXTRA: Checa se o NOVO nome de usuário já está em uso
    $stmt_check_user = $pdo->prepare("SELECT usuario FROM users WHERE usuario = ?");
    $stmt_check_user->execute([$novoUsuario]);
    $existing_user = $stmt_check_user->fetch(PDO::FETCH_ASSOC);

    if ($existing_user) {
        // Novo nome de usuário já existe
        echo "usuario_ja_existe";
        exit;
    }

    // 6. Se tudo estiver OK, prepara o UPDATE para atualizar o usuário
    $stmt_update = $pdo->prepare("UPDATE users SET usuario = ? WHERE email = ?");
    
    // 7. Executa a atualização
    $stmt_update->execute([$novoUsuario, $email]);

    // Se chegou aqui, a atualização foi bem-sucedida
    echo "sucesso";

} catch (PDOException $e) {
    // Captura qualquer erro de SQL
    echo "erro_sql: " . $e->getMessage();
}

// 8. Fechar (Não é necessário em PDO)
// O $pdo fecha a conexão automaticamente.
?>