import { isFinite } from "lodash";
import { DurationKey } from "../enum";

export type TDurationObject = {
  [DurationKey.YEARS]: number;
  [DurationKey.MONTHS]: number;
  [DurationKey.DAYS]: number;
  [DurationKey.HOURS]: number;
  [DurationKey.MINUTES]: number;
  [DurationKey.SECONDS]: number;
};

type TRegExpObject = Record<DurationKey, RegExp>;

const regex: TRegExpObject = {
  [DurationKey.YEARS]: /(\d+ years)/g,
  [DurationKey.MONTHS]: /(\d+ months)/g,
  [DurationKey.DAYS]: /(\d+ days)/g,
  [DurationKey.HOURS]: /(\d+ hours)/g,
  [DurationKey.MINUTES]: /(\d+ minutes)/g,
  [DurationKey.SECONDS]: /(\d+ seconds)/g,
};

const getNumber = (string: string, regex: RegExp): number => {
  try {
    const result = string.toLowerCase().match(regex);

    if (!result || !result.length || result.length > 1) {
      return 0;
    }

    const number = parseInt(result[0].replace(/\s+/g, ""));

    if (!isFinite(number)) {
      return 0;
    }

    return number;
  } catch (_) {
    return 0;
  }
};

export const stringToDurationObject = (string: string): TDurationObject => {
  const object: Record<DurationKey, number> = {
    [DurationKey.YEARS]: 0,
    [DurationKey.MONTHS]: 0,
    [DurationKey.DAYS]: 0,
    [DurationKey.HOURS]: 0,
    [DurationKey.MINUTES]: 0,
    [DurationKey.SECONDS]: 0,
  };

  for (const key of Object.keys(regex)) {
    object[key as DurationKey] = getNumber(string, regex[key as DurationKey]);
  }

  return object;
};

export const stringToMilliseconds = (string: string): number => {
  const object = stringToDurationObject(string);
  let time = 0;

  time = time + object.seconds * 1000;
  time = time + object.minutes * 60 * 1000;
  time = time + object.hours * 60 * 60 * 1000;
  time = time + object.days * 24 * 60 * 60 * 1000;
  time = time + object.months * 30 * 24 * 60 * 60 * 1000;
  time = time + object.years * 365 * 24 * 60 * 60 * 1000;

  return time;
};
