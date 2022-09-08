class Api{
    static baseUrl = "http://localhost:6278/"
    static headersAuth = {
        "Authorization": `Bearer ${localStorage.getItem("@KenzieEmpresas: Token")}`,
        "Content-Type": "application/json"
    }
    static headersNoAuth = {
        "Content-Type": "application/json"
    }
    static verificarLogin(url){
        if(localStorage.getItem("@KenzieEmpresas: Token")){
            if(localStorage.getItem("@KenzieEmpresas: adm?") == 'true'){
                window.location.replace(`${url}ADM.html`)
            }else{
                window.location.replace(`${url}.html`)
            }
        }
    }
    static sair(){
        localStorage.clear()
        window.location.replace('../../index.html')
    }
    static gerarSelect(){
        fetch(`${this.baseUrl}companies`, {
            method: "GET",
            headers: this.headersNoAuth
        })
        .then(res => res.json())
        .then(res => {
            let selectEmpresasNoAuth = document.querySelector("#setoresNoAuth")
            let aux = []
            for (let i = 0; i < res.length; i++) {
                if(aux.find(element => element == res[i].sectors.uuid) == undefined){
                    let option = document.createElement("option")
                    option.value = res[i].sectors.uuid
                    option.innerText = res[i].sectors.description
                    selectEmpresasNoAuth.appendChild(option)
                    aux.push(res[i].sectors.uuid)
                }
            }
        })
    }
    static gerarCardEmpresa(res){
        let containerEmpresasNoAuth = document.querySelector(".containerEmpresas")
        let li = document.createElement("li")
        let div = document.createElement("div")
        let h4 = document.createElement("h4")
        let span = document.createElement("span")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        h4.innerText = res.name
        span.innerText = res.opening_hours
        p1.innerText = res.sectors.description
        p2.innerText = res.description
        div.append(h4, span)
        li.append(div, p1, p2)
        containerEmpresasNoAuth.appendChild(li)
    }
    static gerarEmpresasNoAuth(){
        fetch(`${this.baseUrl}companies`, {
            method: "GET",
            headers: this.headersNoAuth,
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                this.gerarCardEmpresa(res[i])            
            }
        })
    }
    static gerarEmpresaPorSetorNoAuth(IDsetor){
        let containerEmpresasNoAuth = document.querySelector('.containerEmpresas')
        containerEmpresasNoAuth.innerHTML = ''
        fetch(`${this.baseUrl}companies`, {
            method: "GET",
            headers: this.headersNoAuth,
        })
        .then(res => res.json())
        .then(res => {
            for(let i = 0; i < res.length; i++){
                if(res[i].sectors.uuid == IDsetor){
                    console.log(res[i])
                    this.gerarCardEmpresa(res[i])
                }
            }
        })
    }
    static cadastro(body){
        fetch(`${this.baseUrl}auth/register/user`, {
            method: "POST",
            headers: this.headersNoAuth,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.replace('./')
        })
    }
    static login(body){
        fetch(`${this.baseUrl}auth/login`, {
            method: "POST",
            headers: this.headersNoAuth,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            localStorage.setItem('@KenzieEmpresas: Token', res.token)
            localStorage.setItem('@KenzieEmpresas: uuid', res.uuid)
            localStorage.setItem('@KenzieEmpresas: adm?', res.is_admin)
        })

    }
}

export {Api}