class Greeter {
    greeting:string;
    constructor(message:string){
        this.greeting=message;
    }
    greet(){
        return "Hello,"+this.greeting;
    }
}
let greeter=new Greeter('world');
//引用types/lodash ，进行语法检查
// let button=document.createElement('button');
// button.textContent='say hello';
// button.onclick=function () {
    alert(greeter.greet());
// };
// document.body.appendChild(button);
