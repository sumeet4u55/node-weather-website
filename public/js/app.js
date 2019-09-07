console.log('Loading!!!!!');





const form = document.querySelector('form');
const searchValue = document.querySelector('input');

const msg1 = document.getElementById('message-1');
const msg2 = document.getElementById('message-2');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    msg1.innerHTML = '';
    msg2.innerHTML = 'Loading!!!!!'
    const location = searchValue.value;
    console.log('Clicked Submit!!', location);

    let url = `/weather?address=${location}`;
    fetch(url).then((response)=>{
        response.json().then((data)=>{

            if(data.message){
                msg1.innerHTML = data.message;
                msg2.innerHTML = '';
            } else {
                msg2.innerHTML = data.forecast;
                msg1.innerHTML = data.place;
            }
        });
    });
});