<?php
// Apenas inicia a sessão para poder destruí-la
session_start();

// Destrói todas as variáveis de sessão
$_SESSION = [];

// ✅ Limpa o cookie do navegador
// (Define-o para expirar no passado)
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroi a sessão no servidor
session_destroy();

// Retorna status de sucesso
header('Content-Type: application/json');
http_response_code(200);
echo json_encode(['message' => 'Logout realizado com sucesso.']);
?>