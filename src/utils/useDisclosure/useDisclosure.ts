import { useEffect, useState } from 'react';

export interface IDisclosure {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
  toggle: () => void;
}

const useDisclosure = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return {
    onClose,
    onOpen,
    isOpen,
    toggle,
    setIsOpen,
  };
};

export default useDisclosure;
