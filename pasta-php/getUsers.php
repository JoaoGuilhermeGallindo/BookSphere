<?php
session_start();

if (
    isset($_SESSION['usuario']) &&
    isset($_SESSION['nome']) &&
    isset($_SESSION['imagem'])
) {
    echo json_encode([
        'usuario' => $_SESSION['usuario'],
        'nome' => $_SESSION['nome'],
        'imagem' => $_SESSION['imagem'] // envia o nome do arquivo da imagem
    ]);
} else {
    http_response_code(401); // dispara erro no JS (usuário não logado)
    echo json_encode(['erro' => 'Usuário não está logado.']);
}
