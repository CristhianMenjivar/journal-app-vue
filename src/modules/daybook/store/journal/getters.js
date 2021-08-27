// export const myGetter = (state) => {
//     return state.any
// };

export const getEntriesByTerm = (state) => (term = "") => {
  try {
    if (term.length === 0) return state.entries;

    return (
      state.entries.filter((entry) =>
        entry.text.toLowerCase().includes(term.toLowerCase())
      ) || []
    );
  } catch (error) {
    return [];
  }
};

export const getEntriesById = (state) => (id = "") => {
  const entry = state.entries.find((entry) => entry.id === id);

  if (!entry) return;

  return { ...entry };
};
