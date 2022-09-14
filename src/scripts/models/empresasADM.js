import { Api } from '../api.js'

const btnEmpresas = document.querySelector('#btnEmpresas')
const btnFuncionarios = document.querySelector('#btnFuncionarios')
const btnSair = document.querySelector('#btnSair');
const btnLanding = document.querySelector('#btnLandingPage')
const btnCadastrar = document.querySelector('#btnCadastroEmpresa')
const btnCadastrarDep = document.querySelector('#btnCadastroDep')


Api.gerarSelectSetores(document.querySelector('#selectSetores'))

let idDep
let setores = document.querySelector("#selectSetores")
setores.addEventListener("click", (event) => {
    event.preventDefault()  
    if(event.target.nodeName == 'SELECT'){
        console.log(event.target.value)
        console.log(event.target)
        idDep = event.target.value
    }
})
let idEmp
let empresas = document.querySelector('#selectEmpresasDep')
empresas.addEventListener("click", (event) => {
    event.preventDefault()
    if(event.target.nodeName == 'SELECT'){
        console.log(event.target.value)
        console.log(event.target)
        idEmp = event.target.value
    }
})
btnCadastrarDep.addEventListener("click", (event) => {
    event.preventDefault()
    Api.cadastrarDeps(idEmp)
})
btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault()
    Api.cadastrarEmpresa(idDep)
})
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
Api.gerarDeps()
Api.gerarEmpresasNoAuth()
Api.gerarSelect()
setoresNoAuth.addEventListener("change", (event) => {
    event.preventDefault()  
    if(event.target.nodeName == 'SELECT'){
        console.log(event.target.value)
        if(event.target.value == 'semSetor'){
            Api.gerarEmpresasNoAuth()
        }else{
            Api.gerarEmpresaPorSetorNoAuth(event.target.value)
        }
    }
})

Api.gerarSelectEmpresas(document.querySelector('#selectEmpresas'))
Api.gerarSelectEmpresas(document.querySelector('#selectEmpresasDep'))
let selectEmpresas = document.querySelector('#selectEmpresas')
selectEmpresas.addEventListener("change", (event) => {
    event.preventDefault()  
    if(event.target.nodeName == 'SELECT'){
        console.log(event.target.value)
        Api.gerarDepsPorEmpresa(event.target.value)
    }
})

let containerGeral = document.querySelector('.containerDeps')
containerGeral.addEventListener('click', (event) =>{
    event.preventDefault()
    if(event.target.nodeName == 'BUTTON'){
        Api.gerarModificadorDep(event.target.id)
        const btnMudar = document.querySelector('.btnModificar')
        const btnDeletar = document.querySelector('.btnDeletar')
        btnMudar.addEventListener('click', (event) => {
            event.preventDefault()
            Api.modificarDep(event.target.id)
        })
        btnDeletar.addEventListener('click', (event) => {
            event.preventDefault()
            Api.deletarDep(event.target.id)
        })
    }
})

