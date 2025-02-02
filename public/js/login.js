const login = async (eve) => {
  eve.preventDefault();
  const emailOrMobile = document.querySelector('#identifier').value;
  const password = document.querySelector('#password').value;

  try {
    const res = await axios.post('http://127.0.0.1:3000/auth/login', {
      emailOrMobile,
      password,
    });
    const { userRole } = res.data;
    window.location.href = `http://127.0.0.1:3000/${userRole}`;
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('.btn-submit').addEventListener('click', login);
