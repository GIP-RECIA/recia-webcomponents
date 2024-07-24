import i18n from '@/i18n';
import Swal from 'sweetalert2';

const { t } = i18n.global;

const showError = (errorMsgKey: string) => {
  let errorMessage: string;
  if (['perte-connexion', 'permission-refusee'].includes(errorMsgKey)) {
    errorMessage = t(`error.${errorMsgKey}`);
  } else {
    errorMessage = t(`error.aucun-connexion-api`);
  }

  Swal.fire({
    icon: 'error',
    text: errorMessage,
    allowOutsideClick: false,
    confirmButtonText: t(`error.fermer`),
  });
};

export { showError };
