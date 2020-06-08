const tryToCopyLink = async (link: string) => {
  try {
    const result = await navigator.permissions.query({ name: 'clipboard' });
    if (result.state === 'granted' || result.state === 'prompt') {
      navigator.clipboard.writeText(link);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export { tryToCopyLink };
