<?php
class ClasseFormulario {
    public function processarFormulario($nome, $email) {
        // Aqui você pode fazer o que quiser com os dados do formulário
        // Por exemplo, você pode enviá-los para um banco de dados, enviar por e-mail, etc.
        // Neste exemplo, apenas exibimos uma mensagem de sucesso
        return "Formulário enviado com sucesso! Nome: $nome, E-mail: $email";
    }
}
?>