<?php
// Define o cookie da sessão para durar 30 dias
$tempo_de_vida = 30 * 24 * 60 * 60; // 30 dias em segundos
session_set_cookie_params($tempo_de_vida);
session_start();

// 1. CONEXÃO COM O BANCO (PDO)
require_once 'conexao.php'; // Usa seu novo conexao.php

$usuario = $_POST['usuario'] ?? '';
$senha = $_POST['senha'] ?? '';

if (mb_strlen($usuario, 'UTF-8') > 30) {
    // Se o usuário for muito longo, redireciona de volta com um erro
    header('Location: ../pasta-html/login.html?error=long_user');
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE usuario = ? LIMIT 1");
    $stmt->execute([$usuario]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // Usuário não encontrado, redireciona de volta com um erro
        header('Location: ../pasta-html/login.html?error=not_found');
        exit;
    }

    if (password_verify($senha, $user['senha'])) {
        // SUCESSO!
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['nome'] = $user['nome'];
        $_SESSION['imagem'] = $user['imagem'];
        $_SESSION['reader_theme'] = $user['reader_theme'] ?? 'modo-claro';

        // Redireciona para a página principal
        header('Location: ../pasta-html/home.html');
        exit;
        
    } else {
        // Senha incorreta, redireciona de volta com um erro
        header('Location: ../pasta-html/login.html?error=wrong_pass');
        exit;
    }

} catch (PDOException $e) {
    // Erro de SQL, redireciona de volta com um erro
    header('Location: ../pasta-html/login.html?error=db_error');
    exit;
}
?>