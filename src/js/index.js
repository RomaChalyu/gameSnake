let counter = document.createElement('p');
let container = document.querySelector('.container');
counter.innerHTML = '0';
container.appendChild(counter);

let field = document.createElement('div');
field.classList.add('field');
document.body.appendChild(field);

let x = 0;
let y = 9;
for(let i = 0; i < 100; i++){
    x > 9 ? y-- : x;
    x > 9 ? x = 0 :  x;
    let block = document.createElement('div');
    block.classList.add('exel');
    block.setAttribute('posX', x);
    block.setAttribute('posY', y);
    x++;
    field.append(block);
}

let posSnakeX = Math.round(Math.random() * (9 -2) +2); 
let posSnakeY = Math.round(Math.random() * (9 -2) +2);
let exel = document.getElementsByClassName('exel');
let snake = [];
for(let i = 0; i < exel.length; i++){
    if(exel[i].getAttribute('posX') == posSnakeX && exel[i].getAttribute('posY') == posSnakeY ){
        exel[i].classList.add('head');
        exel[i -1].classList.add('black');
        exel[i -2].classList.add('black');
        snake.push(exel[i],exel[i-1],exel[i-2]);
    }
}
let createFood = () => {
    let posFoodX = Math.round(Math.random() * 9); 
    let posFoodY = Math.round(Math.random() * 9);
    for(let i = 0; i < exel.length; i++){
        if(exel[i].getAttribute('posX') == posFoodX && exel[i].getAttribute('posY') == posFoodY){
            if(exel[i].classList.contains('black') || exel[i].classList.contains('head')){
                return createFood();
            }
            let a = Math.round(Math.random() * (5 -1) +1);
                
            if(a ===1){
                exel[i].classList.add('food');
            }
            if(a ===2){
                exel[i].classList.add('food2');
            }
            if(a ===3){
                exel[i].classList.add('food3');
            }
            if(a ===4){
                exel[i].classList.add('food4');
            }
            if(a ===5){
                exel[i].classList.add('food5');
            }
        }
    }
}
createFood();

let direction = 0;
let headX = 0;
let headY = 0;
let Right;
let Up;
let left;
let down;

document.addEventListener('keyup',() => {
     headX = snake[0].getAttribute('posX');
     headY = snake[0].getAttribute('posY');
    if(event.key === 'ArrowDown' && direction !== 'ArrowUp' && direction !== 'ArrowDown'){
        direction = 'ArrowDown';
        down = setInterval(() =>{
            if(direction === 'ArrowDown'){
                ArrowDown();
            }
            else{
                clearInterval(down);
            } 
        },500);
    }
    if(event.key === 'ArrowUp' && direction !== 'ArrowDown' && direction !== 'ArrowUp'){
        direction = 'ArrowUp';
         Up = setInterval(() =>{
             if(direction === 'ArrowUp'){
                 ArrowUp();
             }
             else{
                 clearInterval(Up);
             } 
         },500);
    }
    if(event.key === 'ArrowLeft' && direction !== 'ArrowRight' && direction !== 'ArrowLeft'){
        direction = 'ArrowLeft';
        left = setInterval(() =>{
            if(direction === 'ArrowLeft'){
                ArrowLeft();
            }
            else{
                clearInterval(left);
            } 
        },500);
    }
    if(event.key === 'ArrowRight' && direction !== 'ArrowLeft' && direction !=='ArrowRight'){
        direction = 'ArrowRight';
        Right = setInterval(() =>{
            if(direction === 'ArrowRight'){
                ArrowRight();
            }
            else{
                clearInterval(Right);
            }
            
        },500);
    }
});


function ArrowRight(){
    let header = document.querySelector(`[posx = "${(+headX + 1)}"][posy = "${headY}"]`);
    headX++;
    if(header.classList.contains('black')){
        clearInterval(Right);
        snake[0].classList.add('game-over');
        return;
    }
    move(header,headX); 
    if(header.getAttribute('posX') === '9'){
        clearInterval(Right);
        setTimeout(() =>{
            if(direction === 'ArrowRight'){
                snake[0].classList.add('game-over');
            }
        },500)  
    };
};

function ArrowLeft(){
    let header = document.querySelector(`[posx = "${(+headX - 1)}"][posy = "${headY}"]`);
    headX--;
    if(header.classList.contains('black')){
        clearInterval(left);
        snake[0].classList.add('game-over');
        return;
    }
    move(header,headX);
    if(header.getAttribute('posX') === '0'){
        clearInterval(left);
        setTimeout(() =>{
        if(direction === 'ArrowLeft'){
                snake[0].classList.add('game-over');
            }
        },500);  
    };
};

function ArrowUp(){
    let header = document.querySelector(`[posx = "${(+headX)}"][posy = "${+headY +1}"]`);
    headY++;
    if(header.classList.contains('black')){
        clearInterval(Up);
        snake[0].classList.add('game-over');
        return;
    }
    if(headY === 10){
        clearInterval(Up);
        snake[0].classList.add('game-over');
        return;
    }
    move(header);
    if(header.getAttribute('posY') === '9'){
        clearInterval(Up);
        setTimeout(() =>{
            if(direction === 'ArrowUp'){
                snake[0].classList.add('game-over');
            }
        },500)  
    };
};
function ArrowDown(){
    let header = document.querySelector(`[posx = "${(+headX)}"][posy = "${+headY -1}"]`);
    headY--;
    if(header.classList.contains('black')){
        clearInterval(down);
        snake[0].classList.add('game-over');
        return;
    }
    if(headY === -1){
        clearInterval(down);
        snake[0].classList.add('game-over');
        return;
    }
    move(header);
    if(header.getAttribute('posY') === '0'){
        clearInterval(down);
        setTimeout(() =>{
            if(direction === 'ArrowDown'){
                snake[0].classList.add('game-over');
            }
        },500)  
    };
};

function move (header,headX) {
    if(headX === 10){
        clearInterval(Right);
        snake[0].classList.add('game-over')
        return
    };
    if(headX === -1){
        clearInterval(left);
        snake[0].classList.add('game-over')
        return;
    };

    snake[0].classList.remove('head');
    snake[0].classList.add('black');
    snake[snake.length -1].classList.remove('black');
    let tail = snake.pop();
    header.classList.add('head');
    snake.unshift(header);
    if(header.classList.contains('food') ||
       header.classList.contains('food2') ||
       header.classList.contains('food3') ||
       header.classList.contains('food4') ||
       header.classList.contains('food5')){

        header.classList.remove('food');
        header.classList.remove('food2');
        header.classList.remove('food3');
        header.classList.remove('food4');
        header.classList.remove('food5');
        snake.push(tail);
        counter.innerHTML = +counter.innerHTML +1;
        createFood();
    }
    return;
}

let arr = [0,0];
for(let i = 0; i < 1000; i++){
    let a = Math.random();
    if(a <0.5){
        arr[0] ++; 
    }
    else{
        arr[1]++;
    }
}




