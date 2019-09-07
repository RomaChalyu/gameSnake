
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

let posSnakeX = Math.round(2 + Math.random() * (9 + 1 - 2)); 
let posSnakeY = Math.round(2 + Math.random() * (9 + 1 - 2));
let posFoodX = Math.round(Math.random() * (9+1)); 
let posFoodY = Math.round(Math.random() * (9+1));
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
//доработать, убрать переменную temp
let temp = false;
    do {
        posFoodX = Math.round(Math.random() * (9+1));
        posFoodY = Math.round(Math.random() * (9+1));
        for(let i = 0; i < exel.length; i++){
            if(exel[i].getAttribute('posX') == posFoodX && exel[i].getAttribute('posY') == posFoodY){
                temp =  exel[i].classList.contains('black');
                temp === false ? temp = exel[i].classList.contains('head') : temp;
                if(!temp){
                    exel[i].classList.add('food');
                }
            }
        }
    } while (temp);

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
    if(event.key === 'ArrowDown' && direction !== 'ArrowUp'){
        direction = 'ArrowDown';
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
    if(headX === 10){
        clearInterval(Right);
        snake[0].classList.add('game-over')
        return
    } 
     snake[0].classList.remove('head');
      snake[0].classList.add('black');
      snake[snake.length -1].classList.remove('black');
    let tail = snake.pop();
    header.classList.add('head');
    snake.unshift(header);
    if(header.classList.contains('food')){
        header.classList.remove('food');
         snake.push(tail);
    }
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
    if(header.getAttribute('posX') === '0'){
        clearInterval(left);
        if(direction === 'ArrowLeft'){

        }
        setTimeout(() =>{
                snake[0].classList.add('game-over');
        },500)  
    };
     snake[0].classList.remove('head');
      snake[0].classList.add('black');
      snake[snake.length -1].classList.remove('black');
    let tail = snake.pop();
    header.classList.add('head');
    snake.unshift(header);
    if(header.classList.contains('food')){
        header.classList.remove('food');
         snake.push(tail);
    }

};

function ArrowUp(){
    let header = document.querySelector(`[posx = "${(+headX)}"][posy = "${+headY +1}"]`);
    headY++;
    if(headY === 10){
        clearInterval(Up);
        snake[0].classList.add('game-over');
        return;
    }
     snake[0].classList.remove('head');
      snake[0].classList.add('black');
      snake[snake.length -1].classList.remove('black');
    let tail = snake.pop();
    header.classList.add('head');
    snake.unshift(header);
    if(header.classList.contains('food')){
        header.classList.remove('food');
         snake.push(tail);
    }
    if(header.getAttribute('posY') === '9'){
        clearInterval(Up);
        setTimeout(() =>{
            if(direction === 'ArrowUp'){
                snake[0].classList.add('game-over');
            }
        },500)  
    };
};






// let count0 = 0;
// let count1 = 0;
// let count2 = 0;
// let count3 = 0;
// let count4 = 0;
// let count5 = 0;
// let count6 = 0;
// let count7 = 0;
// let count8 = 0;
// let count9 = 0;
// let posFoodXX;
// for(let i = 0; i <1000; i++){
//     posFoodXX = Math.round(2 + Math.random() * (9 + 1 - 2));
//     switch(posFoodXX) {
//         case 0: 
//             count0++;  
//             break;
//         case 1: 
//             count1++;  
//             break;
//         case 2: 
//             count2++;  
//             break;
//         case 3:
//             count3++;  
//             break;
//         case 4:
//             count4++;  
//             break;
//         case 5: 
//             count5++;  
//             break;
//         case 6:
//             count6++;  
//             break;
//         case 7:
//             count7++;  
//             break;
//         case 8:
//             count8++;  
//             break;
//         case 9:
//             count9++;  
//             break;
//     }
// }

// let arr = ['count0: ' +count0,'count1: ' +count1,'count2: ' +count2,'count3: ' +count3,'count4: ' +count4,'count5: ' +count5,'count6: ' +count6,'count7: ' +count7,'count8: ' +count8,'count9: ' +count9];

// console.log(arr);