const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(array){
        this.field = array;
    }
    print(){
        for (let i=0; i<this.field.length; i++){
            let str='';
            for (let j=0; j<this.field[i].length; j++){
                str+=this.field[i][j];
            }
            console.log(str);
        }
        
    }
    static generateField(height,width,percentage){
        let twoD=[];
        let oneD=[];
        // creating a 2D array of field characters.
                for (let i =0; i<height; i++){
                    oneD = [];
                    for(let j=0; j<width; j++){
                        oneD.push(fieldCharacter); 
                    }
                    twoD.push(oneD);
                }
                    
        
        let noOfHoles = height*width*(percentage/100);
        // creating randomized holes in all fields
        while(noOfHoles!=0){
        let row = Math.floor(Math.random(0,1)*height);
        let column = Math.floor(Math.random(0,1)*width);
        twoD[row][column]=hole;
        noOfHoles=noOfHoles-1;
        }
        // place the hat in the field.
        let r = Math.floor(Math.random(0,1)*height);
        let c = Math.floor(Math.random(0,1)*width);
        twoD[r][c]=hat;
        twoD[0][0]=pathCharacter; 
        return twoD;
        
    }
};
// Global variables
let newField ;
let status='';
let ary =[];
let r=0;c=0;
let level='';
/*
new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter],
  ]);
*/

function moveright(){
    if(c<newField.field[0].length){
        if (newField.field[r][c+1] === hole){
            console.log("Sorry! Good luck next time"); status='lost';return;
        }else if (newField.field[r][c+1] === hat){
            console.log("You Won Congratulations!");status='won';return;
        }
        else{
            newField.field[r][c+1]=pathCharacter;
            c=c+1;
            return;
        }
    }
    else{
        console.log("Oops! You crossed the field");
        status='lost';
        return;
    }
}

function moveleft(){
    if(c>0){
        if (newField.field[r][c-1] === hole){
            console.log("Sorry! Good luck next time"); status='lost';return;
        }else if (newField.field[r][c-1] === hat){
            console.log("You Won Congratulations!");status='won';return;
        }
        else{
            newField.field[r][c-1]=pathCharacter;
            c=c-1;
            return;
        }
    }
    else{
        console.log("Oops! You crossed the field");
        status='lost';
        return;
    }
}

function movedown(){
    if(r<newField.field.length){
        if (newField.field[r+1][c] === hole){
            console.log("Sorry! Good luck next time"); status='lost'; return;
        }else if (newField.field[r+1][c] === hat){
            console.log("You Won Congratulations!");status='won';return;
        }
        else{
            newField.field[r+1][c]=pathCharacter;
            r=r+1;
            return;
        }
    }
    else{
        console.log("Oops! You crossed the field");
        status='lost';
        return;
    }
}
function moveup(){
    if(r>0){
        if (newField.field[r-1][c] === hole){
            console.log("Sorry! Good luck next time"); status='lost'; return;
        }else if (newField.field[r-1][c] === hat){
            console.log("You Won Congratulations!");status='won';return;
        }
        else{
            newField.field[r-1][c]=pathCharacter;
            r=r-1;
            return;
        }
    }
    else{
        console.log("Oops! You crossed the field");
        status='lost';
        return;
    }
}

function playGame(){
    console.log ("Type: r => move right  d => move down  l => move left  u => move up");
    const num = prompt('Which way? ');
    console.log();
    // this can be r d U(out of bound instruction) D (sorry you feel down)
    if (num === 'U'){
        console.log("out of bound instruction");
        status='lost';return;
    }if(num === 'D'){
        console.log("Sorry you feel down");
        status='lost';return;
    }if (num === 'd'){
        movedown();
    }if (num === 'r'){
        moveright();
    }if (num === 'l'){
        moveleft();
    }if (num === 'u'){
        moveup();
    }
}
// function to select the level
function selectLevel(){
    console.log("Select level: Tough(T) Medium(M) Easy(E)");
    level = prompt("Your option? ");
    if(level=='T'){
        ary=Field.generateField(30,10,30);
        newField =new Field(ary);
        return;
    }if(level=='M'){
        ary=Field.generateField(30,10,20);
        newField =new Field(ary);
        return;
    }if(level=='E'){
        ary=Field.generateField(30,10,10);
        newField =new Field(ary);
        return;
    }if(level!='T'||level!='E'||level!='M'){
        console.log("Select Valid options");
    }
}
selectLevel();
while(status!='won' && status !='lost'){   
    if(level=='T'||level=='M'||level=='E'){
        newField.print()
        playGame();
    }
} // while ends here
