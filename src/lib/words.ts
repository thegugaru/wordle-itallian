import { WORDS } from "../constants/dictionary";
import { SOLUTIONS } from "../constants/solutions";

const isDST = () => {
    const d = new Date();
    const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();
}

const getTodayIndex = () => {
  const epochMs = 1641942000000; // init January 12, 2022 CET
  let now = Date.now();
  if (isDST()) {
    now += 60*60*1000;
  }

  const msInDay = 86400000;
  return Math.floor((now - epochMs) / msInDay);
};

export const getWordOfDay = () => {
  const index = getTodayIndex();
  return SOLUTIONS[index].toUpperCase();
};

export const solution = getWordOfDay();

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const solutionMeta = {
  date: new Date().toLocaleString('it-IT', { dateStyle: 'medium' }),
  index: getTodayIndex() + 1,
  total: WORDS.length,
};

export const dictionarySize = WORDS.length;
