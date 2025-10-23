// popup window
window.onload = function() {
  const popup = document.getElementById('popup');
  const openPopup = document.getElementById('openPopup');
  const closeBtn = document.getElementById('closePopup');

  
  openPopup.onclick = function() {
    popup.style.display = 'flex';
  };

  
  closeBtn.onclick = function() {
    popup.style.display = 'none';
  };

  
  window.onclick = function(e) {
    if (e.target === popup) popup.style.display = 'none';
  };
};



// 6-assignment

const stars = document.querySelectorAll(".stars i");

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    
    stars.forEach((star,index2) => {
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active")
    })
  });
});



// light/Dark mod

function toggleTheme(){
  const body = document.getElementById("opbody");
  const hero = document.querySelector(".hero");
  const rating = document.querySelector(".rating-box");
  const icon = document.getElementById("icon");
  const opheader = document.getElementById("opheader"); // ДОБАВИЛИ

  if(body.style.backgroundColor === "black"){
      // LIGHT MODE
      body.style.backgroundColor = "white";
      body.style.color = "black";
      hero.style.backgroundColor = "white";
      rating.style.backgroundColor = "white";
      rating.style.color = "black";
      icon.src = "images/icons/moon.jpg";
  } 
  else {
      // DARK MODE
      body.style.backgroundColor = "black";
      body.style.color = "white";
      hero.style.backgroundColor = "black";
      rating.style.backgroundColor = "#222";
      rating.style.color = "white";
      icon.src = "images/icons/sun.jpg";
  }
}





// translator

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

document.getElementById('langSelect').addEventListener('change', function () {
  const lang = this.value;
  document.getElementById('mainTitle').innerHTML = langData[lang].title;
  document.getElementById('subTitle').textContent = langData[lang].subtitle;
  document.getElementById('opheader').textContent = langData[lang].question;
});











  











