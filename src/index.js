import { routes, paths } from './shared/constants/routs';
import { signInHandler } from './components/sign-in/sign-in';
import './styles/styles.scss';

window.onload = () => {
  const pathname = Object.values(paths).find(
    (path) => path === window.location.pathname
  );
  // console.log(pathname);

  switch (pathname) {
    case paths.home:
      window.Location.href = routes.sign_in;
      break;
    case paths.sign_in:
      signInHandler();
      break;
    default:
      break;
  }
};
