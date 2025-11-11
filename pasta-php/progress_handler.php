<?php

// Define que a resposta será em formato JSON
header('Content-Type: application/json');

// Define o cookie da sessão para durar 30 dias
$tempo_de_vida = 30 * 24 * 60 * 60; // 30 dias em segundos
session_set_cookie_params($tempo_de_vida);

// progress_handler.php
session_start();

// 1. Verifique se o usuário está logado
if (!isset($_SESSION['usuario'])) { 
    echo json_encode(['status' => 'error', 'message' => 'Usuário não logado']);
    exit;
}

// ================================================================
// 2. CONEXÃO COM O BANCO (MODIFICADO)
// ================================================================
// Removemos as credenciais e a conexão manual daqui
// e chamamos seu arquivo de conexão centralizado.
require_once 'conexao.php';
// Agora temos a variável $pdo disponível
// ================================================================


// ===================================
// 3. LÓGICA PRINCIPAL COM TRATAMENTO DE ERRO
// Envolvemos toda a lógica em um try...catch,
// já que $pdo está configurado para lançar exceções.
// ===================================
try {
    // 3. ENCONTRAR O ID NUMÉRICO DO USUÁRIO
    // (Lógica mantida, apenas trocamos $conn por $pdo)
    $username_from_session = $_SESSION['usuario'];
    
    // Usando $pdo (do conexao.php)
    $stmt_user = $pdo->prepare("SELECT user_id FROM users WHERE usuario = :username");
    $stmt_user->execute(['username' => $username_from_session]);
    $user = $stmt_user->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status' => 'error', 'message' => 'Usuário da sessão não encontrado no banco.']);
        exit;
    }
    
    $user_id = $user['user_id']; 

    // ===================================
    // DAQUI PARA BAIXO, TUDO FUNCIONA COM O $user_id
    // ===================================

    $action = $_REQUEST['action'] ?? ''; // Pega a ação (save ou load)

    // AÇÃO: SALVAR PROGRESSO (SAVE)
    if ($action === 'save' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $book_id = $_POST['book_id'] ?? null;
        $page = $_POST['page'] ?? null;
        $total_pages = $_POST['total_pages'] ?? 0;
        $book_title = $_POST['book_title'] ?? 'Título Desconhecido';
        $book_cover = $_POST['book_cover'] ?? '../IMAGENS/SemFoto.jpg';
        $book_genre = $_POST['book_genre'] ?? 'default';

        if (!$book_id || !$page) {
            echo json_encode(['status' => 'error', 'message' => 'Parâmetros ausentes']);
            exit;
        }
// ===================================
        // ✅ CORREÇÃO SQLSTATE[HY093]
        // ===================================
        // Damos nomes únicos aos parâmetros do ON DUPLICATE KEY UPDATE
        $sql = "INSERT INTO user_reading_progress 
                    (user_id, book_identifier, last_page, total_pages, book_title, book_cover, book_genre) 
                VALUES 
                    (:user_id, :book_id, :page, :total_pages, :book_title, :book_cover, :book_genre)
                ON DUPLICATE KEY UPDATE 
                    last_page = :page_upd, 
                    total_pages = :total_pages_upd, 
                    book_title = :book_title_upd, 
                    book_cover = :book_cover_upd,
                    book_genre = :book_genre_upd,
                    last_updated = CURRENT_TIMESTAMP";
        
        $stmt = $pdo->prepare($sql);

        // Agora passamos 12 valores em vez de 7
        $stmt->execute([
            'user_id' => $user_id,
            'book_id' => $book_id, 
            'page' => $page,
            'total_pages' => $total_pages,
            'book_title' => $book_title,
            'book_cover' => $book_cover,
            'book_genre' => $book_genre,
            // Adiciona os valores duplicados para a parte UPDATE
            'page_upd' => $page,
            'total_pages_upd' => $total_pages,
            'book_title_upd' => $book_title,
            'book_cover_upd' => $book_cover,
            'book_genre_upd' => $book_genre
        ]);

        echo json_encode(['status' => 'success', 'message' => 'Progresso salvo']);
        exit;
    }

    // AÇÃO: CARREGAR PROGRESSO (LOAD)
    if ($action === 'load' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $book_id = $_GET['book_id'] ?? null;

        if (!$book_id) {
            echo json_encode(['status' => 'error', 'message' => 'Identificador do livro ausente']);
            exit;
        }

        $sql = "SELECT last_page FROM user_reading_progress 
                WHERE user_id = :user_id AND book_identifier = :book_id";
        
        $stmt = $pdo->prepare($sql); // Usando $pdo
        $stmt->execute(['user_id' => $user_id, 'book_id' => $book_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['status' => 'success', 'page' => $result['last_page']]);
        } else {
            echo json_encode(['status' => 'not_found', 'page' => 1]);
        }
        exit;
    }

    // ===================================
    // AÇÃO: CARREGAR ANOTAÇÕES (LOAD_NOTES)
    // ===================================
    if ($action === 'load_notes' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $book_id = $_GET['book_id'] ?? null;

        if (!$book_id) {
            echo json_encode(['status' => 'error', 'message' => 'Identificador do livro ausente']);
            exit;
        }

        $sql = "SELECT id, note_text, created_at FROM user_annotations 
                WHERE user_id = :user_id AND book_identifier = :book_id 
                ORDER BY created_at DESC";
                
        $stmt = $pdo->prepare($sql); // Usando $pdo
        $stmt->execute(['user_id' => $user_id, 'book_id' => $book_id]);
        $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'data' => $notes]);
        exit;
    }

    // ===================================
    // AÇÃO: SALVAR ANOTAÇÃO (SAVE_NOTE)
    // ===================================
    if ($action === 'save_note' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $book_id = $_POST['book_id'] ?? null;
        $note_text = $_POST['note_text'] ?? null;

        if (!$book_id || !$note_text) {
            echo json_encode(['status' => 'error', 'message' => 'Dados da anotação ausentes']);
            exit;
        }

        $sql = "INSERT INTO user_annotations (user_id, book_identifier, note_text) 
                VALUES (:user_id, :book_id, :note_text)";
        
        $stmt = $pdo->prepare($sql); // Usando $pdo
        $stmt->execute([
            'user_id' => $user_id,
            'book_id' => $book_id,
            'note_text' => $note_text
        ]);

        // Retorna o ID da anotação que acabamos de criar
        echo json_encode(['status' => 'success', 'new_note_id' => $pdo->lastInsertId()]); // Usando $pdo
        exit;
    }

    // ===================================
    // AÇÃO: EDITAR ANOTAÇÃO (EDIT_NOTE)
    // ===================================
    if ($action === 'edit_note' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $note_id = $_POST['note_id'] ?? null;
        $note_text = $_POST['note_text'] ?? null;

        if (!$note_id || !$note_text) {
            echo json_encode(['status' => 'error', 'message' => 'Dados da anotação ausentes']);
            exit;
        }

        $sql = "UPDATE user_annotations SET note_text = :note_text 
                WHERE id = :note_id AND user_id = :user_id";
        
        $stmt = $pdo->prepare($sql); // Usando $pdo
        $stmt->execute([
            'note_text' => $note_text,
            'note_id' => $note_id,
            'user_id' => $user_id
        ]);

        echo json_encode(['status' => 'success']);
        exit;
    }

    // ===================================
    // AÇÃO: EXCLUIR ANOTAÇÃO (DELETE_NOTE)
    // ===================================
    if ($action === 'delete_note' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $note_id = $_POST['note_id'] ?? null;

        if (!$note_id) {
            echo json_encode(['status' => 'error', 'message' => 'ID da anotação ausente']);
            exit;
        }

        $sql = "DELETE FROM user_annotations WHERE id = :note_id AND user_id = :user_id";
        
        $stmt = $pdo->prepare($sql); // Usando $pdo
        $stmt->execute(['note_id' => $note_id, 'user_id' => $user_id]);

        echo json_encode(['status' => 'success']);
        exit;
    }
    // ===================================
    // AÇÃO: SALVAR TEMA DO LEITOR (SAVE_READER_THEME)
    // ===================================
    if ($action === 'save_reader_theme' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $theme = $_POST['theme'] ?? 'modo-claro';

        if (!in_array($theme, ['modo-claro', 'modo-noturno', 'modo-sepia'])) {
            $theme = 'modo-claro';
        }

        $sql = "UPDATE users SET reader_theme = :theme WHERE user_id = :user_id";
        $stmt = $pdo->prepare($sql); // Usando $pdo
        $stmt->execute(['theme' => $theme, 'user_id' => $user_id]);

        $_SESSION['reader_theme'] = $theme;

        echo json_encode(['status' => 'success', 'message' => 'Tema do leitor salvo']);
        exit;
    }

    // Se nenhuma ação válida for fornecida
    echo json_encode(['status' => 'error', 'message' => 'Ação inválida']);

} catch (PDOException $e) {
    // Captura QUALQUER erro de banco de dados de qualquer ação acima
    echo json_encode(['status' => 'error', 'message' => 'Erro de banco de dados: ' . $e->getMessage()]);
    exit;
}
?>