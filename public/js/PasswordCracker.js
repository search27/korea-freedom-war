let secretNumber = '12345';

let UnLocked = false;
let possibles = [];


const AllString = 'abcdefghijklmnopqrstuvwxyz'.split('');
const specialChar = `!@#$%^&*(){}:"',./<>?~-=_+|`.split('');


const SetPossible = (type) => {
    possibles = [];

    for(let i = 0; i < 10; i++){ possibles.push(String(i)); }
    if(type === '1'){
        // 숫자.

    }else if(type === '2'){
        // 숫자 + 영문자 소
        for(let i = 0; i < AllString.length; i++){
            possibles.push(AllString[i].toLocaleLowerCase());
        }
    }else if(type === '3'){
        // 숫자 + 영문자 소 대
        for(let i = 0; i < AllString.length; i++){
            possibles.push(AllString[i].toLocaleLowerCase());
            possibles.push(AllString[i].toLocaleUpperCase());
        }
    }else if(type === '5'){
        // 숫자 + 영ㅇ문자 소 대 + 특수문자
        for(let i = 0; i < AllString.length; i++){
            possibles.push(AllString[i].toLocaleLowerCase());
            possibles.push(AllString[i].toLocaleUpperCase());
        }
        for(let i = 0; i < specialChar.length; i++){ possibles.push(specialChar[i]); }
    }else{
        // default
        // 숫자 + 영문자 소 대
        for(let i = 0; i < AllString.length; i++){
            possibles.push(AllString[i].toLocaleLowerCase());
            possibles.push(AllString[i].toLocaleUpperCase());
        }
    }
}
SetPossible(3);


const checkInstance = (arr) => {
    const checker = arr.shift();
    if(checker === secretNumber){ 
        UnLocked = true; 
        WhatIsPassword(checker);
    }
    count++;
}
const combineString = (str, i) => { return str + possibles[i]; }

const GetPossibleAll = (arr, str, _init_digits, _digits, inc) => {
    if(isStop) return arr;
    if(UnLocked) return arr;
    if(inc === _digits) return arr;
    else {
        for(let i = 0; i < possibles.length; i++){

            if(isStop) break;
            if(UnLocked) break;

            const nStr = combineString(str, i);

            if(nStr.length >= _init_digits) arr.push(nStr);
            checkInstance(arr);
            GetPossibleAll(arr, nStr, _init_digits, _digits, inc+1);
        }
        return arr;
    }
}


// Find Answer
const WhatIsPassword = (str) => {
    StopClick(str);
}

let isStop = true;
let count = 0;

const FindSecretNumber = (callback) => {

    UnLocked = false;
    isStop = false;
    count = 0;

    const recursive = (init, target) => {

        if(isStop) return;
        if(UnLocked) return console.log('Find');
        else{

            GetPossibleAll([], '', init, target, 0);
            // console.log(`init : ${init}, target : ${target}`);

            InlineWorker(callback,{
                init : init,
                target : target,
                count : count,
            });


            // Finding Password With Recursive Function
            // Increase Digit Number
            InlineWorker(recursive, init+1, target+1);

            // recursive(init+1, target+1);
        }
    }


    // 1자리수부터 자릿수를 늘려가며 찾을 때까지 탐색.
    recursive(0, 1);


    if(UnLocked) console.log('Done');
    else console.log('Not Found');



}



