import { DAY_OF_WEEK, getCalendarData, getFirstDateOfMonthByWeek, rangeColor } from './utils'

export const defaultOptions = {
  autoFit: true,
  color: (value) => rangeColor(value),
  tooltip: {
    shared: true,
    showMarkers: false,
    fields: ['value', 'date'],
    showTitle: true,
    title: (title, { date }) => date,
    domStyles: {
      'g2-tooltip': {
        margin: 0,
        padding: '2px 4px',
        fontSize: '10px'
      },
      'g2-tooltip-list-item': {
        margin: '6px 0'
      },
      'g2-tooltip-title': {
        margin: '4px 0 0'
      }
    }
  },
  style: () => {
    return {
      radius: 4,
      stroke: '#fff',
      lineWidth: 4
    }
  }
}

export function adaptor(params) {
  const { chart, options } = params

  const { data, color, tooltip, style, queryYear } = options

  const calendarData = getCalendarData(data, queryYear)

  chart.data(calendarData).scale('day', { values: DAY_OF_WEEK })

  const geometry = chart.polygon().position('x*day')

  geometry.color('value', color)

  if (typeof style === 'function') {
    geometry.style('value*month*week*day', (value, month, week, day) => style({ value, month, week, day }))
  } else if (style) {
    geometry.style(style)
  }

  /// 移动端
  geometry.shape('', () => ['square', 1, 1])

  chart.coordinate().reflect('y')

  chart.legend(false)

  chart.tooltip(tooltip)
  chart.axis('x', {
    line: null,
    grid: null,
    tickLine: null,
    subTickLine: null,
    label: {
      autoHide: false,
      // text, item
      formatter: text => {
        return getFirstDateOfMonthByWeek(Number(text.slice(5)))
      }
    }
  })
  chart.axis('day', { line: null, grid: null })

  return params
}
