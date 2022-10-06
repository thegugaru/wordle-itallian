import { KeyValue } from "../../lib/keyboard";
import { getStatuses } from "../../lib/statuses";
import { BackspaceIcon } from "@heroicons/react/outline";
import { Key } from "./Key";
import { useCallback, useEffect, useState } from "react";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  attemptRevealed: boolean;
};

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, attemptRevealed }: Props) => {
  const [charStatuses, setCharStatuses] = useState(getStatuses(guesses));

  const onClick = (value: KeyValue) => {
    if (value === "ENTER") {
      return onEnter();
    }
    if (value === "DELETE") {
      return onDelete();
    }

    onChar(value);
  };

  const keyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    if (!e.metaKey && !e.ctrlKey && !e.altKey) {
      if (e.code.startsWith('Key') && (/[a-zA-Z]/).test(e.key)) {
        e.preventDefault();
        onChar(e.key.toString().toUpperCase());
      }

      if (e.code === 'Backspace') {
        e.preventDefault();
        onDelete();
      }

      if (e.code === 'Enter') {
        e.preventDefault();
        onEnter();
      }
    }
  }, [onChar, onDelete, onEnter]);

  useEffect(() => {
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [keyDown]);

  useEffect(() => {
    if (attemptRevealed) {
      setCharStatuses(getStatuses(guesses));
    }
  }, [attemptRevealed, guesses]);


  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={charStatuses["Q"]} />
        <Key value="W" onClick={onClick} status={charStatuses["W"]} />
        <Key value="E" onClick={onClick} status={charStatuses["E"]} />
        <Key value="R" onClick={onClick} status={charStatuses["R"]} />
        <Key value="T" onClick={onClick} status={charStatuses["T"]} />
        <Key value="Y" onClick={onClick} status={charStatuses["Y"]} />
        <Key value="U" onClick={onClick} status={charStatuses["U"]} />
        <Key value="I" onClick={onClick} status={charStatuses["I"]} />
        <Key value="O" onClick={onClick} status={charStatuses["O"]} />
        <Key value="P" onClick={onClick} status={charStatuses["P"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses["A"]} />
        <Key value="S" onClick={onClick} status={charStatuses["S"]} />
        <Key value="D" onClick={onClick} status={charStatuses["D"]} />
        <Key value="F" onClick={onClick} status={charStatuses["F"]} />
        <Key value="G" onClick={onClick} status={charStatuses["G"]} />
        <Key value="H" onClick={onClick} status={charStatuses["H"]} />
        <Key value="J" onClick={onClick} status={charStatuses["J"]} />
        <Key value="K" onClick={onClick} status={charStatuses["K"]} />
        <Key value="L" onClick={onClick} status={charStatuses["L"]} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          INVIO
        </Key>
        <Key value="Z" onClick={onClick} status={charStatuses["Z"]} />
        <Key value="X" onClick={onClick} status={charStatuses["X"]} />
        <Key value="C" onClick={onClick} status={charStatuses["C"]} />
        <Key value="V" onClick={onClick} status={charStatuses["V"]} />
        <Key value="B" onClick={onClick} status={charStatuses["B"]} />
        <Key value="N" onClick={onClick} status={charStatuses["N"]} />
        <Key value="M" onClick={onClick} status={charStatuses["M"]} />
        <Key width={65.4} value="DELETE" onClick={onClick}>
          <BackspaceIcon
            className="h-8 w-8"
            aria-hidden="true"
          />
        </Key>
      </div>
    </div>
  );
};
