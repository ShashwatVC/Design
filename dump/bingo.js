const person = {
    name : 'max',
    age:20,
    greet() {
        console.log('hellow '+this.name);
    }
};


const printname = ({ name }) =>{
  console.log(name);
}
printname(person);

const {name,age} = person;;
console.log(name,age);

const hobbs = ['walls', 'zuck', 'cooking'];
const [h1,h2] = hobbs;
console.log(h1,h2);

/*
const carray = {...person};
console.log(carray);
console.log(hobbs.map(hobby=> 'hobby: '+ hobby));
console.log(hobbs);
hobbs.push('littman');
console.log(hobbs);
const chobbies = [...hobbs];
console.log(chobbies);


const toarray = (...args) => {
  return args;

}
console.log(toarray(1,2,3,4));
*/