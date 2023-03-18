/*Variável array que irá guardar os valores do IMC :  */

const data = [

{

    min:0,
    max:18.4,
    classificacao: " Menor que 18.5 ",
    info: "Magreza" ,
    nivelObesidade: "0",




},

{

    min:18.5,
    max:24.9,
    classificacao: " Entre 18.5 e 24.9 ",
    info: "Saudável" ,
    nivelObesidade: "0",




},

{

    min:25.0,
    max:29.9,
    classificacao: " Entre 25.0 e 29.9 ",
    info: "Acima Do Peso / Sobrepeso" ,
    nivelObesidade: "1",




},

{

    min:30.0,
    max:39.9,
    classificacao: " Entre 30.0 e 39.9 ",
    info: "Obesidade" ,
    nivelObesidade: "2",




},

{

    min:40.0,
    max:100,
    classificacao: " Maior que 40.0 :  ",
    info: "Obesidade Grave" ,
    nivelObesidade: "3",

},


];



/*Seleção De Elementos (Botões, valores ...): */

const tabelaIMC = document.querySelector("#imc-tabela");

const alturaInput = document.querySelector("#altura");

const pesoInput = document.querySelector("#peso");

const botaoCalcularInput = document.querySelector("#botao-calcular");

const botaoLimparInput = document.querySelector("#botao-limpar");

const numIMC = document.querySelector("#valor-imc span");

const situacaoIMC = document.querySelector("#situacao-imc span");

const botaoVoltar = document.querySelector("#botao-voltar");

const calcContainer = document.querySelector("#calc-container") ;

const resultContainer = document.querySelector("#resultado-container") ;




/*Funcoes para criar as tabelas e mostrar as informações (classificação, nivelObesidade e etc ) : */




function criarTabela(data){


    data.forEach((item) => {

        const div = document.createElement("div");
        div.classList.add("tabela-data");

        const classificacao = document.createElement("p");
        classificacao.innerText = item.classificacao;

        const info = document.createElement("p");
        info.innerText = item.info;

        const nivelObesidade = document.createElement("p");
        nivelObesidade.innerText = item.nivelObesidade;

        div.appendChild(classificacao);
        div.appendChild(info);
        div.appendChild(nivelObesidade);

        tabelaIMC.appendChild(div);

    }  ) ;

}

/*Função para limpar os campos do formulário quando o botao-limpar for selecionado*/

function limparInputs(){

    alturaInput.value = "";
    pesoInput.value = "";
    numIMC.classList = "" ;
    situacaoIMC.classList = "" ;

}

/*Função para não deixar serem colocados outros caracteres ( sem ser os números e as vírgulas : )*/

function validarDigitos(text){

    /*Expressão regular do JS que limita os caracteres em números e trocar os que não são por vazio */

    return text.replace(/[^0-9,]/g,"");



}


/*Função para calcular o IMC : */

function calcularIMC(novoPeso,novaAltura){

    const IMC = (novoPeso / (novaAltura * novaAltura)).toFixed(1) ;

    return IMC;

}

/*Função para realizar a troca de telas quando for feito o cálculo e assim mostrar as informações : */


function trocaDeTelas(){

    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
    


}

/*Inicialização : */

criarTabela(data) ;


/*Eventos : */

[alturaInput,pesoInput].forEach((Element) => {

    Element.addEventListener("input", (e) => {

        const updateValue = validarDigitos(e.target.value)  ;

        e.target.value = updateValue ; 

    }) ;

});





/*Evento / Realização do Cálculo :  */




botaoCalcularInput.addEventListener("click",(e) => {

    e.preventDefault();

    /*Para converter os valores de peso e altura que são do tipo text para o tipo float e
    também para substituir uma possível vírgula por um ponto : */

    const novoPeso = +pesoInput.value.replace(",",".");
    const novaAltura = +alturaInput.value.replace(",",".");

    /*Para verificar se o usuário colocou e enviou dos valores corretamente : */

    if(!novoPeso || !novaAltura)  return ;

    const valorIMC = calcularIMC(novoPeso,novaAltura) ;

    let infoIMC ;

    /*Foreach para pecorrer todo o array data e verificar em que classificação o valor IMC se encontra : */

    data.forEach(item => {

        if(valorIMC >= item.min && valorIMC <= item.max) {

            infoIMC = item.info;
        }
    }); 

    console.log(infoIMC)

    /*Caso o usuário coloque valores fora da classificação ( Absurdos ) o  envio não será validado :  */

    if(!infoIMC) return ; 

    numIMC.innerText = valorIMC;
    situacaoIMC.innerText = infoIMC ;

    /*Switch case para ver a classificação do IMC e mostrar o 'FeedBack Visual ' (cores no valor-imc 
        e na situação-imc :  ) */

        switch(infoIMC){

            case "Magreza" :

                numIMC.classList.add("baixo") ;
                situacaoIMC.classList.add("baixo");

                break;

            case "Saudável" :

                numIMC.classList.add("bem") ;
                situacaoIMC.classList.add("bem");
                break;

            case "Acima Do Peso / Sobrepeso" :

                numIMC.classList.add("baixo") ;
                situacaoIMC.classList.add("baixo");
                break;
            case "Obesidade" :

                numIMC.classList.add("medio") ;
                situacaoIMC.classList.add("medio");
                break;
                
            case "Obesidade Grave" :

                numIMC.classList.add("grave") ;
                situacaoIMC.classList.add("grave");
                break;
            
        }

    /*Executando a função para que seja feita a troca entre as telas : */

    trocaDeTelas()


});

/*Evento do botão Limpar  :  */

botaoLimparInput.addEventListener("click",(e) => {

    e.preventDefault();

    limparInputs();
}) ;  


botaoVoltar.addEventListener("click",(e) => {

    limparInputs();

    trocaDeTelas();

}) ;


