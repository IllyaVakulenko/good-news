document.addEventListener('DOMContentLoaded', () => {
    // Знаходимо всі каруселі разом з їх кнопками
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carouselContainer => {
        const carousel = carouselContainer.querySelector('.carousel');
        const prevButton = carouselContainer.querySelector('.prev-button');
        const nextButton = carouselContainer.querySelector('.next-button');

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({left: 200, behavior: 'smooth'}); // Прокрутка праворуч на 200px
        });

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({left: -200, behavior: 'smooth'}); // Прокрутка ліворуч на 200px
        });
    });
});


// Функція для завантаження JSON файлу з перекладами
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/js/translations/${lang}.json`); // Вкажи правильний шлях до файлів
        if (!response.ok) {
            Error(`Could not load translations for ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading translations:", error);
    }
}

// Функція для встановлення мови
async function setLanguage(lang) {
    const translations = await loadTranslations(lang);

    if (!translations) {
        return;
    }

    const headers = document.querySelectorAll('.header');
    const descriptions = document.querySelectorAll('.description');

    headers.forEach((header, index) => {
        header.textContent = translations.headers[index] || '';
    });

    descriptions.forEach((description, index) => {
        description.textContent = translations.descriptions[index] || '';
    });

    // Зберігаємо обрану мову в localStorage
    localStorage.setItem('language', lang);

    // Оновлюємо стилі для активної мови
    updateLanguageSwitcher(lang);
}

// Функція для оновлення стилів перемикача мов
function updateLanguageSwitcher(selectedLang) {
    const buttons = document.querySelectorAll('.language-switcher .language-button');

    buttons.forEach(button => {
        button.classList.remove('active'); // Видаляємо активний клас з усіх кнопок
    });

    const activeButton = document.getElementById(`btn-${selectedLang}`);
    if (activeButton) {
        activeButton.classList.add('active'); // Додаємо активний клас для вибраної кнопки
    }
}

// Завантаження мови з localStorage при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'uk';
    setLanguage(savedLang);
});