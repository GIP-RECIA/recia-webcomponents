import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

const register = () => {
  library.add(faMagnifyingGlass, faChevronDown, faXmark);
};

export { register };
