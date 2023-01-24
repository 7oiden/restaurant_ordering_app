export function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

export function validateNumber(value) {
  const regEx = /^-?\d+\.?\d*$/;
  const patternMatches = regEx.test(value);
  return patternMatches;
}
