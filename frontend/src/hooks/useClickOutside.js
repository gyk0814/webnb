import { useEffect } from 'react';

const useOutsideClick = (ref, callback, exceptionRef) => {
  const handleClick = e => {
    if (exceptionRef?.current?.contains(e.target)) return;

    if (!ref.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
