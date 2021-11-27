const tryToCopyLink = async (link: string) => {
  const input = document.querySelector<HTMLInputElement>(
    '#clipboard-helper-input'
  )!;
  input.value = link;
  input.focus();
  input.select();
  return document.execCommand('copy');
};

const isTargetAnIconButton = (
  target: EventTarget | null
): target is HTMLButtonElement =>
  (target instanceof HTMLButtonElement && target.classList.contains('icon')) ||
  target instanceof SVGPathElement ||
  target instanceof SVGElement;

export { tryToCopyLink, isTargetAnIconButton };
