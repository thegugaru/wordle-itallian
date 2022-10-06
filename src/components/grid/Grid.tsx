import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  guesses: string[];
  currentGuess: string;
  isGameWon: boolean;
  attemptRevealed: boolean;
};

export const Grid = ({ guesses, currentGuess, isGameWon, attemptRevealed }: Props) => {
  const empties = guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <div>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}

      {guesses.length < 6 && attemptRevealed && <CurrentRow guess={currentGuess} />}
      {guesses.length < 6 && !attemptRevealed && <EmptyRow isGameWon={attemptRevealed} />}

      {empties.map((_, i) => (
        <EmptyRow key={i} isGameWon={attemptRevealed} />
      ))}
    </div>
  );
};
