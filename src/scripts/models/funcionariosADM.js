import { Api } from '../api.js'

const btnEmpresas = document.querySelector('#btnEmpresas')
const btnFuncionarios = document.querySelector('#btnFuncionarios')
const btnSair = document.querySelector('#btnSair');
const btnLanding = document.querySelector('#btnLandingPage')

btnSair.addEventListener('click', (event) => {
    event.preventDefault();
    Api.sair()
})
btnEmpresas.addEventListener("click", (event) => {
    event.preventDefault()
    window.location.replace('./empresasADM.html')
})
btnFuncionarios.addEventListener("click", (event) => {
    event.preventDefault()
    window.location.replace('./funcionariosADM.html')
})
btnLanding.addEventListener("click", (event) => {
    event.preventDefault()
    window.location.replace('./landingPageADM.html')
})