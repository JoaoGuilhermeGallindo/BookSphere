<?php
// 1. Incluir o arquivo de conexão PDO
// Ele já cria a variável $pdo e trata o erro inicial de conexão.
require_once 'conexao.php'; // (Ajuste o caminho se necessário)

// 2. Remover a conexão antiga (mysqli)
// (Todo o bloco $servername, $username, $conn = new mysqli... foi removido)

// 3. Receber os dados do formulário 
$nome      = $_POST['nome'] ?? '';
$email     = $_POST['email'] ?? '';
// --- ALTERAÇÃO AQUI ---
$usuarioRaw = $_POST['usuario'] ?? '';
// Forçamos minúsculo e trocamos espaços por _ no PHP também
$usuario   = strtolower(str_replace(' ', '_', $usuarioRaw));
// ----------------------
$senha     = $_POST['senha'] ?? '';
$confirmar = $_POST['confirmar_senha'] ?? '';

// 4. Validações (sem alterações)
if (mb_strlen($nome, 'UTF-8') > 100) {
    echo "nome_muito_longo";
    exit;
}

if (mb_strlen($usuario, 'UTF-8') > 30) {
    echo "usuario_muito_longo";
    exit;
}

// --- NOVA VALIDAÇÃO: TAMANHO DA SENHA ---
if (strlen($senha) > 255) {
    echo "senha_muito_longa";
    exit;
}
// ---------------------------------------

// ... validações anteriores (nome, usuario, etc) ...

// Validação de Força da Senha
// Explicação da Regex:
// (?=.*[a-z]) -> Pelo menos 1 minúscula
// (?=.*[A-Z]) -> Pelo menos 1 maiúscula
// (?=.*\d)    -> Pelo menos 1 número
// (?=.*[\W_]) -> Pelo menos 1 símbolo (ex: @, #, !, etc)
// .{8,}       -> Pelo menos 8 caracteres no total
if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $senha)) {
    echo "senha_fraca";
    exit;
}

if ($senha !== $confirmar) {
    echo "senhas_diferentes";
    exit;
}

// 5. Criptografar senha (sem alterações)
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// 6. Upload da imagem (sem alterações)
$imagem_nome = null;

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
    $pasta = "uploads/";
    $extensao = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
    $imagem_nome = uniqid("user_", true) . "." . strtolower($extensao);
    $caminho_final = $pasta . $imagem_nome;

    if (!is_dir($pasta)) {
        mkdir($pasta, 0755, true);
    }

    if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $caminho_final)) {
        echo "erro_upload";
        exit;
    }
} else {
    // Se não houver imagem, o 'sucesso' nunca será alcançado
    // Considere se isso é obrigatório ou não.
    // Se for opcional, remova este bloco 'else' e deixe $imagem_nome ser null.
    // Se for obrigatório, esta lógica está correta.
    echo "nenhuma_imagem";
    exit;
}

// ============================================
// 7. Inserir no banco (Convertido para PDO)
// ============================================

// A sintaxe do PDO é um pouco diferente.
// Usamos '?' como placeholders.
$sql = "INSERT INTO users (nome, email, usuario, senha, imagem) VALUES (?, ?, ?, ?, ?)";

// Usamos try...catch para capturar erros de SQL
// (já que o conexao.php ativou PDO::ERRMODE_EXCEPTION)
try {
    // Prepara a consulta usando o $pdo (do conexao.php)
    $stmt = $pdo->prepare($sql);
    
    // Executa a consulta passando os valores em um array.
    // A ordem DEVE corresponder aos '?' na query.
    // Não é necessário $stmt->bind_param("sssss")
    $stmt->execute([$nome, $email, $usuario, $senhaHash, $imagem_nome]);

    echo "sucesso";

} catch (PDOException $e) {
    
    // BÔNUS: Detectar se o e-mail ou usuário já existe
    // O código 23000 é para violação de chave única (UNIQUE)
    if ($e->getCode() == 23000) {
        if (strpos($e->getMessage(), 'email') !== false) {
            echo "email_duplicado"; // Supondo que 'email' é UNIQUE
        } elseif (strpos($e->getMessage(), 'usuario') !== false) {
            echo "usuario_duplicado"; // Supondo que 'usuario' é UNIQUE
        } else {
            echo "erro_duplicado"; // Erro genérico de duplicidade
        }
    } else {
        // Outro erro de SQL
        echo "erro_sql: " . $e->getMessage();
    }
}

// 8. Fechar conexão (não é necessário em PDO)
// Em PDO, $stmt->close() e $conn->close() não são usados.
// A conexão fecha automaticamente quando o script termina.
?>