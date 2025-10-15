

// pop up


window.onload = function() {
  const popup = document.getElementById('popup');
  const openPopup = document.getElementById('openPopup');
  const closeBtn = document.getElementById('closePopup');

  // открыть форму
  openPopup.onclick = function() {
    popup.style.display = 'flex';
  };

  // закрыть по крестику
  closeBtn.onclick = function() {
    popup.style.display = 'none';
  };

  // закрыть при клике вне формы
  window.onclick = function(e) {
    if (e.target === popup) popup.style.display = 'none';
  };
};




function updateDateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const formattedDate = now.toLocaleString('en-US', options);
  document.getElementById('currentDateTime').textContent = formattedDate;
}


setInterval(updateDateTime, 1000);
updateDateTime();















