class person{
    constructor(){

    }
     hey(){
        console.log('asd')
    }
   static  hi=()=>{
    this.hey()
        console.log('a')
    }
}
const a=new person()
person.hi()