document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('adicionarEndereco');
    const formulario = document.getElementById('formularioEndereco');
    const novoEnderecoForm = document.getElementById('novoEnderecoForm');
    const closeBtn = document.querySelector('.modal-content-endereco .close');

    closeBtn.addEventListener('click', () => {
        formulario.style.display = 'none';
    });

    botao.addEventListener('click', () => {
        formulario.style.display = 'flex';
    });

    // Função para formatar o telefone
    function formatTelefone(event) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/(\d{2})(\d)/, '($1) $2')
                                  .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }

    const numeroTelefoneInput = document.getElementById('numeroTelefoneEndereco');
    numeroTelefoneInput.addEventListener('input', formatTelefone);

    // Limitar o número de caracteres no campo de telefone
    numeroTelefoneInput.setAttribute('maxlength', '15');

    novoEnderecoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nomeCompletoEndereco = document.getElementById('nomeCompletoEndereco').value;
        const numeroTelefoneEndereco = document.getElementById('numeroTelefoneEndereco').value;
        const RuaEndereco = document.getElementById('RuaEndereco').value;
        const bairroEndereco = document.getElementById('bairroEndereco').value;
        const cidadeEndereco = document.getElementById('cidadeEndereco').value;
        const estadoEndereco = document.getElementById('estadoEndereco').value;
        const numeroEndereco = document.getElementById('numeroEndereco').value;

        // Validação do número de telefone
        if (numeroTelefoneEndereco.length !== 15) {
            alert('Número de telefone inválido. Use o formato (XX) XXXXX-XXXX.');
            return;
        }

        const novoEndereco = document.createElement('section');
        novoEndereco.classList.add('EnderecosAdd');
        novoEndereco.innerHTML = `
        <section class="container-enderecos" >
            <section class="interiorEnderecos">
                <h2><strong>${nomeCompletoEndereco}</strong> | ${numeroTelefoneEndereco}</h2>
                <h2>${RuaEndereco}, ${numeroEndereco} - ${bairroEndereco}</h2>
                <h2>${cidadeEndereco}, ${estadoEndereco}</h2>
            </section>
            <button class="padron">PADRÃO</button>
            <article class="edition">
                <p>Editar | Excluir</p>
                <button class="btn-padron">Remover como padrão</button>
            </article>
            </section>
            </section>
        `;

        document.getElementById('listaEnderecos').appendChild(novoEndereco);

        // Limpar o formulário
        novoEnderecoForm.reset();
        formulario.style.display = 'none';
    });

    document.getElementById('CEPEndereco').addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        const mensagem = document.getElementById('cep-mensagem');

        if (cep.length !== 8) {
            mensagem.textContent = 'CEP inválido.';
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    mensagem.textContent = '';
                    document.getElementById('RuaEndereco').value = data.logradouro;
                    document.getElementById('bairroEndereco').value = data.bairro;
                    document.getElementById('cidadeEndereco').value = data.localidade;
                    document.getElementById('estadoEndereco').value = data.uf;
                } else {
                    mensagem.textContent = 'CEP não encontrado.';
                }
            })
            .catch(() => {
                mensagem.textContent = 'Erro ao consultar o CEP.';
            });
    });

    function formatarCEP(input) {
        const value = input.value.replace(/\D/g, '');
        if (value.length <= 8) {
            input.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        

        }
    }

    document.getElementById('CEPEndereco').addEventListener('input', function() {
        formatarCEP(this);
    });
});
