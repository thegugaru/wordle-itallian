import { useState, useEffect, useCallback, useRef } from "react";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { FailModal } from "./components/modals/FailModal";
import { DiegoModal } from "./components/modals/DiegoModal";
import { isWordInWordList, isWinningWord, solution, dictionarySize } from "./lib/words";
import { failMessage, winMessage } from "./lib/endmessages";
import { shake } from './lib/fx';
import toast, { Toaster } from 'react-hot-toast';
import { PuzzleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { once } from "./lib/eventbus";
import { solutionMeta } from "./lib/words";

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [attemptRevealed, setAttemptRevelead] = useState(true);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [todayTS] = useState(new Date().setHours(0,0,0,0));
  const [endTitle, setEndTitle] = useState('');
  const [isDev, setIsDev] = useState(false);
  const [isDiego, setIsDiego] = useState(false);

  const isEnded = useCallback(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
      return true;
    }
    if (isGameLost) {
      setIsFailModalOpen(true);
      return true;
    }

    return false;
  }, [isGameLost, isGameWon]);

  const onChar = useCallback((value: string) => {
    if (isEnded()) {
      return;
    }

    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  }, [currentGuess, guesses, isEnded]);

  const onDelete = useCallback(() => {
    if (isEnded()) {
      return;
    }

    setCurrentGuess(currentGuess.slice(0, -1));
  }, [currentGuess, isEnded]);

  const onEnter = useCallback(() => {
    if (isEnded()) {
      return;
    }

    if (currentGuess.toUpperCase() === 'DIEGO') {
      setIsDiego(true);
      return;
    }

    if (!isWordInWordList(currentGuess) && guesses.length < 6) {
      toast.dismiss();
      setAttemptRevelead(true);
      shake(document.querySelector('#main'), 300); // shake on error
      setTimeout(() => {
        toast(
          <div>
            <p className="text-xl text-center font-bold tracking-wide m-0">NIX</p>
            <p className="text-center tracking-wide">sostantivi al singolare o verbi all'infinito</p>
          </div>
        )
      }, 250);

      return;
    }

    setAttemptRevelead(false);
    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isEnded()) {
      setGuesses([...guesses, currentGuess]);

      if (winningWord) {
        setEndTitle(winMessage(guesses.length + 1));
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        setEndTitle(failMessage());
        return setIsGameLost(true);
      }
    }
  }, [isEnded, currentGuess, guesses]);

  useEffect(() => {
    if (isGameLost) {
      setTimeout(() => {
        setIsFailModalOpen(true);
      }, 1900);
    }
  }, [isGameLost]);

  useEffect(() => {
    if (isGameWon) {
      setTimeout(() => {
        setIsWinModalOpen(true);
      }, 1900);
    }
  }, [isGameWon]);

  useEffect(() => {
    if (window.location.href.indexOf('develop') > -1) {
      setIsDev(true);
      setIsAboutModalOpen(true);
    }
  }, []);

  useEffect(() => {
    once("revealEnd", (e: any) => {
      e.stopImmediatePropagation();
      setCurrentGuess("");
      setAttemptRevelead(true);
    });
  });

  // animation before start
  const gridContainer:any = useRef(null);
  const keyboardContainer:any = useRef(null);
  useEffect(() => {
    gridContainer?.current?.classList.add('appear');
    keyboardContainer?.current?.classList.add('appear');
    setTimeout(() => {
      gridContainer?.current?.classList.remove('appear-start-grid', 'appear');
      gridContainer?.current?.classList.remove('appear-start-keyboard', 'appear');
    }, 2000);
  });


  return (
    <div className="flex flex-col !h-screen-ios max-w-7xl mx-auto py-2 sm:py-3 px-2 sm:px-6 lg:px-8 select-none" id="main">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"></div>

      <div className="flex w-full max-w-sm mx-auto items-center">
        <div className="grow">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide">Parolette</h1>
          <h2 className="text-xs tracking-wide">
          <span className="mr-1">n. {solutionMeta.index}</span>
          • una al giorno, collezionale tutte</h2>
        </div>

        <PuzzleIcon
          className="h-8 w-8 cursor-pointer hover:text-sky-600"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>

      <div ref={gridContainer} className="appear-start-grid grow flex items-center justify-center py-4 sm:py-5 md:py-6">
        <Grid guesses={guesses} currentGuess={currentGuess} isGameWon={isGameWon} attemptRevealed={attemptRevealed} />
      </div>

      <div ref={keyboardContainer} className="appear-start-keyboard">
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          attemptRevealed={attemptRevealed}
        />
      </div>

      <FailModal
        isOpen={isFailModalOpen}
        handleClose={() => setIsFailModalOpen(false)}
        guesses={guesses}
        solution={solution}
        todayTS={todayTS}
        title={endTitle}
      />

      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        todayTS={todayTS}
        title={endTitle}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        dictionarySize={dictionarySize}
        handleClose={() => setIsInfoModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
        isDev={isDev}
      />

      <DiegoModal
        isOpen={isDiego}
        handleClose={() => setIsDiego(false)}
      />

      <div className="max-w-sm mx-auto text-center mt-5 sm:mt-6 md:mt-8 text-gray-500 dark:text-gray-300 cursor-pointer" onClick={() => setIsAboutModalOpen(true)}>
        <p className="text-xs">
          2022 MIT lic. • v 0.8 • @xho
          <InformationCircleIcon className="inline-block ml-1 h-4 w-4 -mt-0.5"/>
        </p>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={2}
        toastOptions={{
          duration: 1600,
          style: {
            backgroundColor: 'rgb(134, 25, 143)',
            color: '#FFF',
          }
        }}
      />
    </div>
  );
}

export default App;
