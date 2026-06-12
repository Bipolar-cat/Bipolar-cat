const STORAGE_KEY = 'innernote_3step_logs';
const logs = JSON.parse(
  localStorage.getItem(STORAGE_KEY)
  || '[]'
);

logs.push(...);

localStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(logs)
);
