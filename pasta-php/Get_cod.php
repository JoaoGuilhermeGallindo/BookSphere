<?php
// LÓGICA PHP VEM ANTES DO HTML
session_start();
include 'conexao.php'; // Inclui a conexão
$erro = null; // Variável para guardar a mensagem de erro

// Proteção: Se o usuário não passou pelo passo anterior, volta ao login
if (!isset($_SESSION['email_para_resetar'])) {
    header("Location: ../login.php"); // Caminho para "subir" um nível
    exit;
}

$email = $_SESSION['email_para_resetar'];

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $codigo_usuario = $_POST['codigo']; // Corrigido de 'senha' para 'codigo'

    // Busca o código MAIS RECENTE, não usado, e válido
    $stmt = $pdo->prepare("SELECT * FROM recuperacao_senha 
                           WHERE email = ? AND usado = 0 
                           ORDER BY id DESC LIMIT 1");
    $stmt->execute([$email]);
    $registro = $stmt->fetch();

    if ($registro) {
        $agora = date('Y-m-d H:i:s');
        
        // VERIFICAÇÕES DE SEGURANÇA:
        if ($registro['codigo'] == $codigo_usuario && $registro['expira_em'] > $agora && $registro['tentativas'] < 5) {
            
            // SUCESSO!
            // 1. Marca o código como usado no banco
            $stmt_update = $pdo->prepare("UPDATE recuperacao_senha SET usado = 1 WHERE id = ?");
            $stmt_update->execute([$registro['id']]);

            // 2. Salva na sessão que ele foi verificado
            $_SESSION['codigo_verificado'] = true;
            
            // 3. Redireciona para a página de criar nova senha
            header("Location: redefinir-senha.php"); // Próximo passo
            exit;

        } else {
            // FALHA!
            // Incrementa o número de tentativas
            $stmt_tentativa = $pdo->prepare("UPDATE recuperacao_senha SET tentativas = tentativas + 1 WHERE id = ?");
            $stmt_tentativa->execute([$registro['id']]);

            // Define a mensagem de erro que você pediu
            $erro = "Código incorreto ou expirado.";
        }
    } else {
        $erro = "Solicitação de recuperação inválida.";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../LOGOS/Favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="../pasta-css/ConfirmacaoSenha.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>BookSphere | Recuperação</title>
</head>

<body>

    <button id="btn-modo-leitura"></button>

    <div class="main-login">

        <div class="right-login">
            <form id="formLogin" class="card-login" action="Get_cod.php" method="POST">

                <Img src="../LOGOS/Logo-fundo transparente-recortado.png">

                <div class="textfield">
                    <label for="Codigo">Digite o Codigo de confirmação:</label>
                    <input type="text" id="codigo" name="codigo" placeholder="codigo" required maxlength="4">
                </div>
                <a href=""></a>
                <button type="submit" class="btn-Alterar">Verificar</button>
                <div class="box-msg">
                    <?php
                        if ($erro) {
                            // Usamos seu <p> original para mostrar o erro
                            echo '<p id="mensagem" style="color: #ffcccc; text-align: center;">' . $erro . '</p>';
                        }
                    ?>
                </div>

            </form>
        </div>
    </div>
</body>
</html>