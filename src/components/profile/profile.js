import { removeToken, removeUserEmail } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routs';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    removeUserEmail();
    removeToken();
    window.location.href = routes.home;
  };
};
