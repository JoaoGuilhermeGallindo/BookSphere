<?php
session_start();
if (!isset($_SESSION['usuario'])) exit;

$usuario = $_SESSION['usuario'];

$serverName = "ACER-ASPIRE-DE-GALLINDO\\SQLSERVER2022";
$connectionInfo = ["Database" => "bancoUsers"];
$conn = sqlsrv_connect($serverName, $connectionInfo);

if ($conn === false) {
    echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco.']);
    exit;
}

$sql = "SELECT foto FROM users WHERE usuario = ?";
$stmt = sqlsrv_query($conn, $sql, array($usuario));
if ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    header("Content-Type: image/jpeg");
    echo $row['foto'];
}
?>
