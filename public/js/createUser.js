//sign Up form

const signUp = async (eve) => {
  eve.preventDefault();
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const mobile = document.querySelector('#mobile').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  try {
    const res = await axios.post('http://127.0.0.1:3000/auth/create-user', {
      username,
      email,
      mobile,
      password,
      confirmPassword,
    });
    window.location.href = 'http://127.0.0.1:3000/admin';
  } catch (error) {
    console.log(error);
  }
};

console.log(document.querySelector('#btnSignUp'));

document.querySelector('.btn-submit').addEventListener('click', signUp);
