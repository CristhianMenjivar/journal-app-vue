// export const myAction = async ({ commit }) => {

import journalApi from "@/api/journalApi";

// }

const PATH = "/entries";

export const loadingEntries = async ({ commit }) => {
  const { data } = await journalApi.get(`${PATH}.json`);

  const entries = [];
  if (data) {
    for (let id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      });
    }
  }
  commit("setEntries", entries);
};

export const updateEntries = async ({ commit }, entry) => {
  const { id, text, date, picture } = entry;

  const payload = {
    text,
    date,
    picture,
  };

  await journalApi.put(`${PATH}/${id}.json`, payload);

  commit("updateEntries", entry);
};

export const createEntries = async ({ commit }, entry) => {
  const { text, date, picture } = entry;

  const payload = {
    text,
    date,
    picture,
  };

  const {
    data: { name },
  } = await journalApi.post(`${PATH}.json`, payload);

  commit("addEntries", {
    ...entry,
    id: name,
  });

  return name;
};

export const deleteEntries = async ({ commit }, id) => {
  await journalApi.delete(`${PATH}/${id}.json`);
  commit("deleteEntries", id);
  return id;
};
