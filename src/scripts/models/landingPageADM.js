import { Api } from '../api.js'

const btnSair = document.querySelector('#btnSair');
const containerTd = document.querySelector('main')
const btnEmpresas = document.querySelector('#btnEmpresas')
const btnFuncionarios = document.querySelector('#btnFuncionarios')
const btnLanding = document.querySelector('#btnLandingPage')


btnSair.addEventListener('click', (event) => {
    event.preventDefault();
    Api.sair()
})
containerTd.addEventListener('click', (event) => {
    if(event.target.nodeName == 'BUTTON'){
        event.preventDefault();
        containerTd.innerHTML = ''
        Api.gerarModificador(event.target.id, containerTd)
        let idDep
        let setor = document.querySelector('#select') 
        setor.addEventListener("click", (event) => {
            event.preventDefault()
            if(event.target.nodeName == 'SELECT'){
                console.log(event.target.value)
                console.log(event.target)
                idDep = event.target.value
            }
        })
        const btnModificar = document.querySelector('.btnGeral')
        const btnDeletar = document.querySelector('.btnDeletar')
        const radios1 = document.getElementsByName('level')
        const radios2 = document.getElementsByName('tipoServico')
        const select = document.querySelector('#selectSetores')
        btnModificar.addEventListener('click', (event) => {
            event.preventDefault();
            let level
            let tipoServico
            for (let i = 0; i < 4; i++) {
                if(radios1[i].checked){
                    level = radios1[i].value
                }
            }
            for (let i = 0; i < 3; i++) {
                if(radios2[i].checked){
                    tipoServico = radios2[i].value
                }
            }
            Api.modificarFunc(event.target.id, tipoServico, level, idDep)
        
        })
        btnDeletar.addEventListener('click', (event) => {
            event.preventDefault();
            Api.deletarFunc(event.target.id)
        })
    }
})


Api.gerarUsuarios()
Api.gerarUsuariosSemDep()

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