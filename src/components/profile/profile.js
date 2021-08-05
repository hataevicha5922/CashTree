import { LocalStorageService } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routs';

export const logoutBtnHandler = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.onclick = () => {
    LocalStorageService.clearStorage();
    window.location.href = routes.home;
  };
};
