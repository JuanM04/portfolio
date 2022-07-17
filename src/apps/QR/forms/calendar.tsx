/** @jsxImportSource solid-js */
import { createEffect, Show } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

const today = () => {
  const date = new Date()
  return {
    date: date.toISOString().slice(0, 10),
    time: date.toISOString().slice(11, 16),
  }
}

const transformDateTime = ({ date, time }: { date: string; time: string }) =>
  [date.replace(/\D/g, ""), "T", time.replace(/\D/g, "") + "00", "Z"].join("")

const transformDate = ({ date }: { date: string }) => ";VALUE=DATE:" + date.replace(/\D/g, "")

// https://github.com/zxing/zxing/wiki/Barcode-Contents#calendar-events
export function CalendarInput({ onChange }: FormProps) {
  const [state, setState] = createStore({
    summary: "",
    description: "",
    location: "",
    start: today(),
    end: today(),
    allDay: false,
  })

  createEffect(() => {
    const event = [
      "BEGIN:VEVENT",
      `SUMMARY:${state.summary}`,
      state.allDay
        ? "DTSTART;" + transformDate(state.start)
        : "DTSTART:" + transformDateTime(state.start),
      state.allDay ? "DTEND;" + transformDate(state.end) : "DTEND:" + transformDateTime(state.end),
      state.location.length > 0 && `LOCATION:${state.location}`,
      state.description.length > 0 && `DESCRIPTION:${state.description}`,
      "END:VEVENT",
    ]
      .filter(Boolean)
      .join("\n")

    onChange(event)
  })

  return (
    <>
      <div class="col-span-full">
        <label for="summary" class="form-label">
          Event title
        </label>
        <br />
        <input
          id="summary"
          type="text"
          value={state.summary}
          class="form-input"
          onInput={e => setState("summary", e.currentTarget.value)}
        />
      </div>

      <div>
        <label for="startDate" class="form-label">
          Start date
        </label>
        <br />
        <input
          id="startDate"
          type="date"
          value={state.start.date}
          class="form-input"
          onInput={e => setState("start", "date", e.currentTarget.value)}
        />
      </div>
      <div>
        <Show when={!state.allDay}>
          <label for="startTime" class="form-label">
            Start time (GTM/UTC)
          </label>
          <br />
          <input
            id="startTime"
            type="time"
            value={state.start.time}
            class="form-input"
            onInput={e => setState("start", "time", e.currentTarget.value)}
          />
        </Show>
      </div>

      <div>
        <label for="endDate" class="form-label">
          End date
        </label>
        <br />
        <input
          id="endDate"
          type="date"
          value={state.end.date}
          class="form-input"
          onInput={e => setState("end", "date", e.currentTarget.value)}
        />
      </div>
      <div>
        <Show when={!state.allDay}>
          <label for="endTime" class="form-label">
            End time (GTM/UTC)
          </label>
          <br />
          <input
            id="endTime"
            type="time"
            value={state.end.time}
            class="form-input"
            onInput={e => setState("end", "time", e.currentTarget.value)}
          />
        </Show>
      </div>

      <div class="col-span-full flex items-center justify-between">
        <label for="allDay">All-day event</label>
        <input
          id="allDay"
          type="checkbox"
          checked={state.allDay}
          onInput={e => setState("allDay", e.currentTarget.checked)}
        />
      </div>

      <div class="col-span-full">
        <label for="description" class="form-label">
          Description (optional)
        </label>
        <br />
        <input
          id="description"
          type="text"
          value={state.description}
          class="form-input"
          onInput={e => setState("description", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="location" class="form-label">
          Location (optional)
        </label>
        <br />
        <input
          id="location"
          type="text"
          value={state.location}
          class="form-input"
          onInput={e => setState("location", e.currentTarget.value)}
        />
      </div>
    </>
  )
}
