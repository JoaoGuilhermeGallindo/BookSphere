<?php
session_start();
include 'conexao.php'; // Inclui a conexão

// --- CONFIGURAÇÃO DO PHPMailer ---
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// MUDE ISSO: Ajuste os caminhos para onde você colocou a pasta PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// ---------------------------------

if (!isset($_GET['usuario'])) {
    header("Location: ../login.php"); // Volta para o login
    exit;
}

$usuario_nome = $_GET['usuario'];

// 1. Buscar o e-mail do usuário
$stmt = $pdo->prepare("SELECT email FROM usuarios WHERE usuario = ?");
$stmt->execute([$usuario_nome]);
$usuario_db = $stmt->fetch();

if ($usuario_db) {
    $email = $usuario_db['email'];

    // 2. Gerar código aleatório e expiração
    $codigo_aleatorio = rand(1000, 9999);
    $expira = date('Y-m-d H:i:s', strtotime('+10 minutes'));

    // 3. Salvar na sua tabela 'recuperacao_senha'
    $stmt_insert = $pdo->prepare("INSERT INTO recuperacao_senha (email, codigo, expira_em) VALUES (?, ?, ?)");
    $stmt_insert->execute([$email, $codigo_aleatorio, $expira]);

    // 4. Enviar o e-mail com PHPMailer
    $mail = new PHPMailer(true);
    try {
        // MUDE ISSO: Configurações do Servidor (Use seu e-mail Hostinger ou Gmail)
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com'; // SMTP da Hostinger
        $mail->SMTPAuth   = true;
        $mail->Username   = 'seu-email@seudominio.com'; // Seu e-mail
        $mail->Password   = 'sua-senha-de-email';     // Senha do e-mail
        
        //
        // ✅ CORREÇÃO AQUI: Trocado o "." (ponto) por "->" (seta)
        //
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        //
        // ✅ CORREÇÃO AQUI: Trocado o "." (ponto) por "->" (seta)
        //
        $mail->Port       = 465;

        // Quem envia e quem recebe
        $mail->setFrom('nao-responda@seudominio.com', 'Book Sphere');
        $mail->addAddress($email); // E-mail do usuário

        // Conteúdo
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Book Sphere - Seu código de recuperação';
        $mail->Body    = "Olá! <br><br>Seu código para redefinição de senha é: <h1>$codigo_aleatorio</h1><br>Este código expira em 10 minutos.";
        $mail->AltBody = "Seu código de recuperação é: $codigo_aleatorio";

        $mail->send();
        
        // 5. Salvar e-mail na sessão e redirecionar para o SEU arquivo
        $_SESSION['email_para_resetar'] = $email;
        header("Location: Get_cod.php"); // Redireciona para sua tela
        exit;

    } catch (Exception $e) {
        // Se der erro, volta ao login com uma mensagem
        // Importante: Adicionamos o erro do PHPMailer para debug
        header("Location: ../login.php?erro=email_falhou");
        exit;
    }

} else {
    // Usuário não encontrado
    header("Location: ../login.php?erro=usuario_nao_encontrado");
    exit;
}
?>