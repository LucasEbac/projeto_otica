const form = document.getElementById('form-otica');

function validaNome(nomeCompleto){
    const nomeComArray= nomeCompleto.split('');
    return nomeComArray.length >=2;
}

form.addEventListener('btn-depositar' , function(e){
    let formValido = false;
    e.preventDefaultv ();

    const nomeOrdemservice = document.getElementById('ordem-service');
    const nomeCliente = document.getElementById('nome-cliente');
    const telefoneCliente = document.getElementById('tel-cliente');
   const mensagemSucesso = 'ordem de serviço:' $(nomeOrdemservice.value) 'ordem de serviço para o cliente' $(nomeCliente.value);

   
    formValido= validaNome(nomeOrdemservice.value)
    if  (formValido) {
        alert(mensagemSucesso);
        
        nomeOrdemservice.valeu = '';
        nomeCliente.value = '';
        telefoneCliente.valeu = '';

    } else {
        alert("o nome não esta completo");
    }
})

console.log(form);