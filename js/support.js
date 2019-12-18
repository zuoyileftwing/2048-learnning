//根据坐标设置Top的显示位置
function setTopPosition(i,j){
    return 20+i*120;
}

//根据坐标设置Left的显示位置
function setLeftPosition(i,j){
    return 20+j*120;
}

function setBgColor(num){
    switch(num) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ebdfc7";
            break;
        case 8:
            return "#f3b27b";
            break;
        case 16:
            return "#ec8d52";
            break;
        case 32:
            return "#f57c5f";
            break;
        case 64:
            return "#e95738";
            break;
        case 128:
            return "#f4d86d";
            break;
        case 256:
            return "#f0d04a";
            break;
        case 512:
            return "#e4c029";
            break;
        case 1024:
            return "#e2b714";
            break;
        case 2048:
            return "#ebc400";
            break;
        case 4096:
            return "#31ea85";
            break;
        case 8192:
            return "#1f94e8";
            break;
    }
    return "black";
}

function setColor(num){
    if(num<=4){
        return "#776d65";
    }else{
        return "white";
    }
}

//判断面板是否还有空位
function nospace(arr){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(arr[i][j] == 0) return false;
        }
    }
    return true;
}

//判断是否有能向左移动的元素，如有，则返回true
function canMoveLeft(arr){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(arr[i][j] != 0){
                if(arr[i][j-1] == 0 || arr[i][j-1] == arr[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveUp(arr){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(arr[i][j] != 0){
                if(arr[i-1][j] == 0 || arr[i-1][j] == arr[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveRight(arr){
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(arr[i][j] != 0){
                if(arr[i][j+1] == 0 || arr[i][j+1] == arr[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveDown(arr){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(arr[i][j] != 0){
                if(arr[i+1][j] == 0 || arr[i+1][j] == arr[i][j])
                    return true;
            }
        }
    }
    return false;
}

//传参时，同列要从小到大传
function noBlockHorizontal(row,col1,col2,arr){
    while(col1+1<col2){
        if(arr[row][col1+1] == 0){
            col1++;
            continue;
        }else{
            return false;
        }
    }
    return true;
}

//传参时，同行要从小到大传
function noBlockVertical(row1,row2,col,arr){
    while(row1+1<row2){
        if(arr[row1+1][col] == 0){
            row1++;
            continue;
        }else{
            return false;
        }
    }
    return true;
}

function cannotMove(arr){
    if(canMoveLeft(arr) || canMoveUp(arr) || canMoveRight(arr) || canMoveDown(arr))
        return false;
    return true;
}