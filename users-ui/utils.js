export function fetcher(...args) {
  return fetch(...args)
    .then(r => (r.ok ? r.json() : null));
}

export function notNull(...args) {
  let validation = true;
  args.forEach((a) => {
    a === '' && (validation = false);
  });
  return validation;
}

export function validateAddress(coordinates) {
  return coordinates.lat && coordinates.lng;
}
