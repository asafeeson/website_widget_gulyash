var widgetData = {
  referrer: "google.com",
  slideOne: {
    title: "Кажется, Вы у нас впервые!",
    body: "Хотим рассказать 3 факта о себе и подарить нежную и красивую <strong>Филадельфию от Шефа</strong>!",
    image:
      "https://kwork.com/files/uploaded/dc/98/42/c73ffcb581/IMG_2377.jpeg",
    caption: "Филадельфия с авокадо 8шт. 250 г",
    buttonPrimary: "Да, давайте",
    buttonSecondary: "Спасибо, не нужно",
    nextSlide: "slideTwo",
  },
  slideTwo: {
    title: "Контора вкуса - это триумф российской школы поваров…",
    body: "Для Вас готовим мы - повара с профильным образованием по направлению поварской деятельности.",
    image:
      "https://kwork.com/files/uploaded/d7/2c/38/110c80aeea/IMG_2042.png",
    caption: "",
    buttonPrimary: "Далее →",
    buttonSecondary: "",
    nextSlide: "slideThree",
  },
  slideThree: {
    title: "Контора вкуса - это пунктуальная доставка…",
    body: "Доставим в пределах обещанного времени!",
    image:
      "https://kwork.com/files/uploaded/d7/2c/38/110c80aeea/IMG_2042.png",
    caption: "",
    buttonPrimary: "Далее →",
    buttonSecondary: "",
    nextSlide: "slideFour",
  },
  slideFour: {
    title: "Контора вкуса - это сочный кэшбэк…",
    body: "Оплачивайте бонусными баллами до 99% стоимости заказа!",
    image:
      "https://kwork.com/files/uploaded/44/d4/96/c12e5452cd/IMG_2032.png",
    caption: "",
    buttonPrimary: "Получить промокод",
    buttonSecondary: "",
    nextSlide: "slideFive",
  },
  slideFive: {
    title: "Ваш подарок!",
    body: "",
    image:
      "https://kwork.com/files/uploaded/dc/98/42/c73ffcb581/IMG_2377.jpeg",
    caption:
      "Введите промокод и получите нежный, но красивый ролл Филадельфия с авокадо в подарок при первом заказе от 1390 р.",
    promocode: "ФИЛА",
    buttonPrimary: "Скопировать промокод",
    buttonSecondary: "",
    nextSlide: "slideSix",
  },
  slideSix: {
    title: "Как получить подарок",
    body: "Добавьте блюда в корзину и введите промокод в поле. Подарок добавится к заказу автоматически за 0р.",
    image: "",
    caption: "Промокод действует 24 часа.",
    buttonPrimary: "Перейти к выбору блюд →",
    buttonPrimaryAction: "close",
    nextSlide: "",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  var allowedReferrers = [
    "google.com",
    "yandex.ru",
    "bing.com",
    "127.0.0.1",
  ];
  var referrer = document.referrer;

  if (referrer) {
    var referrerHost = new URL(referrer).hostname;
    if (allowedReferrers.includes(referrerHost)) {
      var modalWindow = document.getElementById(
        "modal-widget-modal-window"
      );
      var floatingButton = document.getElementById(
        "modal-widget-floating-button"
      );

      if (modalWindow) {
        modalWindow.style.display = "block"; // Show the modal window
      }

      if (floatingButton) {
        floatingButton.style.display = "none"; // Hide the floating button
      }

      var userHasPromocode = sessionStorage.getItem("userHasPromocode");

      if (userHasPromocode) {
        var promoButton = document.getElementById(
          "promo-floating-button"
        );
        if (promoButton) {
          promocodeValue = sessionStorage.getItem("promocodeValue");
          promoButton.textContent = "🎁 Промокод:" + promocodeValue;
        }
        var lastSlideKey = Object.keys(widgetData).pop(); // Get the last slide key
        createSlide(widgetData[lastSlideKey]); // Show the last slide dynamically
      } else {
        createSlide(widgetData.slideOne); // Initialize the first slide
      }
    }
  }
});

document
  .getElementById("modal-widget-close")
  .addEventListener("click", closeModal);

document
  .getElementById("modal-widget-floating-button")
  .addEventListener("click", handleFoatingButtonClick);

document.addEventListener("click", function (event) {
  var modalOverlay = document.getElementById("modal-widget-overlay");
  var modalWindow = document.getElementById("modal-widget-modal-window");

  if (
    modalOverlay &&
    modalWindow &&
    getComputedStyle(modalOverlay).display === "block" &&
    !modalWindow.contains(event.target) &&
    !event.target.closest("#promo-floating-button") &&
    !event.target.closest("#modal-widget-modal-window") &&
    !event.target.closest(".modal-widget-button-group")
  ) {
    closeModal();
  }
});

