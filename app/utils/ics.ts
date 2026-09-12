/** Build and download a minimal VEVENT .ics file (UTC). */

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Format a Date as UTC ICS timestamp: YYYYMMDDTHHMMSSZ */
export function formatIcsUtc(date: Date): string {
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    'T',
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    'Z',
  ].join('')
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

export interface IcsEventInput {
  uid: string
  title: string
  description: string
  location: string
  start: Date
  end: Date
}

export function buildIcs(event: IcsEventInput): string {
  const stamp = formatIcsUtc(new Date())
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Solace Coffee//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatIcsUtc(event.start)}`,
    `DTEND:${formatIcsUtc(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return `${lines.join('\r\n')}\r\n`
}

/** Next local occurrence of weekday (0=Sun…6=Sat) at hours:minutes. If that slot already passed today, jumps a week. */
export function nextWeekdayLocal(weekday: number, hours: number, minutes: number): Date {
  const now = new Date()
  const start = new Date(now)
  start.setSeconds(0, 0)
  start.setHours(hours, minutes, 0, 0)
  let diff = (weekday - start.getDay() + 7) % 7
  if (diff === 0 && start.getTime() <= now.getTime()) {
    diff = 7
  }
  start.setDate(start.getDate() + diff)
  return start
}

export function parseTimeHHMM(time: string): { hours: number, minutes: number } {
  const match = time.match(/^(\d{1,2}):(\d{2})/)
  if (!match) {
    return { hours: 10, minutes: 0 }
  }
  return { hours: Number(match[1]), minutes: Number(match[2]) }
}

export function downloadIcs(filename: string, content: string) {
  if (!import.meta.client) {
    return
  }
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.ics') ? filename : `${filename}.ics`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
