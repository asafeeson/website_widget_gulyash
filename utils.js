/**
 * Проверяет, содержит ли переданный URL параметр utm_campaign с заданным значением. И возвращает его значение.
 *
 * @param {string} url - URL-адрес для проверки.
 * @param {string} campaign - Значение utm_campaign, которое требуется найти.
 * @returns {boolean} Возвращает true, если utm_campaign совпадает с campaign, иначе false.
 */
function hasUtmCampaign(url) {
    try {
        var urlObj = new URL(url);
        return urlObj.searchParams.has('utm_campaign');
    } catch (error) {
        console.error(error);
        return false;
    }
}


/**
 * Возвращает объект из массива данных, соответствующий заданной utm-кампании.
 *
 * @param {Array<Object>} dataArray - Массив объектов с настройками виджета, каждый из которых содержит utm-данные.
 * @param {string} campaign - Значение utm_campaign для поиска.
 * @returns {Object|null} Найденный объект с соответствующим utm_campaign или null, если не найдено или параметры не указаны.
 */
function getDataByUtmCampaign(dataArray, campaign) {
    if (!campaign) {
        console.error("Не указан utm_campaign для проверки.");
        return null;
    }
    if (!dataArray) {
        console.error("Не указан список настроек виджета для поиска по UTM");
        return null;
    }
    return dataArray.find(function (item) {
        return item.utm.campaign === campaign;
    })
}


/**
 * Копирует промокод из элемента с id "promocode-value" в буфер обмена и отображает уведомление.
 * После копирования переключает слайд на следующий, если задан.
 */
function copyToClipboard() {
    var promoCodeElement = document.getElementById("promocode-value");
    if (promoCodeElement) {
        var promoCode =
            promoCodeElement.textContent || promoCodeElement.value;
        navigator.clipboard
            .writeText(promoCode)
            .then(function () {
                showToast("Промокод скопирован в буфер обмена!");
            })
            .catch(function (err) {
                console.error("Ошибка при копировании промокода: ", err);
            });
        var nextSlideKey = this.getAttribute("data-next-slide");
        createSlide(widgetDataGlobal[nextSlideKey]);
    } else {
        console.error("Element with id='promocode-value' not found.");
    }
}


function checkAllowedReferrer(referrer, allowedHosts) {
    if (!allowedHosts) {
        throw new Error("Функции не передан список разрешенных хостов для проверки.")
    }
    return allowedHosts.includes(referrerHostname);
}



/**
 * Возвращает объект из массива данных слайдов виджета, у которого свойство referrer совпадает с hostname переданного referrer URL.
 *
 * @param {Array<Object>} dataArray - Массив объектов (JSON), описывающих слайды виджета.
 * @param {string} referrer - URL-адрес реферера, из которого будет извлечён hostname.
 * @returns {Object|null} Первый найденный объект с совпадающим referrer или null, если совпадений нет.
 */
function getDataByReferrer(dataArray, referrer) {
    var referrerHostname = new URL(referrer).hostname;
    if (referrerHostname) {
        return dataArray.find(function (item) {
            return item.referrer === referrerHostname;
        });
    }
    return null;
}


/**
 * Возвращает объект из массива данных слайдов виджета, у которого свойство 
 * slugs содержит указанный hostname и который не совпадает с текущим активным объектом настроек виджета.
 *
 * @param {string} hostname - Имя хоста, по которому производится поиск в массиве slugs.
 * @param {Array<Object>} dataArray - Список JSON объектов с настройками виджета.
 * @param {Object} widgetDataMatch - Текущий активный объект JSON настроек виджета.
 * @returns {Object|undefined} Первый найденный объект, удовлетворяющий условиям, или undefined, если совпадений нет.
 */
function getDataByHostname(hostname, dataArray, widgetDataMatch) {
    if (hostname) {
        dataArray.find(function (item) {
            if (item.slugs.includes(hostname) && widgetDataMatch !== item) {
                console.log("Совпало по списку " + item.promocode + ". Инциирую виджет " + item.promocode + ".");
                return item;
            }
        })
    }
}



/**
 * Возвращает данные виджета на основе переданных referrer или hostname.
 *
 * Если передан referrer, пытается найти данные виджета по нему.
 * Если данные по referrer не найдены или referrer не передан,
 * пытается найти данные виджета по hostname.
 *
 * @param {Object} data - Объект с данными виджета.
 * @param {string|null} referrer - URL-адрес реферера для поиска данных виджета.
 * @param {string} hostname - Имя хоста для поиска данных виджета, если referrer не найден или не передан.
 * @returns {Object|null} Найденные данные виджета по referrer или hostname, либо null, если не найдено.
 */
function getWidgetData(data, referrer, hostname) {
    if (referrer) {
        console.info('Реферер есть, ищем данные по нему.')
        console.info({ data: data, referrer: referrer, hostname: hostname })
        var widgetData = getDataByReferrer(data, referrer);
    }
    if (widgetData === null || hostname) {
        console.info('Рефрер пустой или не совпал со списком разрешенных, ищем данные по hostname.')
        console.info({ data: data, referrer: referrer, hostname: hostname })
        return getDataByHostname(hostname);
    }
}