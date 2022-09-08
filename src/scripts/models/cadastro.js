import { Api } from '../api.js'

const btnIrCadastro = document.querySelector("#btnCadastro")
const btnIrLogin = document.querySelector("#btnLogin")
const btnIrLogin2 = document.querySelector(".btnIrCadastro")
const btnCadastrar = document.querySelector("#btnForm")

btnIrCadastro.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
})
btnIrLogin.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("./login.html");
})
btnIrLogin2.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("./login.html");
})

btnCadastrar.addEventListener("click", (event) => {
    event.preventDefault();
    let body = {
        username: document.querySelector("#nomeCadastro").value,
        email: document.querySelector("#emailCadastro").value,
        professional_level: document.querySelector("#cargoCadastro").value,
        password: document.querySelector("#senhaCadastro").value
    }
    Api.cadastro(body)
})

setInterval(Api.verificarLogin('../../pages/empresas'), 500)


