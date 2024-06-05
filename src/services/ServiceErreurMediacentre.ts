import i18n from '@/plugins/i18n.ts';

const { t } = i18n.global;
const setError = (statusCode: number) => {
  let errorMessage;
  switch (statusCode) {
    case 400:
      errorMessage = 'error-messages.400';
      break;
    case 401:
      errorMessage = 'error-messages.401';
      break;
    case 403:
      errorMessage = 'error-messages.403';
      break;
    case 500:
      errorMessage = 'error-messages.500';
      break;
    default:
      errorMessage = 'error-messages.400';
      break;
  }
  console.log(errorMessage);
  console.log(t(errorMessage));
  return t(errorMessage);
};

export { setError };
