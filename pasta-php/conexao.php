<?php
$host = '127.0.0.1'; // ou 'localhost' ou o host do seu DB Hostinger
$db   = 'u831223978_bancoosers'; // Seu banco de dados
$user = 'u831223978_bancoosers'; // Seu usuário
$pass = 'SUA_SENHA_DO_BANCO_DE_DADOS'; // <-- MUDE ISSO
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     //
     // ✅ CORREÇÃO AQUI: Trocado o "." (ponto) por "->" (seta)
     //
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>