document.querySelector('.all-users').addEventListener('mouseover', (eve) => {
  const userElement = eve.target.closest('.user');
  if (!userElement) return;

  userElement.querySelector('a').style.visibility = 'visible';
});

document.querySelector('.all-users').addEventListener('mouseout', (eve) => {
  const userElement = eve.target.closest('.user');
  if (!userElement) return;

  userElement.querySelector('a').style.visibility = 'hidden';
});
