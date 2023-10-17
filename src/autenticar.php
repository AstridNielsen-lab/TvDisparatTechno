<?php
// Verifique se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Verifique se o usuário e a senha correspondem
    if ($username === "admin" && $password === "784512") {
        // Redirecione para a área de administração ou exiba uma mensagem de sucesso
        header("Location: area-admin.php");
        exit;
    } else {
        // Exiba uma mensagem de erro caso a autenticação falhe
        echo "Usuário ou senha incorretos. Tente novamente.";
    }
}
?>
