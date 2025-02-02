const logoutConfirmPopup = document.querySelector('.logout-confirm-popup');
document.querySelector('.logout-btn').addEventListener('click', (eve) => {
  eve.stopPropagation();
  logoutConfirmPopup.style.display = 'block';
});

document.addEventListener('click', (eve) => {
  if (!eve.target.closest('.logout-confirm-popup'))
    logoutConfirmPopup.style.display = 'none';
});

document
  .querySelector('.logout-confirm-cancel')
  .addEventListener('click', () => {
    logoutConfirmPopup.style.display = 'none';
  });
