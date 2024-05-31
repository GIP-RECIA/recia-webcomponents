import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpRightFromSquare,
  faCaretRight,
  faCircleInfo,
  faCircleNotch,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const register = () => {
  library.add(faXmark, faStar, farStar, faArrowUpRightFromSquare, faCircleNotch, faCircleInfo, faCaretRight);
};

export { register };
