import { Api } from "../api.js";

const btnIrCadastro = document.querySelector("#btnCadastro")
const btnIrLogin = document.querySelector("#btnLogin")

btnIrCadastro.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("./src/pages/cadastro.html");
})
btnIrLogin.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("./src/pages/login.html");
})

Api.gerarEmpresasNoAuth()
Api.gerarSelect()
let setoresNoAuth = document.querySelector("#setoresNoAuth")
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
