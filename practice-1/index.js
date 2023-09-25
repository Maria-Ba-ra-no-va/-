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

//маска на номера телефона

var eventCalllback = function (e) {
    var el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7 ___ ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
}
var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
    }
}

//загрузка аватара

const upload = document.querySelector('.input-image__input');
const result = document.getElementById('input-image__result');
const inputImageDiv = document.querySelector('.form__input-image');
const inputImageSvg = document.querySelector('.form__input-image svg');
const inputImageSpan = document.querySelector('.form__input-image span');
inputImageDiv.classList.add('form__input-image-bg');

upload.addEventListener("change", (e) => {
    console.log(e.target);
    previewFunc(e.target.files[0]);
});

function previewFunc(file) {
    if (!file.name.match('\.jpeg') && !file.name.match('\.png')) return false;
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        result.innerHTML = '';
        result.append(img);
    });
    reader.readAsDataURL(file);
    result.classList.add('input-image__result-image');
    upload.style.display = 'none';
    inputImageSvg.style.display = 'none';
    inputImageSpan.style.display = 'none';
    inputImageDiv.classList.remove('form__input-image-bg');
}

document.querySelector('.close').addEventListener('click', (e) => {
    e.preventDefault();
    result.innerHTML = '';
    result.classList.remove('input-image__result-image');;
    upload.style.display = 'flex';
    inputImageSvg.style.display = 'flex';
    inputImageSpan.style.display = 'flex';
    inputImageDiv.classList.add('form__input-image-bg');
})

