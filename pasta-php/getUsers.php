<?php
session_start();

if (isset($_SESSION['usuario']) && isset($_SESSION['nome'])) {
    echo json_encode([
        'usuario' => $_SESSION['usuario'],
        'nome' => $_SESSION['nome']
    ]);
} else {
    http_response_code(401); // <- Isso dispara o "resposta.ok === false" no JS
    echo json_encode(['erro' => 'Usuário não está logado.']);
}
