import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T | (() => T)) => {
  return useStorage(key, defaultValue, window.localStorage);
};

export const useSessionStorage = <T>(key: string, defaultValue: T | (() => T)) => {
  return useStorage(key, defaultValue, window.sessionStorage);
};

const useStorage = <T>(
  key: string,
  defaultValue: T | (() => T),
  storageObject: Storage
): [value: T | undefined, setValue: React.Dispatch<React.SetStateAction<T | undefined>>, remove: () => void] => {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const removeValue = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, removeValue];
};
