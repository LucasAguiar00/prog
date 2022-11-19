//Autor: Lucas Aguiar
//Ultima edição: 30/10/2022

// Variáveis principais

var protocolo_chat = window.document.getElementById("protocolo_chat")
var protocolo_adm = window.document.getElementById("protocolo_adm")
var nome_cliente = window.document.getElementById("nome_cliente")
var telefone = window.document.getElementById("telefone")
var bfp = window.document.getElementById("bfp")
var descricao = window.document.getElementById("descricao")
var h_preferencia = window.document.getElementById("h_preferencia")
var ponto_referencia = window.document.getElementById("ponto_referencia")

var b_protocolo = window.document.getElementById("Protocolo")
var b_copiar = window.document.getElementById("Copiar")
var b_tranferir = window.document.getElementById("Transferir")
var b_apagar = window.document.getElementById("Apagar")

// Mudar o titulo
function mudar_titulo(){
    var titulo = window.document.getElementById("titulo")
    if (nome_cliente.value!=''){
        titulo.innerText = nome_cliente.value
    }

    cpf_corrigir();

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    if (notificacao.innerHTML != '') {
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 1000);
    }    

    
}

//  Função Apagar
//      Questiona se o usuário deseja apagar.
//      Se sim → apaga os campos
//      Se não → Não faz nada

function Apagar(){
    var question = window.confirm("Deseja apagar?")
    // O if é executado se question==true 
    if (question){
        protocolo_chat.value = ''
        protocolo_adm.value = ''
        nome_cliente.value = ''
        telefone.value = ''
        bfp.value = 'Padrão Fibra'
        descricao.value = ''
        h_preferencia.value = ''
        ponto_referencia.value = ''

        // Mostra a notificação do bootstrap
        let notificacao = document.getElementById("notificacao")
        notificacao.innerHTML = '<div class="alert alert-danger" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>EXCLUÍDO!</strong>  </div>'

        // Tempo de 2 segundos para a notificação sumir
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove(); 
            });
        }, 2000);
    }
}


//  Função Máscara para o número de contato
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('telefone').onkeyup = function(){
		mascara( this, mtel );
	}
}



// Função protocolo
function protocolo(){
    
    // Nessa parte do código ele ira criar uma variável "trecho", com o texto até a PONTO_OU_VIRGULA="."
    descricao_aux = descricao.value // pegando o valor
    let tamanho = descricao_aux.length // pegando o tamanho do "vetor"
    // let PONTO_OU_VIRGULA = "."
    let PONTO_OU_VIRGULA = localStorage.getItem('txt_key_protocolo')
    let posi = 0
    var trecho = ""
    for (var i = 0; i < tamanho; i++){                     
        if (descricao_aux[i]==PONTO_OU_VIRGULA){
            posi = i  
            break
        }
        trecho = trecho + descricao_aux[i]                 
    }        
    
    // Montando o texto padrão para colar no ADM
    let texto_completo = `${trecho}<hr><b><font color=blue> Protocolo do Chat: ${protocolo_chat.value} </b></font><hr>`
    
    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(texto_completo);
    
    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-warning" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Copiado!</strong> Verifique as informações antes de colar no ADM! </div>'
    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 2000);

}

// Função copiar
function copiar(){
    
    // Coletando a data atual para registrar no protocolo
    let data = new Date()
    let dia = data.getUTCDate()-1 
    let mes = data.getUTCMonth()+1
    if (dia<10){
        dia = String(dia)
        dia = '0'+dia
    }
    dia = String(dia)
    mes = String(mes)
    
    // Montando o texto padrão para colar no ADM
    let texto_completo = `<b><font color=blue>Protocolo do Chat: ${protocolo_chat.value} </b></font><hr> <b><font color=blue>	${bfp.value} </b></font><hr> ${dia}/${mes}→ Atendimento realizado com Sr(a). ${nome_cliente.value} via chat no número ${telefone.value}. <br> ${descricao.value}`
    
    // Condição em caso de VS
    // Se tiver o horario de preferência e o ponto de referência ele adiciona as informações no texto
    if (ponto_referencia.value!=h_preferencia.value){
        var texto_vs = `<hr> Horário de preferência: ${h_preferencia.value} <br> Ponto de referência: ${ponto_referencia.value} <hr>`
        texto_completo = texto_completo + texto_vs
    }

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(texto_completo)    
    
    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-success" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Copiado!</strong> Verifique as informações antes de colar no ADM! </div>'
    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 2000);

}


