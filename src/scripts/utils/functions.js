export function initialLoad() {
  localStorage.setItem('initialLoad', true);

  setTimeout(() => {
    localStorage.removeItem('initialLoad');
  }, 3000);
}

export function showConsole() {
  console.log('%c🤡👋', 'padding: 10px; font-size: 40px');

  console.log(
    '%cDevelopment → Anna Ehrnsperger',
    'padding: 10px; background: black; color: white'
  );
  console.log(
    '%cwww.annaehrnsperger.de',
    'padding: 10px; background: black; color: white'
  );
}
