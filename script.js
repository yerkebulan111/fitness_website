// popup window
window.onload = function() {
  const popup = document.getElementById('popup');
  const openPopup = document.getElementById('openPopup');
  const closeBtn = document.getElementById('closePopup');

  if (popup && openPopup && closeBtn) {
    openPopup.onclick = function() {
      popup.style.display = 'flex';
    };

    closeBtn.onclick = function() {
      popup.style.display = 'none';
    };

    window.onclick = function(e) {
      if (e.target === popup) popup.style.display = 'none';
    };
  }
};


// --- DARK / LIGHT MODE ---
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  const icon = document.getElementById('icon');
  if (icon) {
    icon.src = body.classList.contains('dark-mode')
      ? 'images/icons/sun.jpg'
      : 'images/icons/moon.jpg';
  }
}

// --- LANGUAGE SWITCHER ---
const langSelect = document.getElementById('langSelect');
if (langSelect) {
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    translatePage(lang);
  });
}

function translatePage(lang) {
  const translations = {
    en: {
      heading: "Share your impressions with us",
      subheading: "We value your opinion. Tell us about your first training experience.",
      leaveFeedback: "Leave your feedback",
      name: "Your name:",
      feedback: "Your feedback:",
      placeholderName: "Enter your name",
      placeholderMessage: "Write your comment...",
      button: "Send"
    },
    ru: {
      heading: "Поделитесь с нами своими впечатлениями",
      subheading: "Мы ценим ваше мнение. Расскажите о вашем первом опыте тренировок.",
      leaveFeedback: "Оставьте свой отзыв",
      name: "Ваше имя:",
      feedback: "Ваш отзыв:",
      placeholderName: "Введите ваше имя",
      placeholderMessage: "Напишите свой комментарий...",
      button: "Отправить"
    },
    kz: {
      heading: "Бізбен өз әсеріңізбен бөлісіңіз",
      subheading: "Біз сіздің пікіріңізді бағалаймыз. Алғашқы жаттығу тәжірибеңіз туралы айтыңыз.",
      leaveFeedback: "Пікір қалдыру",
      name: "Сіздің атыңыз:",
      feedback: "Пікіріңіз:",
      placeholderName: "Атыңызды енгізіңіз",
      placeholderMessage: "Пікіріңізді жазыңыз...",
      button: "Жіберу"
    }
  };

  const opinionHeading = document.querySelector('.opinion h1');
  const opinionSub = document.querySelector('.opinion p');
  const feedbackForm = document.querySelector('.feedback-form');

  if (opinionHeading && opinionSub && feedbackForm) {
    opinionHeading.textContent = translations[lang].heading;
    opinionSub.textContent = translations[lang].subheading;
    feedbackForm.querySelector('h2').textContent = translations[lang].leaveFeedback;
    const labelName = feedbackForm.querySelector('label[for="name"]');
    const labelMsg = feedbackForm.querySelector('label[for="message"]');
    if (labelName) labelName.textContent = translations[lang].name;
    if (labelMsg) labelMsg.textContent = translations[lang].feedback;

    const inputName = document.getElementById('name');
    const inputMsg = document.getElementById('message');
    if (inputName) inputName.placeholder = translations[lang].placeholderName;
    if (inputMsg) inputMsg.placeholder = translations[lang].placeholderMessage;

    const button = feedbackForm.querySelector('button');
    if (button) button.textContent = translations[lang].button;
  }
}

// --- OPTIONAL: prevent form submit for demo ---
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Feedback submitted!');
    e.target.reset();
  });
}










// lazy loading





$(function() {
  // Lazy loading + повторная анимация при каждом появлении
  function lazyLoad() {
    $('img.lazy').each(function() {
      let $img = $(this);
      let imgTop = $img.offset().top;
      let scrollTop = $(window).scrollTop();
      let windowHeight = $(window).height();

      // Если изображение попадает в видимую область
      if (imgTop < scrollTop + windowHeight && imgTop + $img.height() > scrollTop) {
        // Если картинка еще не загружена — загружаем
        if ($img.attr('data-src')) {
          $img.attr('src', $img.attr('data-src'));
          $img.removeAttr('data-src');
        }
        // Добавляем класс для проявления
        $img.addClass('visible');
      } else {
        // Если ушло из видимости — убираем класс (чтобы эффект повторялся)
        $img.removeClass('visible');
      }
    });
  }

  $(window).on('scroll resize', lazyLoad);
  lazyLoad(); // запускаем при загрузке страницы
});



// more.html join button
$(document).ready(function() {
  $(".Joinbtn, .card button").on("click", function() {
    alert("You have successfully joined this program!");
  });
});


// our-merch.html but now button