function createSlide(slideData) {
  var widgetContent = document.createElement("div");
  widgetContent.id = "widget-content";

  var slide = document.createElement("div");
  slide.id = "modal-widget-slide-start";
  slide.style.animation = "slideInRight 0.5s ease-out"; // Add animation class
  var style = document.createElement("style");
  style.textContent =
    "@keyframes slideInRight {" +
    "from { transform: translateX(100%); opacity: 0; }" +
    "to {transform: translateX(0); opacity: 1; }};";
  document.head.appendChild(style);
  var title = document.createElement("h3");
  title.textContent = slideData.title;
  slide.appendChild(title);

  var body = document.createElement("p");
  body.innerHTML = slideData.body;
  slide.appendChild(body);

  if (slideData.promocode) {
    var promoCodeElement = document.createElement("p");
    promoCodeElement.className = "promocode-value";
    promoCodeElement.id = "promocode-value";
    promoCodeElement.textContent = slideData.promocode;
    slide.appendChild(promoCodeElement);
  } else if (slideData.image) {
    var image = document.createElement("img");
    image.className = "modal-widget-image";
    image.style.width = "300px";
    image.style.height = "300px";
    image.src = slideData.image;
    image.alt = "";
    slide.appendChild(image);
  }

  if (slideData.caption) {
    var caption = document.createElement("p");
    caption.textContent = slideData.caption;
    slide.appendChild(caption);
  }

  var buttonGroup = document.createElement("div");
  buttonGroup.className = "modal-widget-button-group";

  if (slideData?.buttonPrimary) {
    var primaryButton = document.createElement("button");
    primaryButton.type = "button";
    primaryButton.id = "modal-btn-goto-next-slide";
    primaryButton.className = "modal-widget-button-primary";
    primaryButton.textContent = slideData.buttonPrimary;
    if (slideData?.promocode) {
      primaryButton.onclick = copyToClipboard;
    } else {
      primaryButton.onclick = handleNextSlideBtnClk;
    }
    if (slideData?.buttonPrimaryAction === "close") {
      primaryButton.onclick = closeModal;
    }
    primaryButton.setAttribute("data-next-slide", slideData.nextSlide);
    buttonGroup.appendChild(primaryButton);
  }

  if (slideData?.buttonSecondary) {
    var secondaryButton = document.createElement("button");
    secondaryButton.type = "button";
    secondaryButton.id = "modal-btn-no-thank-you";
    secondaryButton.className = "modal-widget-button-secondary";
    secondaryButton.textContent = slideData.buttonSecondary;
    secondaryButton.onclick = closeModal;
    buttonGroup.appendChild(secondaryButton);
  }

  if (slideData?.promocode) {
    var promoButton = document.getElementById("promo-floating-button");
    var primaryButton = document.getElementById(
      "modal-btn-goto-next-slide"
    );
    if (promoButton) {
      promoButton.textContent = "🎁 Промокод:" + slideData.promocode;
    }
    primaryButton.onclick = null; // Remove the current event
    primaryButton.onclick = copyToClipboard; // Add the new onclick event

    if (slideData.promocode) {
      sessionStorage.setItem("userHasPromocode", true);
      sessionStorage.setItem("promocodeValue", slideData.promocode);
    }
  }

  slide.appendChild(buttonGroup);
  widgetContent.appendChild(slide);

  var modalWindow = document.getElementById("widget-content");
  modalWindow.innerHTML = ""; // Clear existing content
  modalWindow.appendChild(widgetContent);
}

function handleNextSlideBtnClk() {
  var nextSlideKey = this.getAttribute("data-next-slide");
  if (nextSlideKey && widgetData[nextSlideKey]) {
    createSlide(widgetData[nextSlideKey]);
  }
}

function closeModal() {
  var modalWindow = document.getElementById("modal-widget-overlay");
  var floatingButton = document.getElementById(
    "modal-widget-floating-button"
  );

  if (modalWindow) {
    modalWindow.style.display = "none"; // Hide the modal window
  }

  if (floatingButton) {
    floatingButton.style.display = "block"; // Make the floating button visible
  }
}
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
      .catch((err) => {
        console.error("Ошибка при копировании промокода: ", err);
      });
  } else {
    console.error("Элемент с id='promocode-value' не найден.");
  }
  var nextSlideKey = this.getAttribute("data-next-slide");
  console.log(nextSlideKey);
  createSlide(widgetData[nextSlideKey]);
}

function showToast(message) {
  var toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "#4caf50";
  toast.style.color = "#ffffff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  toast.style.zIndex = "1000";
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";
    setTimeout(function () {
      document.body.removeChild(toast);
    }, 500);
  }, 3000);
}

function handleFoatingButtonClick() {
  var modalWindow = document.getElementById("modal-widget-overlay");
  var floatingButton = document.getElementById(
    "modal-widget-floating-button"
  );

  if (modalWindow) {
    modalWindow.style.display = "block"; // Show the modal window
  }

  if (floatingButton) {
    floatingButton.style.display = "none"; // Hide the floating button
  }

  var userHasPromocode = sessionStorage.getItem("userHasPromocode");
  console.log(userHasPromocode);
  if (userHasPromocode) {
    var lastSlideKey = Object.keys(widgetData).pop(); // Get the last slide key
    createSlide(widgetData[lastSlideKey]); // Show the last slide dynamically
  } else {
    createSlide(widgetData.slideOne); // Initialize the first slide
  }
}

