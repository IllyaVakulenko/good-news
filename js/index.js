document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    nextButton.addEventListener('click', () => {
        carousel.scrollBy({left: 200, behavior: 'smooth'}); // Scroll left by 200px
    });

    prevButton.addEventListener('click', () => {
        carousel.scrollBy({left: -200, behavior: 'smooth'}); // Scroll left by 200px
    });
});

// Функція для завантаження JSON файлу з перекладами
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/js/translations/${lang}.json`); // Вкажи правильний шлях до файлів
        if (!response.ok) {
            throw new Error(`Could not load translations for ${lang}`);
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
}

// Завантаження мови з localStorage при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'uk';
    setLanguage(savedLang);
});