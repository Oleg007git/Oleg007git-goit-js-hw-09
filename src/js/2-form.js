const form = document.querySelector('.feedback-form');
const userInfoKey = 'feedback-form-state';

function updateLocalStorage() {
  const emailValue = form.elements.email.value.trim();
  const messageValue = form.elements.message.value.trim();
  const userInfo = JSON.stringify({ email: emailValue, message: messageValue });
  localStorage.setItem(userInfoKey, userInfo);
}

form.addEventListener('input', function (event) {
  if (event.target.matches("input[name='email'], textarea[name='message']")) {
    updateLocalStorage();
  }
});

function clearLocalStorageAndFields() {
  localStorage.removeItem(userInfoKey);
  form.elements.email.value = '';
  form.elements.message.value = '';
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const jsn = localStorage.getItem(userInfoKey) ?? '';
  const data = JSON.parse(jsn);

  console.log('Submitted Data:', {
    email: form.elements.email.value,
    message: form.elements.message.value,
  });

  clearLocalStorageAndFields();
});

function setSavedData() {
  try {
    const jsn = localStorage.getItem(userInfoKey) ?? '';
    const data = JSON.parse(jsn);
    form.elements.email.value = data?.email ?? '';
    form.elements.message.value = data?.message ?? '';
  } catch (error) {
    console.log('No data', error);
  }
}
setSavedData();
