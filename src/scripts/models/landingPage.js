import { Api } from '../api.js'

const btnSair = document.querySelector('#btnSair');
const btnMudar = document.querySelector('#btnMudar');
const btnModificar = document.querySelector('#btnModificar');

btnSair.addEventListener('click', (event) => {
    event.preventDefault();
    Api.sair()
})

Api.gerarInfos()
Api.gerarColegas()

btnModificar.addEventListener('click', (event) => {
    event.preventDefault();
    Api.gerarModificadorEu()
})

// btnMudar.addEventListener('click', (event) => {
//     event.preventDefault();
//     Api.()
// })
