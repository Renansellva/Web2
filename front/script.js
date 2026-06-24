document.getElementById('formProduto').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede a página de recarregar

    // 1. Captura os inputs do HTML
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco_por_hora = document.getElementById('preco').value;
    const divMensagem = document.getElementById('mensagem');
    const btnSalvar = document.getElementById('btnSalvar');

    // 2. Estado de Carregamento Visual
    divMensagem.className = "feedback-message loading";
    divMensagem.innerText = "⏳ Processando requisição, salvando no banco...";
    btnSalvar.disabled = true;

    // 3. Estrutura o payload JSON
    const dadosProduto = {
        nome: nome,
        descricao: descricao,
        preco_por_hora: parseFloat(preco_por_hora)
    };

    try {
        // 4. Dispara a requisição para a API em SQL Puro
        const resposta = await fetch('http://localhost:3000/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        });

        const resultado = await resposta.json();

        // 5. Trata a resposta do servidor baseando-se nos HTTP status codes
        if (resposta.ok) {
            // Sucesso (Status 201 Created)
            divMensagem.className = "feedback-message success";
            divMensagem.innerText = `✅ Sucesso! Brinquedo gravado com ID #${resultado.id}`;
            document.getElementById('formProduto').reset(); // Reseta o formulário
        } else {
            // Erro retornado pelo controller ou Trigger do Postgres (Status 400/500)
            divMensagem.className = "feedback-message error";
            divMensagem.innerText = `${resultado.erro || 'Erro desconhecido ao salvar.'}`;
        }

    } catch (error) {
        // Erro caso o backend esteja desligado ou caia
        divMensagem.className = "feedback-message error";
        divMensagem.innerText = "❌ Falha de comunicação: O servidor Backend está offline.";
    } finally {
        // Devolve o botão ao estado normal
        btnSalvar.disabled = false;
    }
});