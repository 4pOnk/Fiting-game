let canvas  = document.getElementById('canvas');
let w1Msg = document.getElementsByClassName('winner1')[0];
let w2Msg = document.getElementsByClassName('winner2')[0];
let p1Wins = document.getElementById('p1Wins');
let p2Wins = document.getElementById('p2Wins');

let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let winning = 0;

//characteristics
let groundH = 80;
let startIndent = 10;
let gravitation = 7;
let sprExpected = 1;
let crashExpected = 1;
let ultCD = 4;
let trainingDistance = 200;
let beamCD = 2;
let beamCdWait = 3;
let bDead = [false,false,false,false];

let difficult = 0;
let stan = false;

let blocks = [[canvas.width/4 - 250/2,canvas.height - 150 - groundH,250,30],[canvas .width - canvas.width/4 - 250/2,canvas.height - 150 - groundH,250,30]];

let color1 = '#ec7d2f';
let jumpSpeed1 = gravitation;
let speed1 = 8;
let h1 = 50;
let w1 = 50;
let x1 = startIndent;
let y1 = canvas.height - groundH - h1;
let p1ground = groundH;
let jumpHeight1 = gravitation * 50;
let isJumping1 = false;
let spr1 = false;
let spr1Used = 0;
let waiting1 = 0;
let crashUsed1 = 0;
let falling1 = false;
let immortality1 = false;
let ultCD1Count = 0;


let color2 = '#6841a9';
let jumpSpeed2 = gravitation;
let speed2 = 8;
let h2 = 50;
let w2 = 50;
let x2 = canvas.width - w2 - startIndent;
let y2 = canvas.height - groundH - h2;
let p2ground = groundH;
let jumpHeight2 = gravitation * 50;
let isJumping2 = false;
let spr2 = false;
let spr2Used = 0;
let waiting2 = 0;
let crashUsed2 = 0;
let falling2 = false;
let immortality2 = false;
let ultCD2Count = 0;









//drawing

let drawPlayer1 = () => {
    ctx.fillStyle = color1;
    ctx.fillRect(x1,y1,w1,h1);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x1 + 1,y1 + 1,w1 - 2,h1 - 2);
};
let drawPlayer2 = () => {
    ctx.fillStyle = color2;
    ctx.fillRect(x2,y2,w2,h2);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x2 + 1,y2 + 1,w2 - 2,h2 - 2);
};
let drawFloor = () => {
    ctx.fillStyle = '#5d7965';
    ctx.fillRect(0,canvas.height - groundH,canvas.width, groundH);
    ctx.strokeRect(1,canvas.height - groundH + 1,canvas.width - 2, groundH - 2);
};
let drawSun = () => {
    ctx.fillStyle = '#fff85e';
    ctx.beginPath();
    ctx.moveTo(30,30);
    ctx.arc(250,100,70,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
};
let drawBlocks = () =>{
    for(let i = 0; i < blocks.length; i++){
        if(bDead[i]){
            ctx.fillStyle = '#e1ffc3';
        }else {
            ctx.fillStyle = '#88a352';
        }
        ctx.fillRect(blocks[i][0],blocks[i][1],blocks[i][2],blocks[i][3]);
        ctx.strokeRect(blocks[i][0] + 1,blocks[i][1] + 1,blocks[i][2] - 2,blocks[i][3] - 2);
    }
};
let loadingUlt1 = () =>{
    ctx.fillStyle = '#2b130b';
    ctx.beginPath();
    ctx.moveTo(x1 + w1/3 + (w1 - w1/3 * 2) / 2,y1 + w1/3 + (w1 - w1/3 * 2) / 2);
    ctx.arc(x1 + w1/3 + (w1 - w1/3 * 2) / 2,y1 + w1/3 + (w1 - w1/3 * 2) / 2,w1/3,0,Math.PI/180 * waiting1,false);
    ctx.closePath();
    ctx.fill();
};
let loadingUlt2 = () =>{
    ctx.fillStyle = '#1d0b26';
    ctx.beginPath();
    ctx.moveTo(x2 + w2/3 + (w2 - w2/3 * 2) / 2,y2 + w2/3 + (w2 - w2/3 * 2) / 2);
    ctx.arc(x2 + w2/3 + (w2 - w2/3 * 2) / 2,y2 + w2/3 + (w2 - w2/3 * 2) / 2,w2/3,0,Math.PI/180 * waiting2,false);
    ctx.closePath();
    ctx.fill();
};
let drawAll = () =>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawSun();
    if(winning === 2 || winning === 0){
        drawPlayer1();
        drawPlayer2();
    }else if(winning === 1){
        drawPlayer2();
        drawPlayer1();
    }
    loadingUlt1();
    loadingUlt2();

    drawFloor();
    drawBlocks();

};
drawAll();

