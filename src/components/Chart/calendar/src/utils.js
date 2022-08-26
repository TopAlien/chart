import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

function mapDayToMonth(month) {
  const dayOfMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return dayOfMonth[month];
}

export const DAY_OF_WEEK = ['日', '一', '二', '三', '四', '五', '六'];

function mapDayToWeek(day) {
  return DAY_OF_WEEK[day];
}

/** 每一年的日历数据 */
export function getCalendarData(values, lastYear, dateFormat = 'YYYY-MM-DD') {
  const cYear = String((+lastYear || dayjs().year()) + 1);
  const endDate = dayjs(cYear);

  const startDate = endDate.subtract(1, 'year');

  const result = [];
  for (let date = startDate; !date.isAfter(endDate - 1);) {
    result.push({
      x: `${date.week() === 1 && date.month() === 11 ? date.year() + 1 : date.year()}-${date.week()}`,
      year: `${date.year()}`,
      value: values.find((v) => v.date === date.format(dateFormat))?.value || 0,
      month: mapDayToMonth(date.month()),
      week: `${date.week()}`,
      date: date,
      day: date.day(),
    });
    date = date.add(1, 'day');
  }

  return result.map((d) => ({ ...d, date: d.date.format(dateFormat), day: mapDayToWeek(d.day) }));
}

/**
 * 根据 第 N 周获取月份（只获取第一个周的月份）
 * @param week
 * @returns
 */
export function getFirstDateOfMonthByWeek(week) {
  const date = dayjs().week(week);
  return date.date() > 7 ? '' : mapDayToMonth(date.month());
}
