import { EventsType } from "./types";

const events: EventsType = {};

export default {
  on(event: string, fn: Function) {
    if (!events.hasOwnProperty(event)) {
      events[event] = [];
    }
    events[event].push(fn);
  },
  emit(event: string, data: any) {
    if (!events.hasOwnProperty(event)) return;
    events[event].forEach((fn) => fn(data));
  },
  off(event: string, fn: Function) {
    if (!events.hasOwnProperty(event)) return;
    events[event] = events[event].filter((e) => e !== fn);
    if (events[event].length === 0) {
      delete events[event];
    }
  },
};
