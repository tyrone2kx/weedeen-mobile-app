import Clipboard from '@react-native-clipboard/clipboard';
import { useState } from 'react';

const useCopyToClipboard = (onCopy?: () => void) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (textToCopy: string) => {
    try {
      Clipboard.setString(textToCopy);
      setIsCopied(true);
      onCopy?.();

      // Reset copied status after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Could not copy text: ', error);
    }
  };

  return {
    isCopied,
    copyToClipboard,
  };
};

export default useCopyToClipboard;
