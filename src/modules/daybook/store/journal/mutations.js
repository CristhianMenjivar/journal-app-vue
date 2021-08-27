// export const myMutation = (state) => {
// };

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};

export const updateEntries = (state, entry) => {
  state.entries = state.entries.map((e) => {
    if (e.id === entry.id) e = entry;
    return { ...e };
  });
};

export const addEntries = (state, entry) => {
  state.entries = [entry, ...state.entries];
};

export const deleteEntries = (state, id) => {
  state.entries = state.entries.filter((e) => e.id !== id);
};
