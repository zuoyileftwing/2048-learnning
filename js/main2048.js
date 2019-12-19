var boardNums = new Array();
var score = 0;
var hasConflicted = new Array();

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function(){
    //初始化游戏
    newGame();
    //给newgame按钮添加事件
    document.getElementById("newgame").addEventListener("click",newGame);
    //$("#newgame").click(newGame);
    stopPageMove();
});

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:
            if( moveLeft()){
                setTimeout(generateRandomNum,200);
            }
                isGameOver();
            break;
        case 38:
            if( moveUp()){
                setTimeout(generateRandomNum,200);
            }
                isGameOver();
            break;
        case 39:
            if( moveRight()){
                setTimeout(generateRandomNum,200);
            }
                isGameOver();
            break;
        case 40:
            if( moveDown()){
                setTimeout(generateRandomNum,200);
            }
                isGameOver();
            break;
        default:
            break;
    }
});

document.addEventListener('touchstart',function(event){
   startX = event.touches[0].pageX;
   startY = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
   endX = event.changedTouches[0].pageX;
   endY = event.changedTouches[0].pageY;

   var deltaX = endX - startX;
   var deltaY = endY - startY;

   if(Math.abs(deltaX)<0.1*screenX && Math.abs(deltaY) < 0.1*screenY)
       return;

   if(Math.abs(deltaX) >= Math.abs(deltaY)){
       if(deltaX >=0){
           if( moveRight()){
               setTimeout(generateRandomNum,200);
           }
           isGameOver();
            }else {
           if (moveLeft()) {
               setTimeout(generateRandomNum, 200);
           }
           isGameOver();
            }
       } else{
           if(deltaY >=0){
               if( moveDown()){
                   setTimeout(generateRandomNum,200);
               }
               isGameOver();
           }else{
               if( moveUp()){
                   setTimeout(generateRandomNum,200);
               }
               isGameOver();
           }
        }
});

document.addEventListener('touchmove',function(event){
    event.preventDefault();
});

function newGame(){
    //init board
    init();

    //更新界面
    updateNumberView();

    //设置初始随机数
    generateRandomNum();
    generateRandomNum();
}
//根据当前数组数据更新界面
function updateNumberView(){
    //清空当前的所有显示样式
    $(".numbercell").remove();
    //重新遍历添加一个数据显示层
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid").append("<div class='numbercell' id=number-cell-"+i+"-"+j+"></div>");
            var numbercell = $("#number-cell-"+i+"-"+j);
            //数值为0时的处理
            if(boardNums[i][j] == 0){
                numbercell.css("width",0);
                numbercell.css("height",0);
                numbercell.css("top",setTopPosition(i,j)+50);
                numbercell.css("left",setLeftPosition(i,j)+50);
            }else{
                //数据不为0时的处理
                numbercell.css("width",100);
                numbercell.css("height",100);
                numbercell.css("top",setTopPosition(i,j));
                numbercell.css("left",setLeftPosition(i,j));
                numbercell.css("background-color",setBgColor(boardNums[i][j]));
                numbercell.css("color",setColor(boardNums[i][j]));
                numbercell.text(boardNums[i][j]);
            }
            //每次更新显示面板，都要重置冲突数组，以便下一次使用
            hasConflicted[i][j]=false;
        }
    }
}

function updateScoreView(){
    var scoreView = $("#score");
    scoreView.text(score);
}

//初始化面板，绘制固定的面板底层样式
function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridcell = $("#grid-cell-"+i+"-"+j);
            gridcell.css("top",setTopPosition(i,j));
            gridcell.css("left",setLeftPosition(i,j));
        }
    }

    //init number-arrays
    for(var i=0;i<4;i++){
        boardNums[i]=new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            boardNums[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }

    score=0;
}

//在随机位置生成随机数
function generateRandomNum(){
    //判断是否还有空位可以生成随机数
    if(nospace(boardNums)) return false;
    //如果生成的位置有重复，重新生成
    var times=0;
    do {
        var randomX = parseInt(Math.floor(Math.random() * 4));
        var randomY = parseInt(Math.floor(Math.random() * 4));
        if(boardNums[randomX][randomY] == 0) break;
        times++;
    }while( times <50);

    if(times == 50){
        for(var i =0;i<4;i++){
            for(var j=0;j<4;j++){
                if(boardNums[i][j] ==0){
                    randomX=i;
                    randomY=j;
                    break;
                }
            }
        }
    }
    var randomNum = Math.random() <0.5 ? 2 : 4;

    boardNums[randomX][randomY] = randomNum;
    showAnimationNum(randomX,randomY,randomNum);
}

