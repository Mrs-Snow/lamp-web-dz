/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import IsSameOrAfter from 'dayjs/plugin/IsSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsBetween from 'dayjs/plugin/IsBetween';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(IsSameOrAfter);
dayjs.extend(IsBetween);

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
