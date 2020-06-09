const tryToCopyLink = async (link: string) => {
  try {
    navigator.clipboard.writeText(link);
    return true;
  } catch (err) {
    return false;
  }
};

export { tryToCopyLink };
