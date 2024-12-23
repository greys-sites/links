// from https://stackoverflow.com/a/34749873
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export const formatDate = (date) => {
  if(typeof date == "string") date = new Date(date);
  return (
    pad(date.getMonth() + 1) + "-" +
    pad(date.getDate()) + "-" +
    date.getFullYear()
  )
}

export const pad = (num) => {
  return `00${num}`.slice(-2);
}