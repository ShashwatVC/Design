const fetch = () =>{
    const promise = new Promise((resolve,reject) =>{
        setTimeout(()=>{
            resolve('done');
        },2000);

    });
    return promise; 
    
}


setTimeout(() => {
    console.log('timer is don');
    fetch()
    .then(text => {
        console.log(text);
        return fetch();
    })
    .then(text2=>{
        console.log(text2);
    });
},2000); 

console.log('hello');