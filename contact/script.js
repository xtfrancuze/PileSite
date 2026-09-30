const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');     
    burgerMenu.classList.toggle('open'); 
});

const navigationLink = document.getElementById('navigationLinkes');
        const linkes = navigationLink.querySelectorAll('a');
        const path = document.location.pathname;
        linkes.forEach((link) => {
            console.log(link.pathname === path)
            if (link.pathname === path) {
                link.classList.add('active_btn');
            } else {
                link.classList.remove('active_btn');
            }
        })



const buttonSubmit = document.querySelector('.contactus-button__submit');
const number = document.getElementById('inputNumber');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const messageUser = document.getElementById('messageUser');

const blockTime = 10 * 60 * 1000;

function checkBlockStatus() {
    const blockedUntil = localStorage.getItem('s13_seccions_v1');

    if (!blockedUntil) return false;

    if (Date.now() < parseInt(blockedUntil)) {
        buttonSubmit.disabled = true;

    const timeLeft = parseInt(blockedUntil) - Date.now();
    setTimeout(() => {
        localStorage.removeItem('s13_seccions_v1');
        buttonSubmit.disabled = false;
    }, timeLeft)
        return true;
    }
    localStorage.removeItem('s13_seccions_v1');
    buttonSubmit.disabled = false;
    return false;
};
checkBlockStatus();

number.addEventListener('input', () => {
    const value = number.value.trim();
    const isValid = value.startsWith('+7') || value.startsWith('8');
    number.classList.toggle('error-border', !isValid);
});



let userCallback = {
    nameUser: '',
    emailUser: '',
    phoneUser: '',
    messageUser: '',
};

function validateData() {
    const name = document.getElementById('inputName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const message = document.getElementById('messageUser').value.trim();
    const phone = number.value.trim();
    if (name === '' || email === '' || message === '' || phone === '') {
        return false;
    }

    userCallback = {
        nameUser: name,
        emailUser: email,
        phoneUser: phone,
        messageUser: message
    };
    return true;
}

buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const isValid = validateData();
    const isSpammer = checkBlockStatus();
    
    [inputEmail, inputName, messageUser, number].forEach((x) => {
        if (x.value.trim() === '') {
            x.classList.toggle('error-border');
        }
    })

    if (isSpammer) {
        Toastify({
            text: "Вы уже отправляли форму ранее, подождите пожалуйста.",
            duration: 3500,             // Сколько миллисекунд показывать (3.5 сек)
            gravity: "bottom",             // "top" (сверху) или "bottom" (снизу)
            position: "right",          // "left", "center", "right"
            close: true,                // Добавить крестик для закрытия
            stopOnFocus: true,          // Пауза таймера при наведении мыши
            style: {
                background: "#ef4444",   // Красный цвет (ошибка)
                color: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }
        }).showToast();
        console.log("123123123213")
        return;
    } 

    if (!isValid) {
            Toastify({
            text: "Заполните все поля ввода!",
            duration: 3500,             // Сколько миллисекунд показывать (3.5 сек)
            gravity: "bottom",             // "top" (сверху) или "bottom" (снизу)
            position: "right",          // "left", "center", "right"
            close: true,                // Добавить крестик для закрытия
            stopOnFocus: true,          // Пауза таймера при наведении мыши
            style: {
                background: "#ef4444",   // Красный цвет (ошибка)
                color: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }
        }).showToast();
            return;
        } else {
            Toastify({
            text: `Благодарим! Наш менеджер свяжется с вами в ближайшее время.`,
            duration: 5000,
            gravity: "bottom",
            position: "right",
            close: true,
            style: {
                background: "#067a54ff",   // Зеленый цвет (успех)
                color: "#ffffff",
                borderRadius: "8px"
            }
        }).showToast();


        [inputEmail, inputName, number, messageUser].forEach((x) => x.value = '');
        const tenMinutesLater = Date.now() + 600000;
        localStorage.setItem('s13_seccions_v1', tenMinutesLater);
    }
});
