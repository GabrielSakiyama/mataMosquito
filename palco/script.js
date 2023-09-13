//Variaveis das dimesões da tela
let width = window.innerWidth;
let height = window.innerHeight;
//Variaveis referentes a mosca
let mosca; 
let position_x;
let position_y;
let life=3;
//Variaveis referente ao tempo  
let INTERVAL_MOSCA;//Em milisegundo
let timer = document.getElementById('tempo');
let tempo_vida_mosca=INTERVAL_MOSCA/1000;
timer.innerHTML=20;
 
//Captura a dificuldade
let dificuldade = window.location.search;
dificuldade=dificuldade.replace('?','');

if(dificuldade=='Normal'){
     INTERVAL_MOSCA=2000; 
}

else{
    if(dificuldade=='Dificil'){
        INTERVAL_MOSCA=1000;
    }
    else{
        INTERVAL_MOSCA=500;
    }
}
//Atualiza a largura e altura conforme a tela é redimensionada
function updateScreen(){
    width = window.innerWidth;
    height = window.innerHeight;
}

// Cria a mosca no documento e posiciona ela na tela, respectivamente

function positionMosca(){ 
position_x = Math.floor(Math.random()*width)-90; 
position_y =Math.floor(Math.random()*height)-90;
position_x<0 ? position_x=0 : position_x=position_x;
position_y<0 ? position_y=0 : position_y=position_y;
mosca.style.left =`${position_x}px`;
mosca.style.top= `${position_y}px`;
}   

// Vira a mosca pra direita ou pra esquerda.
function changeDirection(){ 
if(Math.floor(Math.random()*2)==0)
    mosca.style.transform='scaleX(-1)';
else{
    mosca.style.transform='scaleX(1)';
}
}
// Muda o tamanho da mosca
function changeSize(min,max){
let tamanho=Math.floor((Math.random()*(max-min)))+min;
mosca.style.height=tamanho+'px';
    
} 

//Cronometro: decrementa o timer a cada 1 segundo
function cronometro(){
timer.innerHTML--;
if(timer.innerHTML==0){
   window.location.href="../vitoria_gameOver/vitoria.html";
}
} 

//Diminui o ponto de vida
function decreasesLife(){
switch(life){
    case 3:
        document.getElementById('coracao3').src='../imagens/coracao_vazio.png';
        life--;
    break;

    case 2:
        document.getElementById('coracao2').src='../imagens/coracao_vazio.png';
        life--;
    break;
    
    default:
        document.getElementById('coracao1').src='../imagens/coracao_vazio.png';
        window.location.href="../vitoria_gameOver/gameover.html";
}
}

//Cria a mosca e o tempo de vida dela
function createMosca(){
if(document.getElementById('mosca')){
    mosca.remove();
}
mosca = document.createElement('img'); 
mosca.src = "../imagens/mosca.png";
mosca.style.position='absolute';
mosca.id='mosca';
positionMosca();
changeDirection();
changeSize(30,80);
document.body.appendChild(mosca);

let timeLife=setTimeout(decreasesLife,INTERVAL_MOSCA);

mosca.onclick= function(){ 
    mosca.remove();  
    clearInterval(gameloop);
    clearTimeout(timeLife);
    createMosca();
    gameloop = setInterval(createMosca,INTERVAL_MOSCA);
}
}   


let gameloop = setInterval(createMosca,INTERVAL_MOSCA);
let intervalo = setInterval(cronometro,1000); //1000 milisegundo = 1 segundo

const CRONOMETRO_MOSCA = setInterval(()=>{
tempo_vida_mosca--;   
console.log("tempo de vida: "+tempo_vida_mosca);

if(tempo_vida_mosca==0){
    clearInterval(CRONOMETRO_MOSCA);
}
},INTERVAL_MOSCA);