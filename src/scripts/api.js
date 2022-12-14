class Api{
    static baseUrl = "http://localhost:6278/"
    static headersAuth = {
        "Authorization": `Bearer ${localStorage.getItem("@KenzieEmpresas: Token")}`,
        "Content-Type": "application/json"
    }
    static headersNoAuth = {
        "Content-Type": "application/json"
    }
    static verificarLogin(){
        if(localStorage.getItem("@KenzieEmpresas: Token")){
            if(localStorage.getItem("@KenzieEmpresas: adm?") == 'true'){
                window.location.replace(`./landingPageADM.html`)
            }else{
                window.location.replace(`./landingPage.html`)
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
    static gerarSelectSetores(container){
        fetch(`${this.baseUrl}sectors`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                let option = document.createElement("option")
                option.value = res[i].uuid
                option.innerText = res[i].description
                container.appendChild(option)
            }
        })
    }
    static gerarCardEmpresa(res, container){
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
        container.appendChild(li)
    }
    static gerarCardUsuario(res, container){
        let li = document.createElement("li")
        let div = document.createElement("div")
        let div2 = document.createElement("div")
        let h4 = document.createElement("h4")
        let span = document.createElement("span")
        let p1 = document.createElement("p")
        let p4 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let div3 = document.createElement("div")
        let btn = document.createElement("button")
        h4.innerText = res.username
        if(res.is_admin){
            span.innerHTML = 'ADM'
        }else{
            span.innerHTML = 'Funcionario'
        }
        p1.innerText = res.email
        p2.innerText = res.kind_of_work
        p3.innerText = res.professional_level
        div3.classList.add('btnContainer')
        btn.innerText = 'Modificar?'
        btn.classList.add('btnGeral')
        btn.setAttribute('id', res.uuid)
        div.append(h4, span)
        div2.append(p2, p3)
        li.append(div, p1, div2, btn)
        li.classList.add('containerFunc')
        container.appendChild(li)
    }
    static gerarEmpresasNoAuth(){
        let containerEmpresasNoAuth = document.querySelector('.containerEmpresas')
        containerEmpresasNoAuth.innerHTML = ''
        fetch(`${this.baseUrl}companies`, {
            method: "GET",
            headers: this.headersNoAuth,
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                this.gerarCardEmpresa(res[i], document.querySelector('.containerEmpresas'))            
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
                    this.gerarCardEmpresa(res[i], containerEmpresasNoAuth)
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
            if(res.is_admin){
                window.location.replace('./landingPageADM.html')
            } else {
                window.location.replace('./landingPage.html')
            }
        })
    }
    static gerarUsuarios(container){
        fetch(`${this.baseUrl}users`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)

            for(let i = 0; i < res.length; i++){
                this.gerarCardUsuario(res[i], container)
            }
        })
    }
    static gerarUsuariosSemDep(){
        fetch(`${this.baseUrl}admin/out_of_work`, {
            method: "GET",
            headers: this.headersAuth
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let containerUsuariosNoDep = document.querySelector('#containerUsuariosNoDep');
            for(let i = 0; i < res.length; i++){
                this.gerarCardUsuario(res[i], containerUsuariosNoDep)
            }
        })
    }
    static cadastrarEmpresa(body){
        fetch(`${this.baseUrl}companies`, {
            method: "POST",
            headers: this.headersAuth,
            body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
    }
    static modificarFunc(id, body){
        fetch(`${this.baseUrl}admin/uptade_user/${id}`, {
            method: "PATCH",
            headers: this.headersAuth,
            body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
    }
    static gerarModificador(id, container){
        let main = document.querySelector('main');
        let form = document.createElement("form");
        let div = document.createElement("div");
        let label1 = document.createElement("label")
        let input1 = document.createElement("input");
        let label2 = document.createElement("label");
        let input2 = document.createElement("input");
        let label3 = document.createElement("label");
        let input3 = document.createElement("input");
        let label4 = document.createElement("label");
        let input4 = document.createElement("input");
        let div2 = document.createElement("div");
        let label5 = document.createElement("label");
        let input5 = document.createElement("input");
        let label6 = document.createElement("label");
        let input6 = document.createElement("input");
        let label7 = document.createElement("label");
        let input7 = document.createElement("input");
        let select = document.createElement("select");
        let btnModificar = document.createElement("button");
        let btnDeletar = document.createElement("button");
        select.id = "select"
        btnModificar.innerText = "Modificar";
        btnModificar.id = id
        btnModificar.classList.add("btnGeral")
        btnDeletar.innerText = "Deletar";
        btnDeletar.id = id
        btnDeletar.classList.add("btnDeletar")
        label1.innerText = 'Estagiario'
        label1.for = 'est'
        input1.value = 'est??gio'
        input1.type = 'radio'
        input1.name = 'level'
        input1.id = 'est'
        label2.innerText = 'Junior'
        label2.for = 'junior'
        input2.value = 'junior'
        input2.type = 'radio'
        input2.name = 'level'
        input2.id = 'junior'
        label3.innerText = 'Pleno'
        label3.for = 'pleno'
        input3.value = 'pleno'
        input3.type = 'radio'
        input3.name = 'level'
        input3.id = 'pleno'
        label4.innerText = 'S??nior'
        label4.for = 's??nior'
        input4.value = 's??nior'
        input4.type = 'radio'
        input4.name = 'level'
        input4.id = 's??nior'
        div.classList.add('containerRadio')
        div.append(label1, input1, label2, input2, label3, input3, label4, input4)
        label5.innerText = 'Home Office'
        label5.for = 'home office'
        input5.value = 'home office'
        input5.type = 'radio'
        input5.name = 'tipoServico'
        input5.id = 'home office'
        label6.innerText = 'Hibrido'
        label6.for = 'hibrido'
        input6.value = 'hibrido'
        input6.type = 'radio'
        input6.name = 'tipoServico'
        input6.id = 'hibrido'
        label7.innerText = 'Presencial'
        label7.for = 'presencial'
        input7.value = 'presencial'
        input7.type = 'radio'
        input7.name = 'tipoServico'
        input7.id = 'presencial'
        div2.classList.add('containerRadio')
        div2.append(label5, input5, label6, input6, label7, input7)
        form.append(div, div2, select)
        container.appendChild(form)
        form.append(btnDeletar, btnModificar)
        this.gerarSelectSetores(select)
        main.classList.add('mainForm')
    }
    static modificarFunc(id, tipoTrabalho, nivelTrabalho, idDep){
        let body = {
            professional_level: nivelTrabalho,
            kind_of_work: tipoTrabalho,
            department_uuid: idDep
        }
        fetch(`${this.baseUrl}admin/update_user/${id}`, {
            method: 'PATCH',
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    }
    static deletarFunc(id){
        fetch(`${this.baseUrl}admin/delete_user/${id}`, {
            method: 'DELETE',
            headers: this.headersAuth
        })
    }
    static cadastrarEmpresa(id){
        let body = {
            name: document.querySelector("#nomeEmpresa").value,
            opening_hours: document.querySelector("#horaDeAbrirEmpresa").value,
            description: document.querySelector("#descEmpresa").value,
            sector_uuid: id
        }
        console.log(body);
        fetch(`${this.baseUrl}companies`, {
            method: 'POST',
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    }
    static gerarDeps(){
        fetch(`${this.baseUrl}departments`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            let containerDeps = document.querySelector('.containerDeps')
            for (let i = 0; i < res.length; i++) {
                let li = document.createElement('li')
                let h3 = document.createElement('h3')
                let p1 = document.createElement('p')
                let span = document.createElement('span')
                let p2 = document.createElement('p')
                let btn = document.createElement('button')
                li.append(h3, p1, span, p2, btn)
                containerDeps.appendChild(li)
                h3.innerText = res[i].name
                p1.innerText = res[i].description
                span.innerText = 'Empresas:'
                p2.innerText = res[i].companies.name
                btn.innerText = 'Modificar?'
                btn.id = res[i].uuid
                btn.classList.add('btnGeral')
            }
        })
    }
    static gerarSelectEmpresas(container){
        fetch(`${this.baseUrl}companies`, {
            method: 'GET',
            headers: this.headersNoAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                let option = document.createElement('option')
                option.innerText = res[i].name
                option.value = res[i].uuid
                container.appendChild(option)
            }
        })
    }
    static gerarDepsPorEmpresa(id){
        fetch(`${this.baseUrl}departments/${id}`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            let containerDeps = document.querySelector('#depsPorEmpresa')
            containerDeps.innerHTML = ''
            for (let i = 0; i < res.length; i++) {
                let li = document.createElement('li')
                let h3 = document.createElement('h3')
                let p1 = document.createElement('p')
                let span = document.createElement('span')
                let p2 = document.createElement('p')
                li.append(h3, p1, span, p2)
                containerDeps.appendChild(li)
                h3.innerText = res[i].name
                p1.innerText = res[i].description
                span.innerText = 'Empresa:'
                p2.innerText = res[i].companies.name
            }
        })
    }
    static cadastrarDeps(id){
        let body = {
            name: document.querySelector('#nomeDep').value,
            description: document.querySelector('#descDep').value,
            company_uuid: id
        }
        fetch(`${this.baseUrl}departments`, {
            method: 'POST',
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    }
    static gerarModificadorDep(id){
        let main = document.querySelector('main');
        main.innerHTML = '';
        let input1 = document.createElement('input');
        let btn = document.createElement('button');
        let btn2 = document.createElement('button');
        btn.innerText = 'Modificar'
        btn.id = id
        btn.classList.add('btnGeral')
        btn.classList.add('btnModificar')
        btn2.innerText = 'Deletar?'
        btn2.id = id
        btn2.classList.add('btnDeletar')
        input1.type = 'text'
        input1.placeholder = 'Insira descri????o'
        input1.id = 'mudarDescricaoDep'
        main.append(input1, btn2, btn)
    }
    static modificarDep(id){
        let body = {
            description: document.querySelector('#mudarDescricaoDep').value
        }
        fetch(`${this.baseUrl}departments/${id}`,  {
            method: 'PATCH',
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then((res) => {
            console.log(res)
            window.location.reload()
        })
    }
    static deletarDep(id){
        fetch(`${this.baseUrl}departments/${id}`,  {
            method: 'DELETE',
            headers: this.headersAuth
        })
    }
    static gerarSelectFuncs(container){
        fetch(`${this.baseUrl}admin/out_of_work`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            for(let i = 0; i < res.length; i++) {
                let option = document.createElement('option')
                option.value = res[i].uuid
                option.innerText = res[i].username
                container.append(option)
            }
        })
    }
    static gerarSelectDeps(container){
        fetch(`${this.baseUrl}departments`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            for(let i = 0; i < res.length; i++) {
                let option = document.createElement('option')
                option.value = res[i].uuid
                option.innerText = res[i].name
                container.append(option)
            }
        })
    }
    static contratarFuncionario(idDep, idFunc){
        let body = {
            user_uuid: idFunc,
            department_uuid: idDep,
        }
        console.log(body)
        fetch(`${this.baseUrl}departments/hire/`, {
            method: 'PATCH',
            headers: this.headersAuth,
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    }
    static gerarSelectFuncsDep(container){
        fetch(`${this.baseUrl}users`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            for(let i = 0; i < res.length; i++) {
                if(res[i].is_admin == false){
                    let option = document.createElement('option')
                    option.value = res[i].uuid
                    option.innerText = res[i].username
                    container.append(option)
                }
            }
        })
    }
    static demitirFunc(id){
        fetch(`${this.baseUrl}departments/dimiss/${id}`, {
            method: 'PATCH',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    }

    static gerarInfos(){
        fetch(`${this.baseUrl}users/profile`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            let container = document.querySelector('#containerEu')
            let div = document.createElement("div")
            let div2 = document.createElement("div")
            let div3 = document.createElement("div")
            let h4 = document.createElement("h4")
            let p1 = document.createElement("p")
            let p2 = document.createElement("p")
            let p3 = document.createElement("p")
            let p4 = document.createElement("p")
            let btn = document.createElement("button")
            h4.innerText = res.username
            p1.innerText = res.email
            p2.innerText = res.kind_of_work
            p3.innerText = res.professional_level
            p4.innerText = res.email
            div3.classList.add('btnContainer')
            btn.innerText = 'Modificar?'
            btn.classList.add('btnGeral')
            btn.setAttribute('id', 'btnModificar')
            div.append(h4, p4)
            div2.append(p2, p3)
            container.append(div, div2, div3, btn)
        })  
    }
    static gerarColegas(){
        fetch(`${this.baseUrl}users/departments/coworkers`, {
            method: 'GET',
            headers: this.headersAuth
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res[0].users)
            let container = document.querySelector('#containerColegas')
            for (let i = 0; i < res[0].users.length; i++) {
                let li = document.createElement("li")
                let div = document.createElement("div")
                let div2 = document.createElement("div")
                let div3 = document.createElement("div")
                let h4 = document.createElement("h4")
                let p1 = document.createElement("p")
                let p2 = document.createElement("p")
                let p3 = document.createElement("p")
                let p4 = document.createElement("p")
                h4.innerText = res[0].users[i].username
                p1.innerText = res[0].users[i].email
                p2.innerText = res[0].users[i].kind_of_work
                p3.innerText = res[0].users[i].professional_level
                p4.innerText = res[0].users[i].email
                div3.classList.add('btnContainer')
                li.classList.add('containerFunc')
                div.append(h4, p4)
                div2.append(p2, p3)
                li.append(div, div2, div3)
                container.append(li)
            }
        })
    }
    static gerarModificadorEu(){
        let main = document.querySelector('main')
        let section = document.createElement("section")
        let input1 = document.createElement('input')
        let input2 = document.createElement('input')
        let input3 = document.createElement('input')
        let btn = document.createElement('button')
        input1.type = 'text'
        input1.placeholder = 'Insira seu nome'
        input1.id = 'novoNome'
        input2.type = 'email'
        input2.placeholder = 'Insira seu email'
        input2.id = 'novoEmail'
        input3.type = 'password'
        input3.placeholder = 'Insira sua senha'
        input3.id = 'novaSenha'
        btn.innerText = 'Mudar'
        btn.id = 'btnMudar'
        section.append(input1, input2, input3, btn)
        main.appendChild(section)
    }
}
export {Api}