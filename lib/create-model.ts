import validateData from "./validate-data";
import { validationType } from "./types";

export default function createModel({ rules }) {
  const data = {};

  function update(freshData = {}) {
    for (const field in freshData) {
      if (!freshData.hasOwnProperty(field)) {
        continue;
      }
      data[field] = freshData[field];
    }
  }

  function get() {
    return { ...data };
  }

  function set(newData) {
    for (const field in data) {
      if (!data.hasOwnProperty(field)) {
        continue;
      }
      delete data[field];
    }
    for (const field in newData) {
      if (!newData.hasOwnProperty(field)) {
        continue;
      }
      data[field] = newData[field];
    }
  }

  return {
    set(data): any {
      set(data);
      return this.get();
    },
    update(data): any {
      update(data);
      return get();
    },
    validate(): validationType {
      return validateData(data, rules);
    },
    get(): any {
      return get();
    },
  };
}
