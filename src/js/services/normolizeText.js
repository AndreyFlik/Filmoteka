const NORALIZE_SYMBOL = 400;

function normolixeText(str = '') {
  let result = '...';

  if (str.length > NORALIZE_SYMBOL) {
    let normalizeString = str.slice(0, NORALIZE_SYMBOL) + result;
    return normalizeString;
  }
  return str;
}

export default normolixeText;
