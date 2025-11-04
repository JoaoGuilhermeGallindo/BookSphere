<?php
session_start();
include 'conexao.php';
$erro = null;

// Proteção: Se não passou pelo e-mail E pelo código, volta ao login
if (!isset($_SESSION['email_para_resetar']) || !isset($_SESSION['codigo_verificado'])) {
    header("Location: ../login.php");
    exit;
}

$email = $_SESSION['email_para_resetar'];

// Lógica quando o formulário de nova senha é enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $senha = $_POST['senha'];
    $confirmar_senha = $_POST['confirmar_senha'];

    if ($senha !== $confirmar_senha) {
        $erro = "As senhas não coincidem.";
    } elseif (strlen($senha) < 6) { 
        $erro = "A senha deve ter pelo menos 6 caracteres.";
    } else {
        // TUDO CERTO!
        
        // 1. Criar o HASH da nova senha
        $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

        // 2. Atualizar a senha no banco de dados 'usuarios'
        $stmt = $pdo->prepare("UPDATE usuarios SET senha_hash = ? WHERE email = ?");
        $stmt->execute([$senha_hash, $email]);

        // 3. Limpar a sessão para finalizar o processo
        session_unset();
        session_destroy();

        // 4. Redirecionar para o Login
        header("Location: ../login.php?sucesso=senha_redefinida");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../pasta-css/ConfirmacaoSenha.css"> 
    <link rel="shortcut icon" href="../LOGOS/Favicon.png" type="image/x-icon">
    <title>BookSphere | Nova Senha</title>
</head>
<body>
    <div class="main-login">
        <div class="right-login">
            <form class="card-login" method="POST" action="redefinir-senha.php">
                <Img src="../LOGOS/Logo-fundo transparente-recortado.png">
                <h3>Crie sua Nova Senha</h3>
                
                <div class="textfield">
                    <label for="senha">Nova Senha</label>
                    <input type="password" name="senha" placeholder="Digite a nova senha" required>
                </div>
                
                <div class="textfield">
                    <label for="confirmar_senha">Confirmar Senha</label>
                    <input type="password" name="confirmar_senha" placeholder="Confirme a nova senha" required>
                </div>
                
                <?php if($erro): ?>
                    <div class="box-msg">
                        <p id="mensagem" style="color: #ffcccc; text-align: center;">
                            <?php echo $erro; ?>
                        </p>
                    </div>
                <?php endif; ?>

                <button type="submit" class="btn-Alterar">Salvar Nova Senha</button>
            </form>
        </div>
    </div>
</body>
</html>