export function parseError(err, defaultMessage) {
  const errorsData = err.response?.data?.errors;
  if (errorsData) {
    let apiErrors;
    if (Array.isArray(errorsData)) {
      apiErrors = errorsData;
    } else if (typeof errorsData === 'object') {
      apiErrors = Object.values(errorsData).flat();
    } else {
      apiErrors = [errorsData];
    }
    return apiErrors.join('\n');
  }
  return err.response?.data?.error || defaultMessage;
}