function moveLeft(){
    if(!canMoveLeft(boardNums))
        return false;

    for(var i =0;i<4;i++){
        for(var j =1;j<4;j++){
            if(boardNums[i][j] != 0){
                for(var k=0;k<j;k++){
                    if(boardNums[i][k] ==0 && noBlockHorizontal(i,k,j,boardNums)){
                        //move
                        moveNumAnimation(i,j,i,k);
                        boardNums[i][k] = boardNums[i][j];
                        boardNums[i][j]=0;
                        continue;
                    }else if(boardNums[i][k] == boardNums[i][j] && noBlockHorizontal(i,k,j,boardNums) && !hasConflicted[i][k]){
                        //move
                        moveNumAnimation(i,j,i,k);
                        boardNums[i][k] += boardNums[i][j];
                        boardNums[i][j]=0;
                        hasConflicted[i][k]=true;
                        score += boardNums[i][k];
                        updateScoreView();
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateNumberView,200);
    return true;
}

function moveUp(){
    if(!canMoveUp(boardNums))
        return false;

    for(var i =1;i<4;i++){
        for(var j =0;j<4;j++){
            if(boardNums[i][j] != 0){
                for(var k=0;k<i;k++){
                    if(boardNums[k][j] ==0 && noBlockVertical(k,i,j,boardNums)){
                        //move
                        moveNumAnimation(i,j,k,j);
                        boardNums[k][j] = boardNums[i][j];
                        boardNums[i][j]=0;
                        continue;
                    }else if(boardNums[k][j] == boardNums[i][j] && noBlockVertical(k,i,j,boardNums) && !hasConflicted[k][j]){
                        //move
                        moveNumAnimation(i,j,k,j);
                        boardNums[k][j] += boardNums[i][j];
                        boardNums[i][j]=0;
                        hasConflicted[k][j]=true;
                        score += boardNums[k][j];
                        updateScoreView();
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateNumberView,200);
    return true;
}

function moveRight(){
    if(!canMoveRight(boardNums))
        return false;

    //坐标需要从大到小遍历，这样下面的元素会先移动，然后给上面的元素腾地方
    for(var i =0;i<4;i++){
        for(var j =2;j>=0;j--){
            if(boardNums[i][j] != 0){
                for(var k=3;k>j;k--){
                    //此处k>j，所以传参需要按照j到k的顺序来传
                    if(boardNums[i][k] ==0 && noBlockHorizontal(i,j,k,boardNums)){
                        //move
                        moveNumAnimation(i,j,i,k);
                        boardNums[i][k] = boardNums[i][j];
                        boardNums[i][j]=0;
                        continue;
                    }else if(boardNums[i][k] == boardNums[i][j] && noBlockHorizontal(i,j,k,boardNums) && !hasConflicted[i][k]){
                        //move
                        moveNumAnimation(i,j,i,k);
                        boardNums[i][k] += boardNums[i][j];
                        boardNums[i][j]=0;
                        hasConflicted[i][k]=true;
                        score += boardNums[i][k];
                        updateScoreView();
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateNumberView,200);
    return true;
}

function moveDown(){
    if(!canMoveDown(boardNums))
        return false;

//坐标需要从大到小遍历，这样下面的元素会先移动，然后给上面的元素腾地方
    for(var i =2;i>=0;i--){
        for(var j =0;j<4;j++){
            if(boardNums[i][j] != 0){
                for(var k=3;k>i;k--){
                    if(boardNums[k][j] ==0 && noBlockVertical(i,k,j,boardNums)){
                        //move
                        moveNumAnimation(i,j,k,j);
                        boardNums[k][j] = boardNums[i][j];
                        boardNums[i][j]=0;
                        continue;
                    }else if(boardNums[k][j] == boardNums[i][j] && noBlockVertical(i,k,j,boardNums) && !hasConflicted[k][j]){
                        //move
                        moveNumAnimation();
                        boardNums[k][j] += boardNums[i][j];
                        boardNums[i][j]=0;
                        hasConflicted[k][j]=true;
                        score += boardNums[k][j];
                        updateScoreView();
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateNumberView,200);
    return true;
}

function isGameOver(){
    if(nospace(boardNums) && cannotMove(boardNums))
        alert("Game Over");
}