// Função CPF
function x(){

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_cpf');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

}

function cpf_corrigir(){
    var cpf = document.getElementById("btn_cpf").innerText
    if (cpf==""){
        document.getElementById("btn_cpf").innerText = "CPF"
    }
}

function cpf(){

    navigator.clipboard
    .readText()
    .then((clipText) => (document.getElementById("btn_cpf").innerText = clipText));
    
    // Essa função é executada após 0,1s
    setTimeout(function(){
        // Cria a variável cpf
        var cpf = document.getElementById("btn_cpf").innerText
    
        // Deixa apenas os números no CPF
        cpf = cpf.replace(/[^0-9]/g,'')
        cpf = String(cpf)
        
        // Deixa o CPF corrigido no título do botão
        document.getElementById("btn_cpf").innerText = cpf

        // Salva o CPF corrigido no localStorage, para ser copiado em outra função
        localStorage.setItem('txt_cpf', cpf)        
   },100);
   
}



// FUNÇAO BOTÕES DE ATALHO

function atalho1() {

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_atalho1');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-primary" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Atalho copiado com sucesso!</strong> </div>'
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
}



function atalho2() {

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_atalho2');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-primary" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Atalho copiado com sucesso!</strong> </div>'
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
}



function atalho3() {

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_atalho3');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-primary" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Atalho copiado com sucesso!</strong> </div>'
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
}


function atalho4() {

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_atalho4');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-primary" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Atalho copiado com sucesso!</strong> </div>'
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
}

function atalho5() {

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_atalho5');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-primary" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Atalho copiado com sucesso!</strong> </div>'
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
}

function atalho6() {

    // Pegando a informação do local Storage
    var atalho = localStorage.getItem('txt_atalho6');

    // Passando as informações para a área de transferência
    navigator.clipboard.writeText(atalho)

    // Exibindo a notificação de texto copiado por 2 segundos
    let notificacao = document.getElementById("notificacao")
    notificacao.innerHTML = '<div class="alert alert-primary" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Atalho copiado com sucesso!</strong> </div>'
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
}


function transferir(){
    var area_transferencia
    var data = navigator.clipboard.readText().then(function(dados) {        
        // tenho que programar tudo dentro dessa função
        console.log("Your string: ", dados);        
        area_transferencia = String(dados)

        //Remove as quebras de linha do texto
        area_transferencia = area_transferencia.replace(/(\r\n|\n|\r)/gm, "");
        //window.alert(area_transferencia)

        var protocolo_chat = window.document.getElementById("protocolo_chat")
        var nome_cliente = window.document.getElementById("nome_cliente")
        var telefone = window.document.getElementById("telefone")

        var p_nome = dados.search("Nome:")
        var p_telefone = dados.search("Telefone:")
        var p_email = dados.search("E-mail:")
        var p_numProtocolo = dados.search("Número de protocolo:")
        var p_classificacao = dados.search("Classificação:")

        nome_cliente.value = (dados.substring(p_nome+6,p_telefone)).replace("?","")
        telefone.value = (dados.substring(p_telefone+12,p_email)).replace(/[^0-9]/g,'')
        protocolo_chat.value = (dados.substring(p_numProtocolo+20,p_classificacao)).replace(/[^0-9]/g,'')
    });  
}


function fun_h_preferencia(){
    var hpfr = window.document.getElementById("hpfr")
    var h_preferencia = window.document.getElementById("h_preferencia").value
    
    
    if (h_preferencia == "Outro"){
        hpfr.innerHTML = `<input type="input" id="h_preferencia2" Placeholder="Digite aqui o horário...">`
        
    }

}