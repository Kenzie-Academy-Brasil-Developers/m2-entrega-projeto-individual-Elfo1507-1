import { Api } from '../api.js'

const btnSair = document.querySelector('#btnSair');

btnSair.addEventListener('click', (event) => {
    event.preventDefault();
    Api.sair()
})