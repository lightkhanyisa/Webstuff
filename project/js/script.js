const API_KEY="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";
const submit_button = document.querySelector('#submit');
const output = document.querySelector('#output');

const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');


function changeinputs(value){
    const input = document.querySelector('input');
    input.value = value;
}

 async function getmessage(){
    console.log('clicked');
    const options = {
                 method:"POST",
                 headers:{
                    'Authorization':`Bearer ${API_KEY}`,
                    'Content-Type':'application/json'
                 },
                 body:JSON.stringify({
                    model:"gpt-3.5-turbo",
                    messages:[{role:"user",content:inputElement.value}],
                    max_tokens:100
                 })
    };
   
     try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options);
        const data = await response.json()
        console.log(data);
        output.textContent = data.choices[0].message.content;
       
         if(data.choices[0].message.content && inputElement.value){
              const pElement = document.createElement('p');
             pElement.textContent = inputElement.value;
             pElement.addEventListener('click',()=> changeinputs(pElement.textContent));
             historyElement.append(pElement);
            }

     }
     
     catch (error){
        console.error(error);
            
     }
 }

submit_button.addEventListener('click',getmessage);

function clear_inputs (){
     
    inputElement.value="";
}

buttonElement.addEventListener('click',clear_inputs);

