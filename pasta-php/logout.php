<?php
session_start();

// Destrói todas as variáveis de sessão
$_SESSION = [];

// Destroi a sessão
session_destroy();

// Retorna status de sucesso
http_response_code(200);
echo json_encode(['message' => 'Logout realizado com sucesso.']);
?>
