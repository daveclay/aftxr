export const ArrayUtils = {
  clone: function(array) {
    return [...array];
  },
  allExcept: function(array, item) {
    return array.filter(a => a !== item)
  },
  pluckRandom: function(array) {
    if (array.length === 0) {
      return null
    }
    return array.splice(ArrayUtils.sampleIndex(array), 1)[0];
  },
  sampleIndex: function(array) {
    return Math.floor(Math.random() * array.length);
  },
  sample: (array) => {
    return array[ArrayUtils.sampleIndex(array)];
  }
}
