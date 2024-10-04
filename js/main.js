// Slider
var swiper = new Swiper(".headerSwiper", {
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
});


// Анимация промо
document.addEventListener('DOMContentLoaded', function () {
    const titleElement = document.querySelector('.game__title');
    let timeoutId;

    function checkVisibility() {
        const rect = titleElement.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    titleElement.classList.add('rotating');
                }, 3000);
            }
        } else {
            clearTimeout(timeoutId);
            timeoutId = null;
            titleElement.classList.remove('rotating');
        }
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Проверка видимости при загрузке
});

//Валидация формы
document.getElementById('gameForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const screenshot = document.getElementById('screenshot').files[0];
    const agreement = document.getElementById('agreement').checked;

    let errors = [];
    const fileNameDisplay = document.getElementById('file-name');
    fileNameDisplay.classList.remove('file-name-error');

    // Сброс ошибок
    nameInput.classList.remove('input-error');
    emailInput.classList.remove('input-error');

    if (nameInput.value.trim() === '') {
        errors.push('Введите имя.');
        nameInput.classList.add('input-error');
    } else if (!/^[a-zA-Zа-яА-ЯёЁ]{3,}$/.test(nameInput.value.trim())) {
        errors.push('Имя должно содержать минимум 3 буквы и состоять только из русских или английских букв.');
        nameInput.classList.add('input-error');
    }

    if (emailInput.value.trim() === '') {
        errors.push('Введите e-mail.');
        emailInput.classList.add('input-error');
    } else if (!validateEmail(emailInput.value.trim())) {
        errors.push('Введите корректный e-mail.');
        emailInput.classList.add('input-error');
    }

    if (!screenshot) {
        errors.push('Прикрепите файл.');
    } else {
        const validExtensions = ['png', 'jpg', 'jpeg', 'pdf'];
        const fileExtension = screenshot.name.split('.').pop().toLowerCase();
        const fileSizeMB = screenshot.size / (1024 * 1024); // Размер в MB

        if (!validExtensions.includes(fileExtension)) {
            errors.push('Неверный формат файла.');
        }

        if (fileSizeMB > 1) {
            errors.push('Размер файла не должен превышать 1MB.');
            fileNameDisplay.classList.add('file-name-error');
        }
    }

    if (!agreement) {
        errors.push('Вы должны согласиться на обработку персональных данных.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
    } else {
        alert('Форма успешно отправлена!');
        // Здесь можно добавить код для отправки данных на сервер
    }
});

document.getElementById('screenshot').addEventListener('change', function () {
    const fileNameDisplay = document.getElementById('file-name');
    const file = this.files[0];

    fileNameDisplay.classList.remove('file-name-error');

    if (file) {
        fileNameDisplay.textContent = `Файл: ${file.name}`;
        const fileSizeMB = file.size / (1024 * 1024); // Размер в MB
        if (fileSizeMB > 1) {
            fileNameDisplay.classList.add('file-name-error');
        }
    } else {
        fileNameDisplay.textContent = '';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

//Отображение файла в форме
document.getElementById('screenshot').addEventListener('change', function () {
    const fileNameDisplay = document.getElementById('file-name');
    const file = this.files[0];

    if (file) {
        fileNameDisplay.textContent = `Файл: ${file.name}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});