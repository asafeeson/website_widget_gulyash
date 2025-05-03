// виджет 1
function() {
    try {
        // Ваш JSON должен быть строкой.  Если он уже объект, преобразуйте его.
        var jsonDataString = '...';

        window.promoWidgetDataOne = JSON.parse(jsonDataString); // Сохраняем в глобальную переменную
        return window.promoWidgetDataOne; // Возвращаем для GTM (не обязательно, но полезно)
    } catch (e) {
        console.error("Error parsing JSON in GTM:", e);
        return null; // Важно вернуть null при ошибке, чтобы избежать проблем.
    }
}

// виджет 2
function() {
    try {
        // Ваш JSON должен быть строкой.  Если он уже объект, преобразуйте его.
        var jsonDataString = '...';

        window.promoWidgetDataTwo = JSON.parse(jsonDataString); // Сохраняем в глобальную переменную
        return window.promoWidgetDataTwo; // Возвращаем для GTM (не обязательно, но полезно)
    } catch (e) {
        console.error("Error parsing JSON in GTM:", e);
        return null; // Важно вернуть null при ошибке, чтобы избежать проблем.
    }
}