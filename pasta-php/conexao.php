<?php
/*
 * ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
 * Local: pasta-php/conexao.php
 */

// 1. Credenciais do Banco
$servername = "srv791.hstgr.io";
$username   = "u831223978_root";
$password   = "BookSphere1";
$dbname     = "u831223978_bancousers";
$charset    = "utf8mb4"; // Boa prática definir o charset

// 2. String de Conexão (DSN) - CORRIGIDO
//    (Usando as variáveis definidas acima, e não $host ou $db)
$dsn = "mysql:host=$servername;dbname=$dbname;charset=$charset";

// 3. Opções do PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Mostra erros
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Retorna dados como array
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Usa preparações reais
];

// 4. Tentar a conexão
try {
     // CORRIGIDO: Usando $username e $password
     $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
     // Se falhar, mostra o erro
     // Em produção, você talvez queira logar isso em vez de mostrar
     die("erro_sql: " . $e->getMessage());
}
?>