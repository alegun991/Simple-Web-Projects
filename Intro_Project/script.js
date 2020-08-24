const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {

    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;

}

function showSuccess(input) {

    const formControl = input.parentElement;
    formControl.className = 'form-control success';


}

function checkEmail(input){

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){

        showSuccess(input);
    }

    else{

        showError(input, `${getFieldName(input)} is not valid`);
    }


}

function getFieldName(input){

    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function chechRequired(inputArr){

    inputArr.forEach(element => {
        
        if(element.value.trim() === ''){

            showError(element, `${getFieldName(element)} is required`);
        }

        else {
            
            showSuccess(element);
        }
    });


}

function checkLength(input, min, max){

    if(input.value.length < min){

        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    }

    else if (input.value.length > max){

        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }

    else{

        showSuccess(input);
    }
}

function checkMatchingPasswords(input1, input2){

    if(input1.value !== input2.value){

        showError(input2, 'Passwords do not match');
    }

}

form.addEventListener('submit', function(e) {

    e.preventDefault();

    chechRequired([userName, email, password, password2]);
    checkEmail(email);
    checkLength(userName, 3, 15);
    checkLength(password, 6, 20);
    checkLength(password2, 6, 20);
    checkMatchingPasswords(password, password2);
    

});
