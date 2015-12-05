export function listToKey(list) {
  return list.reduce(
    (result, each) => {
      result[each] = each;
      return result;
    }, {});
}
