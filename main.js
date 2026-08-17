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
        
        nomeOrdemservice.value = '';
        nomeCliente.value = '';
        telefoneCliente.value = '';

    } else {
        alert("o nome não esta completo");
    }
})

console.log(form);

//
<body>

    <h2>📍 Buscador de Endereço</h2>
    
    <!-- OPÇÃO 1: BUSCA RÁPIDA POR CEP -->
    <div class="bloco-busca">
        <h3>Busca por CEP</h3>
        <form id="formCep" onsubmit="return false;">
            <div class="campo">
                <label>Digite o CEP:</label>
                <!-- Filtra para aceitar apenas números e o traço do CEP -->
                <input type="text" id="cepInput" placeholder="Ex: 01311-200" maxlength="9" oninput="validarCepFormat(this)" required>
            </div>
            <button type="submit" id="btnBuscarCep" class="btn-principal">Buscar por CEP</button>
        </form>
    </div>

    <div class="divisor">OU</div>

    <!-- OPÇÃO 2: BUSCA POR TEXTO (UF, CIDADE, RUA) -->
    <div class="bloco-busca">
        <h3>Busca por Nome/Texto</h3>
        <form id="formTexto" onsubmit="return false;">
            <div class="campo">
                <label>UF:</label>
                <input type="text" id="uf" placeholder="Ex: SP" maxlength="2" oninput="validarUF(this)" required>
            </div>
            <div class="campo">
                <label>Cidade:</label>
                <input type="text" id="cidade" placeholder="Ex: Sao Paulo" required>
            </div>
            <div class="campo">
                <label>Logradouro:</label>
                <input type="text" id="logradouro" placeholder="Ex: Avenida Paulista" required>
            </div>
            <button type="submit" id="btnBuscarTexto" class="btn-principal">Buscar por Nome</button>
        </form>
    </div>

    <button type="button" id="btnLimpar" onclick="limparCampos()">Limpar Tudo</button>

    <h3>Resultados encontrados:</h3>
    <ul id="listaResultados"></ul>

    <!-- DADOS DO ENDEREÇO SELECIONADO -->
    <div class="resultado-final">
        <h3>🏠 Endereço Selecionado:</h3>
        <p><strong>CEP:</strong> <span id="resCep">-</span></p>
        <p><strong>Rua:</strong> <span id="resRua">-</span></p>
        <p><strong>Bairro:</strong> <span id="resBairro">-</span></p>
        <p><strong>Cidade/UF:</strong> <span id="resCidadeUf">-</span></p>
        
        <!-- MAPA DO GOOGLE MAPS -->
        <div id="mapaContainer" class="mapa-container">
            <iframe id="mapaIframe" src="" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>

    <script>
        // Força letras maiúsculas e remove números no campo UF
        function validarUF(input) {
            input.value = input.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
        }

        // Permite apenas números e insere o hífen automaticamente no CEP (00000-000)
        function validarCepFormat(input) {
            let valor = input.value.replace(/\D/g, "");
            if (valor.length > 5) {
                valor = valor.substring(0, 5) + "-" + valor.substring(5, 8);
            }
            input.value = valor;
        }

        // ATUALIZA O MAPA VISUAL DO GOOGLE MAPS
        function atualizarMapa(logradouro, bairro, cidade, uf) {
            const mapaContainer = document.getElementById("mapaContainer");
            const mapaIframe = document.getElementById("mapaIframe");
            
            // Cria um texto amigável para o Google Maps ler a localização externa [1]
            const enderecoCompleto = `${logradouro}, ${bairro}, ${cidade} - ${uf}, Brasil`;
            
            // Monta a URL oficial de incorporação do Google Maps [1]
            mapaIframe.src = `https://google.com{encodeURIComponent(enderecoCompleto)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
            mapaContainer.style.display = "block";
        }

        // PREENCHE OS CAMPOS FINAIS NA TELA
        function preencherCampos(end) {
            document.getElementById("resCep").innerText = end.cep || "-";
            document.getElementById("resRua").innerText = end.logradouro || "-";
            document.getElementById("resBairro").innerText = end.bairro || "-";
            document.getElementById("resCidadeUf").innerText = end.localidade ? `${end.localidade}/${end.uf}` : "-";
            
            if (end.logradouro && end.localidade) {
                atualizarMapa(end.logradouro, end.bairro || "", end.localidade, end.uf);
            }
        }

        // FLUXO 1: BUSCA POR CEP
        document.getElementById("formCep").addEventListener("submit", async function () {
            const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
            if (cep.length !== 8) {
                alert("Por favor, digite um CEP válido com 8 números.");
                return;
            }

            const botao = document.getElementById("btnBuscarCep");
            const lista = document.getElementById("listaResultados");
            
            botao.disabled = true;
            botao.innerText = "Carregando...";
            lista.innerHTML = "<li>Buscando dados do CEP...</li>";

            try {
                const response = await fetch(`https://viacep.com.br{cep}/json/`);
                if (!response.ok) throw new Error();
                const data = await response.json();

                if (data.erro) {
                    lista.innerHTML = "<li>CEP não encontrado na base de dados.</li>";
                    return;
                }

                lista.innerHTML = "";
                // Como busca por CEP traz apenas 1 endereço direto, já preenchemos a tela e o mapa direto
                let item = document.createElement("li");
                item.innerText = `${data.logradouro || 'Área Geral'} - ${data.bairro || ''} (${data.localidade}/${data.uf})`;
                lista.appendChild(item);
                
                preencherCampos(data);

            } catch (error) {
                alert("Erro ao conectar com a API de CEP.");
                lista.innerHTML = "";
            } finally {
                botao.disabled = false;
                botao.innerText = "Buscar por CEP";
            }
        });

        // FLUXO 2: BUSCA POR NOME/TEXTO (UF, CIDADE, RUA)
        document.getElementById("formTexto").addEventListener("submit", async function () {
            const uf = document.getElementById("uf").value.trim();
            const cidade = document.getElementById("cidade").value.trim();
            const logradouro = document.getElementById("logradouro").value.trim();

            if (cidade.length < 3 || logradouro.length < 3) {
                alert("A Cidade e o Logradouro precisam ter pelo menos 3 caracteres!");
                return;
            }

            const botao = document.getElementById("btnBuscarTexto");
            const lista = document.getElementById("listaResultados");
            
            botao.disabled = true;
            botao.innerText = "Carregando...";
            lista.innerHTML = "<li>Buscando endereços...</li>";

            try {
                const url = `https://viacep.com.br{encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
                const response = await fetch(url);
                if (!response.ok) throw new Error();
                const data = await response.json();

                lista.innerHTML = "";
                if (!data || data.length === 0 || data.erro) {
                    lista.innerHTML = "<li>Nenhum endereço encontrado. Verifique a ortografia.</li>";
                    return;
                }

                // Cria a lista de opções para o usuário clicar
                data.forEach(endereco => {
                    let item = document.createElement("li");
                    item.innerText = `${endereco.logradouro} - ${endereco.bairro} (CEP: ${endereco.cep})`;
<body>

    <h2>📍 Buscador de Endereço</h2>
    
    <!-- OPÇÃO 1: BUSCA RÁPIDA POR CEP -->
    <div class="bloco-busca">
        <h3>Busca por CEP</h3>
        <form id="formCep" onsubmit="return false;">
            <div class="campo">
                <label>Digite o CEP:</label>
                <!-- Filtra para aceitar apenas números e o traço do CEP -->
                <input type="text" id="cepInput" placeholder="Ex: 01311-200" maxlength="9" oninput="validarCepFormat(this)" required>
            </div>
            <button type="submit" id="btnBuscarCep" class="btn-principal">Buscar por CEP</button>
        </form>
    </div>

    <div class="divisor">OU</div>

    <!-- OPÇÃO 2: BUSCA POR TEXTO (UF, CIDADE, RUA) -->
    <div class="bloco-busca">
        <h3>Busca por Nome/Texto</h3>
        <form id="formTexto" onsubmit="return false;">
            <div class="campo">
                <label>UF:</label>
                <input type="text" id="uf" placeholder="Ex: SP" maxlength="2" oninput="validarUF(this)" required>
            </div>
            <div class="campo">
                <label>Cidade:</label>
                <input type="text" id="cidade" placeholder="Ex: Sao Paulo" required>
            </div>
            <div class="campo">
                <label>Logradouro:</label>
                <input type="text" id="logradouro" placeholder="Ex: Avenida Paulista" required>
            </div>
            <button type="submit" id="btnBuscarTexto" class="btn-principal">Buscar por Nome</button>
        </form>
    </div>

    <button type="button" id="btnLimpar" onclick="limparCampos()">Limpar Tudo</button>

    <h3>Resultados encontrados:</h3>
    <ul id="listaResultados"></ul>

    <!-- DADOS DO ENDEREÇO SELECIONADO -->
    <div class="resultado-final">
        <h3>🏠 Endereço Selecionado:</h3>
        <p><strong>CEP:</strong> <span id="resCep">-</span></p>
        <p><strong>Rua:</strong> <span id="resRua">-</span></p>
        <p><strong>Bairro:</strong> <span id="resBairro">-</span></p>
        <p><strong>Cidade/UF:</strong> <span id="resCidadeUf">-</span></p>
        
        <!-- MAPA DO GOOGLE MAPS -->
        <div id="mapaContainer" class="mapa-container">
            <iframe id="mapaIframe" src="" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>

    <script>
        // Força letras maiúsculas e remove números no campo UF
        function validarUF(input) {
            input.value = input.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
        }

        // Permite apenas números e insere o hífen automaticamente no CEP (00000-000)
        function validarCepFormat(input) {
            let valor = input.value.replace(/\D/g, "");
            if (valor.length > 5) {
                valor = valor.substring(0, 5) + "-" + valor.substring(5, 8);
            }
            input.value = valor;
        }

        // ATUALIZA O MAPA VISUAL DO GOOGLE MAPS
        function atualizarMapa(logradouro, bairro, cidade, uf) {
            const mapaContainer = document.getElementById("mapaContainer");
            const mapaIframe = document.getElementById("mapaIframe");
            
            // Cria um texto amigável para o Google Maps ler a localização externa [1]
            const enderecoCompleto = `${logradouro}, ${bairro}, ${cidade} - ${uf}, Brasil`;
            
            // Monta a URL oficial de incorporação do Google Maps [1]
            mapaIframe.src = `https://google.com{encodeURIComponent(enderecoCompleto)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
            mapaContainer.style.display = "block";
        }

        // PREENCHE OS CAMPOS FINAIS NA TELA
        function preencherCampos(end) {
            document.getElementById("resCep").innerText = end.cep || "-";
            document.getElementById("resRua").innerText = end.logradouro || "-";
            document.getElementById("resBairro").innerText = end.bairro || "-";
            document.getElementById("resCidadeUf").innerText = end.localidade ? `${end.localidade}/${end.uf}` : "-";
            
            if (end.logradouro && end.localidade) {
                atualizarMapa(end.logradouro, end.bairro || "", end.localidade, end.uf);
            }
        }

        // FLUXO 1: BUSCA POR CEP
        document.getElementById("formCep").addEventListener("submit", async function () {
            const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
            if (cep.length !== 8) {
                alert("Por favor, digite um CEP válido com 8 números.");
                return;
            }

            const botao = document.getElementById("btnBuscarCep");
            const lista = document.getElementById("listaResultados");
            
            botao.disabled = true;
            botao.innerText = "Carregando...";
            lista.innerHTML = "<li>Buscando dados do CEP...</li>";

            try {
                const response = await fetch(`https://viacep.com.br{cep}/json/`);
                if (!response.ok) throw new Error();
                const data = await response.json();

                if (data.erro) {
                    lista.innerHTML = "<li>CEP não encontrado na base de dados.</li>";
                    return;
                }

                lista.innerHTML = "";
                // Como busca por CEP traz apenas 1 endereço direto, já preenchemos a tela e o mapa direto
                let item = document.createElement("li");
                item.innerText = `${data.logradouro || 'Área Geral'} - ${data.bairro || ''} (${data.localidade}/${data.uf})`;
                lista.appendChild(item);
                
                preencherCampos(data);

            } catch (error) {
                alert("Erro ao conectar com a API de CEP.");
                lista.innerHTML = "";
            } finally {
                botao.disabled = false;
                botao.innerText = "Buscar por CEP";
            }
        });

        // FLUXO 2: BUSCA POR NOME/TEXTO (UF, CIDADE, RUA)
        document.getElementById("formTexto").addEventListener("submit", async function () {
            const uf = document.getElementById("uf").value.trim();
            const cidade = document.getElementById("cidade").value.trim();
            const logradouro = document.getElementById("logradouro").value.trim();
        }
            if (cidade.length < 3 || logradouro.length < 3) {
                alert("A Cidade e o Logradouro precisam ter pelo menos 3 caracteres!");
                return;
            }

            const botao = document.getElementById("btnBuscarTexto");
            const lista = document.getElementById("listaResultados");
            
            botao.disabled = true;
            botao.innerText = "Carregando...";
            lista.innerHTML = "<li>Buscando endereços...</li>";

            try {
                const url = `https://viacep.com.br{encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
                const response = await fetch(url);
                if (!response.ok) throw new Error();
                const data = await response.json();

             } lista.innerHTML = "";
                if (!data || data.length === 0 || data.erro) {
                    lista.innerHTML = "<li>Nenhum endereço encontrado. Verifique a ortografia.</li>";
                    return;
                }

                // Cria a lista de opções para o usuário clicar
                data.forEach(endereco => {
                    let item = document.createElement("li");
                    item.innerText = `${endereco.logradouro} - ${endereco.bairro} (CEP: ${endereco.cep})`;
                </script>