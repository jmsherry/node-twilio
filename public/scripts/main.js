document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('twillio');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('form', form);
    const numberInput = form.querySelector('#phone_number');
    console.log('numberInput', numberInput);
    const messageInput = form.querySelector('#message');
    console.log('messageInput', messageInput);
    const phoneNumber = numberInput.value;
    console.log('phoneNumber', phoneNumber);
    const message = messageInput.value;
    console.log('message', message);

    const body = {
      phoneNumber,
      message
    };
    console.log('body', body);
    fetch('/message', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      }
    })
    .then(resp => {
      if(resp.ok) {
        // console.log('data', data);
      M.toast({html: 'Message sent!', classes: 'success'});
      form.reset();
      } else {
        throw resp;
      }
    })
    .catch(err => {
      console.log(err)
      M.toast({html: err.message, classes: 'error'});
    })
  });
});