import { Api } from '../api.js'

const btnIrCadastro = document.querySelector("#btnCadastro")
const btnIrLogin = document.querySelector("#btnLogin")
const btnIrCadastro2 = document.querySelector(".btnIrCadastro")
const btnLogar = document.querySelector("#btnForm")

btnIrCadastro.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("./cadastro.html");
})
btnIrCadastro2.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("./cadastro.html");
})
btnIrLogin.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload()
})
btnLogar.addEventListener("click", (event) => {
    event.preventDefault();
    let body = {
        email: document.querySelector("#emailLogin").value,
        password: document.querySelector("#senhaLogin").value
    }
    Api.login(body)
})

setInterval(Api.verificarLogin('./empresas'), 500)
