const tryToCopyLink = async (link: string) => {
  const input = document.querySelector<HTMLInputElement>(
    '#clipboard-helper-input'
  )!;
  input.value = link;
  input.focus();
  input.select();
  return document.execCommand('copy');
};

export { tryToCopyLink };
