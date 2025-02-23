export const getStorageValue = (key: string) => {
  try {
    if (typeof window === 'undefined') return null;
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};
