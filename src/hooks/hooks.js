export const useSort = (type, array) => {
  switch (type) {
    case "asc": {
      const newSorted = [...array?.sort((a, b) => a.id - b.id)];
      return newSorted;
    }
    case "desc": {
      const newSorted = [...array?.sort((a, b) => b.id - a.id)];
      return newSorted;
    }
    case "letter": {
      const newSorted = array?.sort((a, b) => a.title.localeCompare(b.title));
      return newSorted;
    }
    default:
      return array;
  }
};
