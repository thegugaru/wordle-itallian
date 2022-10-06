import { getGuessStatuses } from "../../lib/statuses";
import { MiniCell } from "./MiniCell";

type Props = {
  guess: string;
};

export const MiniCompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess);

  return (
    <div className="flex justify-center">
      {guess.split("").map((letter, i) => (
        <MiniCell key={i} status={statuses[i]} />
      ))}
    </div>
  );
};
