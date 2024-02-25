const getSelectData = (select = []) => {
  return Object.fromEntries(
    select.map((field) => {
      return [field, 1];
    })
  );
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(
    select.map((field) => {
      return [field, 0];
    })
  );
};

module.exports = { getSelectData, unGetSelectData };
