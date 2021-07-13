import validateData from "./validate-data";
import { Model, dataType, validationType } from "./types";
import emitter from "./emitter";

function model({ rules, data = {} }): Model {
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
    return get();
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
    return get();
  }

  return {
    set(data: dataType | Function): dataType {
      const newData = set(data);
      emitter.emit("set", newData);
      return newData;
    },
    update(data: dataType | Function): dataType {
      const newData = update(data);
      emitter.emit("update", newData);
      return newData;
    },
    validate(): validationType {
      const result = validateData(data, rules);
      emitter.emit("validate", result);
      return result;
    },
    fresh(data: dataType = {}) {
      return model({ rules, data });
    },
    get(): dataType {
      return get();
    },
    on(event: string, fn: Function) {
      emitter.on(event, fn);
    },
    off(event: string, fn: Function) {
      emitter.off(event, fn);
    },
  };
}

export default function createModel({ rules, data = {} }) {
  return model({ rules, data });
}
