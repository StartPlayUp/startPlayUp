function GetBonus(selectPoint){
    let test=Object.keys(selectPoint).map((i)=>{
        return selectPoint[i][0]
    })
    const hi=test;
    var sum=0;
    var bonus=0;
    for(var i=0;i<5; i++){
        console.log(hi[i]);
        sum+=hi[i];
    }
    if(sum>=63){
        bonus=[sum,true];
    }
    else{
        bonus=[sum,false];
    }
    return bonus;
}
export default GetBonus;