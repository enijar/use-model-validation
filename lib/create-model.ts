import validateData from "./validate-data";

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
    set(data) {
      set(data);
      return this.get();
    },
    update(data) {
      update(data);
      return get();
    },
    validate() {
      return validateData(data, rules);
    },
    get() {
      return get();
    },
  };
}
