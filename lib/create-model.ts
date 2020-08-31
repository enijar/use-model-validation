import validateData from "./validate-data";
import { dataType, validationType } from "./types";

export default function createModel({ rules, data = {} }) {
  function update(freshData: dataType | Function = {}) {
    if (typeof freshData === "function") {
      freshData = { ...freshData(data) };
    }
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

  function set(newData: dataType | Function) {
    if (typeof newData === "function") {
      newData = { ...newData(data) };
    }
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
    set(data: dataType | Function): dataType {
      set(data);
      return this.get();
    },
    update(data: dataType | Function): dataType {
      update(data);
      return get();
    },
    validate(): validationType {
      return validateData(data, rules);
    },
    get(): dataType {
      return get();
    },
  };
}
