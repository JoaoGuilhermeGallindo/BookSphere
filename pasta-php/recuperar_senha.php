<?php
// 1. Incluir a conexão PDO
require_once 'conexao.php';
// A variável $pdo já está disponível

// Receber os dados do formulário
$email = $_POST['email'] ?? '';
$novaSenha = $_POST['nova_senha'] ?? '';
$confirmar = $_POST['confirmar_senha'] ?? '';

// 2. Verifica se as senhas coincidem (validação de servidor)
if ($novaSenha !== $confirmar) {
    echo "senhas_diferentes";
    exit;
}

// 3. Lógica do banco de dados com PDO e try...catch
try {
    // 4. Verifica se o e-mail existe no banco
    $stmt_check = $pdo->prepare("SELECT email FROM users WHERE email = ?");
    $stmt_check->execute([$email]);
    $user = $stmt_check->fetch(PDO::FETCH_ASSOC);

    if (!$user) { // E-mail não encontrado
        echo "email_nao_encontrado";
        exit;
    }

    // 5. Se o e-mail existe, criptografa a nova senha
    $senhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);

    // 6. Prepara o UPDATE para atualizar a senha
    $stmt_update = $pdo->prepare("UPDATE users SET senha = ? WHERE email = ?");
    
    // 7. Executa a atualização
    $stmt_update->execute([$senhaHash, $email]);

    // Se a execução chegou aqui sem lançar erro, foi bem-sucedida.
    echo "sucesso";

} catch (PDOException $e) {
    // Captura qualquer erro de SQL
    echo "erro_sql: " . $e->getMessage();
}

// 8. Fechar (Não é necessário em PDO)
// O $pdo fecha a conexão automaticamente.
?>