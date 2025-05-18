const container = document.querySelector('.container')
const registerBtn = document.querySelector('.register-btn')
const LoginBtn = document.querySelector('.login-btn')

registerBtn.addEventListener('click', () => {
    /* Se añade el "active" para diferenciar cuando es que la pantalla
    mostrara el registro o el login, en este caso se muestra el register */
    container.classList.add('activate');
})

LoginBtn.addEventListener('click', () => {
    /* Entonces con esta parte se regrasa al login, eliminando el "active" */ 
    container.classList.remove('activate');
    
})

