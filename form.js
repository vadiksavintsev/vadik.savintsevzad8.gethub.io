let openPopupButtons = document.querySelectorAll('.formbutton');
let form = document.querySelector('#forms');
let popup = document.querySelector('.popup');

let names = document.getElementById('name');
let email = document.getElementById('email');
let information = document.getElementById('information');
let checkbx = document.getElementById('checkbox');

function save() {
  localStorage.setItem('Имя', names.value);
  localStorage.setItem('Почта', email.value);
  localStorage.setItem('Сообщение', information.value);
  if (checkbx.checked) {
    localStorage.setItem('Чекбокс', 1);
  } else {
    localStorage.setItem('Чекбокс', 0);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  names.value = localStorage.getItem('Имя');
  email.value = localStorage.getItem('Почта');
  information.value = localStorage.getItem('Сообщение');
  let checkBox = localStorage.getItem('Чекбокс');
  if (checkBox == 1) {
    checkbx.checked = true;
  } else if (checkBox == 0) {
    checkbx.checked = false;
  }

  names.oninput = save;
  email.oninput = save;
  information.oninput = save;
  checkbx.oninput = save;
  
  openPopupButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      window.onpopstate = function () {
        window.history.go(0);
        form.classList.remove('open');
        popup.classList.remove('popup_open');
      };
      history.pushState({ page: 1 }, '', '?form');
      form.classList.add('open');
      popup.classList.add('popup_open');
    });
  });
  
    $(function(){
      $(".form").submit(function(e){
          e.preventDefault();
          $.ajax({
              type: "POST",
              dataType: "json",
              url: "https://formcarry.com/s/QW4T8MDEi",
              data: $(this).serialize(),
              success: function (response) {
                if (response.status == 'success') {
                  alert('Успешно!');
                  localStorage.removeItem('Имя');
                  localStorage.removeItem('Почта');
                  localStorage.removeItem('Сообщение');
                 localStorage.removeItem('Чекбокс');
                 names.value = localStorage.getItem('Имя');
                email.value = localStorage.getItem('Почта');
                information.value = localStorage.getItem('Сообщение');
                checkbx.checked = false;
                }
              },
              error: function (jqxhr, status, errorMsg) {
                alert('Ошибка!');
              },
            });
          });
        });
      });
