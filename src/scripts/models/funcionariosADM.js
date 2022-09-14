import { Api } from '../api.js'

const btnEmpresas = document.querySelector('#btnEmpresas')
const btnFuncionarios = document.querySelector('#btnFuncionarios')
const btnSair = document.querySelector('#btnSair');
const btnLanding = document.querySelector('#btnLandingPage')
const containerSelectDeps = document.querySelector('#deps')
const containerSelectFuncs = document.querySelector('#funcs')
const containerSelectFuncs2 = document.querySelector('#funcs2')
const btnContratar = document.querySelector('#btnContratar')
const btnDemitir = document.querySelector('#btnDemitir')

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

Api.gerarSelectDeps(containerSelectDeps)
Api.gerarSelectFuncs(containerSelectFuncs)

let idFunc
let idDep
containerSelectFuncs.addEventListener('click', (event) => {
    event.preventDefault();
    idFunc = event.target.value
    console.log(event.target.value)
})
containerSelectDeps.addEventListener('change', (event) => {
    event.preventDefault();
    idDep = event.target.value
})

btnContratar.addEventListener('click', (event) => {
    event.preventDefault()
    Api.contratarFuncionario(idDep, idFunc)
})

Api.gerarSelectFuncsDep(containerSelectFuncs2)

let idFunc2

containerSelectFuncs2.addEventListener('click', (event) => {
    event.preventDefault()
    idFunc2 = event.target.value
    console.log(event.target.value)
})
btnDemitir.addEventListener('click', (event) => {
    event.preventDefault()
    Api.demitirFunc(idFunc2)
})
