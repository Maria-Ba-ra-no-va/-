const modalBg = document.querySelector('.modal-background');

//открытие модального окна

document.querySelector('.open-modal').addEventListener('click', (event) => {
    event.preventDefault();
    modalBg.style.display = "flex";
})

let inputs = document.querySelectorAll('input , select');
let form = document.querySelector('form');
let valid = true;

//функция очистки формы и закрытия модального окна

function clean() {
    inputs.forEach((el) => {
        el.value = null;
    })
    modalBg.style.display = "none";
}

//валидация формы

form.addEventListener('submit', (event) => {
    inputs.forEach((el) => {
        if (el.value.length === 0) {
            valid = false;
        }
    })
    if (valid === false) {
        event.preventDefault();
        alert("Форма не отправилась");
    } else {
        clean();
        alert("Форма отправлена");
    }
})

//закрытия модального окна по нажатию на "Отменить"
document.querySelector('.form__btn-transparent').addEventListener("click", function () {
    clean();
});

// закрытие модального окна по нажатию на зону вне окна, т.е. на фон
modalBg.addEventListener("click", function (event) {
    if (event.target === modalBg) {
        clean();
    }
});

