import { auth } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login'
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Пошта не знайдена.Попробуйте ще раз"];
        reject(err);
      });
  });
};