const botao = document.getElementById('editarPerfil');
const formulario = document.getElementById('formularioPerfil');
const editPerfilForm = document.getElementById('editPerfilForm');
const closeBtn = document.querySelector('.modal-content-EditPerfil .close');

closeBtn.addEventListener('click', () => {
    formulario.style.display = 'none';
});

botao.addEventListener('click', () => {
    formulario.style.display = 'flex';
});

editPerfilForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const descriptionboxPerfil = document.getElementById('descriptionboxPerfil').value;
    const imagePerfil = document.getElementById('imagePerfil').value;
    const editUsuario = document.createElement('section');
    editUsuario.classList.add('produto-detalhes');
    editUsuario.innerHTML = `
            <article class="produto-image">
                <img src="${imagePerfil}">
            </article>
            <section class="produto-info">
                <h2 class="produto-nome">${nomeUsuario}</h2>
            </section>
            <section class="produto-Units">
                <button class="edit-button">EDITAR</button>
            </section>
    `;

    listaCartoes.appendChild(editUsuario);

    // Limpar o formulário
    document.getElementById('nomeUsuario').value = '';
    document.getElementById('descriptionboxPerfil').value = '';
    document.getElementById('imageProduto').value = '';
    formulario.style.display = 'none';
});
