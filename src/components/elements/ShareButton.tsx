import { ShareIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { getGuessStatuses } from '../../lib/statuses';
import { solutionMeta } from "../../lib/words";

type Props = {
  guesses: string[];
  title: string;
  success: boolean;
};

export const ShareButton = ({ guesses, title, success }: Props) => {
  const [isTextCopied, setIsTextCopied] = useState(false);

  const shareText = () => {
    let text = `Parolette ${solutionMeta.index} ` + (success? guesses.length : 'x') + '/6';
    text += `\n${solutionMeta.date}\n`;
    text += `${title}\n\n`;
    guesses.forEach(guess => {
      const statuses = getGuessStatuses(guess);
      statuses.forEach(status => {
        status === 'correct' && (text += '🟩');
        status === 'present' && (text += '🟨');
        status === 'absent'  && (text += '⬜');
      });
      text += '\n';
    });

    return text;
  };

  const shareButtonText = isMobile? 'Condividi' : 'Copia per condividere';

  const onShare = () => {
    let text = shareText();

    let navigator: any;
    navigator = window.navigator;
    if (isMobile && navigator.share) {
      navigator.share({
        title: 'Parolette',
        text,
//        url: 'https://parolette.netlify.app/',
      })
      .then(() => console.log('Successful share'))
      .catch((error:any) => console.log('Error sharing', error));
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsTextCopied(true);
          setTimeout(() => {
            setIsTextCopied(false);
          }, 2000);
        });
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        "inline-flex justify-center items-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:text-sm text-white",
        {
          'bg-fuchsia-600' : isTextCopied,
          'bg-blue-800 hover:bg-blue-600 active:bg-blue-800 focus:ring-blue-500 focus:ring-2 focus:ring-offset-1' : !isTextCopied,
        }
      )}
      onClick={onShare}>
      {!isTextCopied && <ShareIcon className="h-5 w-5 mr-2" />}
      {isTextCopied? 'RISULTATO COPIATO' : shareButtonText}
    </button>
  );
};
