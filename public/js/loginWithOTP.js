const sendOTPBtn = document.querySelector('.otp-btn');

const sendOTP = async () => {
  const sendOTP = await axios({
    method: 'post',
    url: 'http://127.0.0.1:3000/auth/login-with-otp/send-otp',
    data: {
      mobile: document.querySelector('#mobile').value,
    },
  });

  sendOTPBtn.style.backgroundColor = '#59975c';
  sendOTPBtn.removeEventListener('click', sendOTP);
};
sendOTPBtn.addEventListener('click', sendOTP);
