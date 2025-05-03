(function () {
    // Конфигурация виджета для разных источников
    const widgetConfig = {
        // Конфигурация по умолчанию
        'default': {
            title: 'Добро пожаловать на наш сайт!',
            text: 'Мы рады видеть вас здесь. Узнайте больше о наших услугах.',
            imageUrl: 'https://via.placeholder.com/300x200',
            buttonPrimary: {
                text: 'Узнать больше',
                url: '/about'
            },
            buttonSecondary: {
                text: 'Закрыть',
                action: 'close'
            }
        },
        // Для пользователей из Google
        'google.com': {
            title: 'Вы пришли из Google!',
            text: 'Мы предлагаем специальные условия для пользователей, которые нашли нас через поиск.',
            imageUrl: 'https://via.placeholder.com/300x200',
            buttonPrimary: {
                text: 'Получить скидку',
                url: '/special-offer'
            },
            buttonSecondary: {
                text: 'Закрыть',
                action: 'close'
            }
        },
        // Для пользователей из социальных сетей
        'facebok.com': {
            title: 'Привет из Facebook!',
            text: 'Спасибо, что перешли по ссылке из социальной сети. У нас есть для вас особое предложение.',
            imageUrl: 'https://via.placeholder.com/300x200',
            buttonPrimary: {
                text: 'Социальная акция',
                url: '/social-promo'
            },
            buttonSecondary: {
                text: 'Закрыть',
                action: 'close'
            }
        },
        'evangelion': {
            title: 'Добро пожаловать, пилот!',
            text: 'Спасибо, что интересуетесь проектом Евангелион. Узнайте больше о нашей миссии.',
            imageUrl: 'https://via.placeholder.com/300x200',
            buttonPrimary: {
                text: 'Узнать больше',
                url: '/evangelion-info'
            },
            buttonSecondary: {
                text: 'Закрыть',
                action: 'close'
            }
        }
        // Можно добавить другие источники по необходимости
    };

    // Определение источника перехода
    function getReferrerSource() {
        const referrer = document.referrer;
        console.log('Referrer:', referrer);
        if (!referrer) return 'evangelion';

        const referrerDomain = new URL(referrer).hostname;
        console.log('Referrer domain:', referrerDomain);
        // Проверяем источник перехода
        for (const source in widgetConfig) {
            if (source !== 'default' && referrerDomain.includes(source)) {
                return source;
            }
        }

        return 'evangelion';
    }

    // Получаем конфигурацию на основе источника
    const source = getReferrerSource();
    console.log('Source from getReferrerSource', source);
    const config = widgetConfig[source] || widgetConfig['default'] || widgetConfig['evanglion'];

    // Создаем стили для виджета
    function createStyles() {
        console.log("Create style");
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .modal-widget-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: Arial, sans-serif;
            }
            
            .modal-widget-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #4285f4;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            }
            
            .modal-widget-button:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            
            .modal-widget-button svg {
                width: 30px;
                height: 30px;
            }
            
            .modal-widget-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 9998;
            }
            
            .modal-widget-modal {
                display: none;
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 320px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                overflow: hidden;
                animation: modalFadeIn 0.3s ease;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .modal-widget-header {
                padding: 15px;
                background-color: #4285f4;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-widget-header h3 {
                margin: 0;
                font-size: 18px;
            }
            
            .modal-widget-close {
                cursor: pointer;
                padding: 5px;
            }
            
            .modal-widget-content {
                padding: 15px;
            }
            
            .modal-widget-image {
                width: 100%;
                height: auto;
                margin-bottom: 15px;
                border-radius: 4px;
            }
            
            .modal-widget-text {
                margin-bottom: 15px;
                line-height: 1.5;
            }
            
            .modal-widget-buttons {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
            }
            
            .modal-widget-button-primary {
                padding: 10px 15px;
                background-color: #4285f4;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                flex-grow: 1;
                margin-right: 10px;
                text-align: center;
                text-decoration: none;
            }
            
            .modal-widget-button-secondary {
                padding: 10px 15px;
                background-color: #f1f1f1;
                color: #333;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                flex-grow: 1;
                text-align: center;
                text-decoration: none;
            }
            
            .modal-widget-minimized {
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                transform: scale(1);
                transition: all 0.3s ease;
            }
            
            /* Адаптивность для мобильных устройств */
            @media (max-width: 480px) {
                .modal-widget-modal {
                    width: calc(100% - 40px);
                    max-width: 320px;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }

    // Создаем структуру виджета
    function createWidgetDOM() {
        // Создаем контейнер для виджета
        const container = document.createElement('div');
        container.className = 'modal-widget-container';

        // Создаем кнопку для открытия/закрытия виджета
        const button = document.createElement('div');
        button.className = 'modal-widget-button';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
        `;

        // Создаем наложение (оверлей) для затемнения фона
        const overlay = document.createElement('div');
        overlay.className = 'modal-widget-overlay';

        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal-widget-modal';

        // Заголовок модального окна
        const header = document.createElement('div');
        header.className = 'modal-widget-header';
        header.innerHTML = `
            <h3>${config.title}</h3>
            <div class="modal-widget-close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        `;

        // Контент модального окна
        const content = document.createElement('div');
        content.className = 'modal-widget-content';

        // Изображение
        const image = document.createElement('img');
        image.className = 'modal-widget-image';
        image.src = config.imageUrl;
        image.alt = config.title;

        // Текст
        const text = document.createElement('div');
        text.className = 'modal-widget-text';
        text.textContent = config.text;

        // Кнопки
        const buttons = document.createElement('div');
        buttons.className = 'modal-widget-buttons';

        // Основная кнопка
        const buttonPrimary = document.createElement('a');
        buttonPrimary.className = 'modal-widget-button-primary';
        buttonPrimary.textContent = config.buttonPrimary.text;
        buttonPrimary.href = config.buttonPrimary.url;

        // Вторичная кнопка
        const buttonSecondary = document.createElement('a');
        buttonSecondary.className = 'modal-widget-button-secondary';
        buttonSecondary.textContent = config.buttonSecondary.text;
        buttonSecondary.href = '#';

        // Собираем структуру модального окна
        buttons.appendChild(buttonPrimary);
        buttons.appendChild(buttonSecondary);

        content.appendChild(image);
        content.appendChild(text);
        content.appendChild(buttons);

        modal.appendChild(header);
        modal.appendChild(content);

        // Добавляем элементы на страницу
        container.appendChild(button);
        document.body.appendChild(container);
        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        return {
            container,
            button,
            modal,
            overlay,
            close: header.querySelector('.modal-widget-close'),
            buttonSecondary
        };
    }

    // Обработчики событий
    function setupEventListeners(elements) {
        // Открытие модального окна при клике на кнопку
        elements.button.addEventListener('click', () => {
            elements.modal.style.display = 'block';
            elements.overlay.style.display = 'block';

            // Меняем иконку на кнопке
            elements.button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
            `;
        });

        // Функция для закрытия модального окна
        const closeModal = () => {
            elements.modal.style.display = 'none';
            elements.overlay.style.display = 'none';

            // Возвращаем иконку на кнопке
            elements.button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
            `;
        };

        // Закрытие при клике на крестик
        elements.close.addEventListener('click', closeModal);

        // Закрытие при клике на оверлей
        elements.overlay.addEventListener('click', closeModal);

        // Обработка клика на вторичную кнопку (если действие закрытия)
        if (config.buttonSecondary.action === 'close') {
            elements.buttonSecondary.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
            });
        }

        // Сохранение состояния виджета в локальное хранилище
        function saveWidgetState(state) {
            localStorage.setItem('modalWidgetState', JSON.stringify(state));
        }

        // Проверка, был ли виджет уже показан
        function checkWidgetDisplayed() {
            const widgetState = localStorage.getItem('modalWidgetState');
            if (widgetState) {
                return JSON.parse(widgetState).displayed;
            }
            return false;
        }

        // Учёт отображения виджета
        const widgetDisplayed = checkWidgetDisplayed();
        if (!widgetDisplayed) {
            // Автоматически открываем виджет через 5 секунд после загрузки страницы
            setTimeout(() => {
                elements.modal.style.display = 'block';
                elements.overlay.style.display = 'block';
                saveWidgetState({ displayed: true });
            }, 5000);
        }
    }

    // Инициализация виджета
    function initWidget() {
        // Создаем стили
        createStyles();

        // Создаем DOM-элементы
        const elements = createWidgetDOM();
        console.log(elements);
        // Настраиваем обработчики событий
        setupEventListeners(elements);

        // Возвращаем публичный API виджета
        return {
            open: () => {
                elements.modal.style.display = 'block';
                elements.overlay.style.display = 'block';
            },
            close: () => {
                elements.modal.style.display = 'none';
                elements.overlay.style.display = 'none';
            },
            update: (newConfig) => {
                // Логика обновления конфигурации виджета
            }
        };
    }

    // Запускаем виджет и сохраняем API для возможного использования
    window.modalWidget = initWidget();
})();