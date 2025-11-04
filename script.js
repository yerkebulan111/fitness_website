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

// 6-assignment (rating stars)
const stars = document.querySelectorAll(".stars i");
if (stars.length > 0) {
  stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
      stars.forEach((s, index2) => {
        index1 >= index2 ? s.classList.add("active") : s.classList.remove("active");
      });
    });
  });
}

// light/Dark mod
function toggleTheme() {
  const body = document.getElementById("opbody");
  const hero = document.querySelector(".hero");
  const rating = document.querySelector(".rating-box");
  const icon = document.getElementById("icon");
  const opheader = document.getElementById("opheader");

  if (!body || !hero || !rating || !icon || !opheader) return;

  if (body.style.backgroundColor === "black") {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    hero.style.backgroundColor = "white";
    rating.style.backgroundColor = "white";
    rating.style.color = "black";
    icon.src = "images/icons/moon.jpg";
  } else {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    hero.style.backgroundColor = "black";
    rating.style.backgroundColor = "#222";
    rating.style.color = "white";
    icon.src = "images/icons/sun.jpg";
  }
}

// translator
const langSelect = document.getElementById('langSelect');
if (langSelect) {
  const langData = {
    en: {
      title: "Share your <br> impressions with us",
      subtitle: "How do you feel after your first training?",
      question: "How was your first training?"
    },
    ru: {
      title: "Поделитесь <br> своими впечатлениями",
      subtitle: "Что вы чувствуете после первой тренировки?",
      question: "Как прошла ваша первая тренировка?"
    },
    kz: {
      title: "Әсерлеріңізбен <br> бөлісіңіз",
      subtitle: "Алғашқы жаттығудан кейін қандай күйдесіз?",
      question: "Алғашқы жаттығу қалай өтті?"
    }
  };

  langSelect.addEventListener('change', function () {
    const lang = this.value;
    document.getElementById('mainTitle').innerHTML = langData[lang].title;
    document.getElementById('subTitle').textContent = langData[lang].subtitle;
    document.getElementById('opheader').textContent = langData[lang].question;
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