//moving
let keysDowned = [];
addEventListener('keydown',(key)=>{
    if(keysDowned.indexOf(key.code)===-1){
        keysDowned.push(key.code);
    }
});
addEventListener('keyup',(key)=>{
    if(keysDowned.indexOf(key.code)!==-1){
        keysDowned.splice(keysDowned.indexOf(key.code),1)
    }
});


let gameLoop = ()=> {
    drawAll();
    //winning
    let win1 = ()=>{
        if(!immortality2) {
            ultCD1Count = 360;
            winning = 1;
            w1Msg.style.display = 'block';
            p1Wins.innerHTML = +p1Wins.innerHTML + 1;
            setTimeout(() => {
                w1Msg.style.display = 'none';
            }, 1000);
            x1 = startIndent;
            x2 = canvas.width - w2 - startIndent;
            spr1 = false;
            spr2 = false;
        }
    };
    let win2 = () =>{
        if(!immortality1) {
            ultCD2Count = 360;
            winning = 2;
            w2Msg.style.display = 'block';
            p2Wins.innerHTML = +p2Wins.innerHTML + 1;
            setTimeout(() => {
                w2Msg.style.display = 'none';
            }, 1000);
            x1 = startIndent;
            x2 = canvas.width - w2 - startIndent;
            spr1 = false;
            spr2 = false;
        }
    };
    if(x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 >= y2 && y1 + h1 < y2 + h2) {
        win1();
    }
    if(x2 + w2 > x1 && x2 < x1 + w1 && y2 + h2 >= y1 && y2 + h2 < y1 + h1) {
        win2();
    }


    //movement
    if((keysDowned.indexOf('KeyD') !== -1 || keysDowned.indexOf('Numpad6') !== -1) && (x1 >= x2 + w2 || x1 + w1 <= x2 || y1 + h1 <= y2 || y1 > y2 + h2) && x1 + w1 < canvas.width + 50){
        if(spr1&&spr1Used < sprExpected){
            spr1Used++;
            immortality2 = true;
            immortality1 = true;
            let ultCD1 = setInterval(()=>{
                waiting1++;
                if(++ultCD1Count >= 360){
                    ultCD1Count = 0;
                    spr1Used = 0;
                    waiting1 = 0;
                    clearInterval(ultCD1);
                }
            },ultCD * 1000 /360);
            let ultAnimCount = 0;
            let ultAnim = setInterval(()=>{
                x1 += 5;
                if(++ultAnimCount >= 50){
                    clearInterval(ultAnim);
                    immortality2 = false;
                    immortality1 = false;
                    if(x1 + w1 > x2 && x1 < x2 && y1 + h1 >= y2 && y1 < y2 + h2){
                        x1 = x2 - w1;
                    }else if(x1>=x2 && x1 < x2 + w2 && y1 + h1 >= y2 && y1 < y2 + h2){
                        x1 = x2 + w2
                    }
                }
            },1);

            spr1 = false;
        }
        x1+=speed1;
        if(x1 + w1 > x2 && x1 < x2 && y1 + h1 > y2&& y1 < y2 + h2){
            x1 = x2 - w1;
        }
    }
    if((keysDowned.indexOf('KeyA') !== -1 || keysDowned.indexOf('Numpad4') !== -1) && (x1 >= x2 + w2 || x1 + w1 <= x2 || y1 + h1 <= y2 || y1 > y2 + h2) && x1 > -50){
        if(spr1&&spr1Used < sprExpected){
            spr1Used++;
            immortality2 = true;
            immortality1 = true;
            let ultCD1 = setInterval(()=>{
                waiting1++;
                if(++ultCD1Count >= 360){
                    ultCD1Count = 0;
                    spr1Used = 0;
                    waiting1 = 0;
                    clearInterval(ultCD1);
                }
            },ultCD * 1000 /360);
            let ultAnimCount = 0;
            let ultAnim = setInterval(()=>{
                x1 -= 5;
                if(++ultAnimCount >= 50){
                    clearInterval(ultAnim);
                    immortality2 = false;
                    immortality1 = false;
                    if(x1 + w1 > x2 && x1 < x2 && y1 + h1 >= y2 && y1 < y2 + h2){
                        x1 = x2 - w1;
                    }else if(x1>=x2 && x1 < x2 + w2 && y1 + h1 >= y2 && y1 < y2 + h2){
                        x1 = x2 + w2
                    }
                }
            },1);

            spr1 = false;
        }
        x1-=speed1;
        if(x1 < x2 + w2 && x1 > x2 &&  y1 + h1 > y2&& y1 < y2 + h2){
            x1 = x2 + w2;
        }
    }
    if((keysDowned.indexOf('KeyW') !== -1 || keysDowned.indexOf('Numpad8') !== -1) && y1 >= canvas.height - p1ground - h1){
        let p1grDef = p1ground;
        let jumpAnim = setInterval(() => {
            isJumping1 = true;
            y1 -= jumpSpeed1 / 3;
            if (y1 <= canvas.height - jumpHeight1 - p1grDef) {
                falling1 = true;
                isJumping1 = false;
                clearInterval(jumpAnim);
            }
        },1)
    }
    if(keysDowned.indexOf('KeyS') !== -1 || keysDowned.indexOf('Numpad5') !== -1){
        if(spr1Used < sprExpected) {
            spr1 = true;
        }
    }
    if(keysDowned.indexOf('Space') !== -1 || keysDowned.indexOf('Numpad0') !== -1){
        if(y1 + h1 <= canvas.height - p1ground && crashUsed1 <= crashExpected && falling1){
            let crash1Anim = setInterval(()=>{
                p1ground = groundH;
                if(y1 + h1 <= canvas.height - p1ground && !isJumping1) {
                    y1++;
                    if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 >= y2 && y1 + h1 <= y2 + h2) {
                        win1()
                    }
                }else clearInterval(crash1Anim)
            },2);
        }
    }


    if((x1 > x2 + w2 + trainingDistance || (x1 + w1 > x2 + w2/6 && x1 + w1 < x2 + w2/2 && y2 > y1) || (y2 < y1 && x2 + w2 <= x1 + w1/2 && (isJumping2 || falling2))) && !stan){
        if(spr2&&spr2Used < sprExpected){
            spr2Used++;
            immortality2 = true;
            immortality1 = true;
            let ultCD2 = setInterval(()=>{
                waiting2++;
                if(++ultCD2Count >= 360){
                    ultCD2Count = 0;
                    spr2Used = 0;
                    waiting2 = 0;
                    clearInterval(ultCD2);
                }
            },ultCD * 1000 /360);
            let ultAnimCount = 0;
            let ultAnim = setInterval(()=>{
                x2 += 5;
                if(++ultAnimCount >= 50){
                    clearInterval(ultAnim);
                    immortality2 = false;
                    immortality1 = false;
                    if(x2 + w2 > x1 && x2 < x1 && y2 + h2 >= y1 && y2 < y1 + h1){
                        x2 = x1 - w2;
                    }else if(x2 >= x1 && x2 < x1 + w1 && y2 + h2 >= y1 && y2 < y1 + h1){
                        x2 = x1 + w1;
                    }
                }
            },1);

            spr2 = false;
        }
        x2+=speed2;
        if(x2 + w2 > x1 && x2 < x1 && y2 + h2 > y1 - gravitation && y2 < y1 + h1){
            x2 = x1 - w1;
        }
    }
    if((x2 + w2 > x1 + w1 + trainingDistance || (x1 < x2 + w2 - w2/6 && x1 > x2 + w2/2 && y1 < y2) || (y2 < y1 && x2 >= x1 + w1/2) && (isJumping2 || falling2)) && !stan){
        if(spr2&&spr2Used < sprExpected){
            spr2Used++;
            immortality2 = true;
            immortality1 = true;
            let ultCD2 = setInterval(()=>{
                waiting2++;
                if(++ultCD2Count >= 360){
                    ultCD2Count = 0;
                    spr2Used = 0;
                    waiting2 = 0;
                    clearInterval(ultCD2);
                }
            },ultCD * 1000 /360);
            let ultAnimCount = 0;
            let ultAnim = setInterval(()=>{
                x2 -= 5;
                if(++ultAnimCount >= 50){
                    clearInterval(ultAnim);
                    immortality2 = false;
                    immortality1 = false;
                    if(x2 + w2 > x1 && x2 < x1 && y2 + h2 >= y1 && y2 < y1 + h1){
                        x2 = x1 - w2;
                    }else if(x2 >= x1 && x2 < x1 + w1 && y2 + h2 >= y1 && y2 < y1 + h1){
                        x2 = x1 + w1;
                    }
                }
            },1);

            spr2 = false;
        }
        x2-=speed2;
        if(x2 < x1 + w1 && x2 > x1 &&  y2 + h2 > y1 - gravitation && y2 < y1 + h1){
            x2 = x1 + w1;
        }
    }
   if((x2 + w2 >= x1 - trainingDistance && x2 <= x1 + w1 + trainingDistance || y2 > y1) && !isJumping2 && !falling2){
        let p2grDef = p2ground;
            let jumpAnim2 = setInterval(() => {
                isJumping2 = true;
                y2 -= jumpSpeed2 / 3;
                if (y2 <= canvas.height - jumpHeight2 - p2grDef) {
                    falling2 = true;
                    isJumping2 = false;
                    clearInterval(jumpAnim2);
                }
            }, 1)
    }
    if((x1 < x2 + w2 && x1 > x2 + w2/2 && y1 < y2) || (x1 + w1 > x2 && x1 + w1 < x2 + w2/2 && y2 > y1)){
        if(spr2Used < sprExpected) {
            spr2 = true;
        }
    }
    if(y2 < y1 && x2 + w2 >= x1 + w1 && x2 < x1 + w1/2){
        stan = true;
        setTimeout(()=>{
            if(y2 + h2 < canvas.height - p2ground && crashUsed2 < crashExpected && falling2){
                let crash2Anim = setInterval(()=>{
                    p2ground = groundH;
                    if(y2 + h2 < canvas.height - p2ground && !isJumping2) {
                        y2++;
                        if (x2 + w2 > x1 && x2 < x1 + w1 && y2 + h2 >= y1 && y2 + h2 <= y1 + h1) {
                            win2()
                        }
                    }else clearInterval(crash2Anim)
                },2);
            }
            stan = false;
        },100);
    }


    //gravitation
    if(!isJumping1 && (y1 + h1) !== canvas.height - p1ground){
        y1+= gravitation;
    }
    if((y1 + h1) >= canvas.height - p1ground){
        y1 = canvas.height - p1ground - h1;
    }

    if(!isJumping2 && (y2 + h2) !== canvas.height - p2ground){
        y2+= gravitation;
    }
    if((y2 + h2) >= canvas.height - p2ground){
        y2 = canvas.height - p2ground - h2;
    }
    if((y1 + h1) === canvas.height - p1ground){
        falling1 = false;
    }
    if((y2 + h2) === canvas.height - p2ground){
        falling2 = false;
    }


    //ground
    let onPlatform1 = 0;
    for(let i = 0; i < blocks.length; i++){
        if(x1 + w1 >= blocks[i][0] && x1 < blocks[i][0] + blocks[i][2] && y1 + h1 <= blocks[i][1]){
            if (!bDead[i]) {
                onPlatform1++;
                p1ground = canvas.height - blocks[i][1];
                if(!bDead[i+2]) {
                    bDead[i + 2] = true;
                    setTimeout(() => {
                        if(x1 + w1 >= blocks[i][0] && x1 < blocks[i][0] + blocks[i][2] && y1 + h1 <= blocks[i][1]) {
                            p1ground = groundH;
                        }
                        bDead[i + 2] = false;
                        bDead[i] = true;
                        setTimeout(()=>{
                            bDead[i] = false;
                        },beamCdWait * 1000)
                    }, beamCD * 1000)
                }
            }
        }
    }
    if(onPlatform1 === 0){
        p1ground = groundH;
    }

    let onPlatform2 = 0;
    for(let i = 0; i < blocks.length; i++){
        if(x2 + w2 >= blocks[i][0] && x2 < blocks[i][0] + blocks[i][2] && y2 + h2 <= blocks[i][1]){
            if (!bDead[i]) {
                onPlatform2++;
                p2ground = canvas.height - blocks[i][1];
                if(!bDead[i+2]) {
                    bDead[i + 2] = true;
                    setTimeout(() => {
                        if(x2 + w2 >= blocks[i][0] && x2 < blocks[i][0] + blocks[i][2] && y2 + h2 <= blocks[i][1]) {
                            p2ground = groundH;
                        }
                        bDead[i + 2] = false;
                        bDead[i] = true;
                        setTimeout(()=>{
                            bDead[i] = false;
                        },beamCdWait * 1000)
                    }, beamCD * 1000)
                }
            }
        }
    }
    if(onPlatform2 === 0){
        p2ground = groundH;
    }


    requestAnimationFrame(gameLoop)
};
gameLoop();