function showAnimationNum(i,j,num){
    var numcell = $("#number-cell-"+i+"-"+j);
    numcell.css("background",setBgColor(num));
    numcell.css("color",setColor(num));
    numcell.text(num);

    numcell.animate({
        width:"100px",
        height:"100px",
        top:setTopPosition(i,j),
        left:setLeftPosition(i,j)
    },100);
}

function moveNumAnimation(fromX,fromY,toX,toY){
    var numcell = $("#number-cell-"+fromX+"-"+fromY);
    numcell.animate({
        top:setTopPosition(toX,toY),
        left:setLeftPosition(toX,toY),
    },200);
}