import Highway from '@dogstudio/highway';
import { Base } from './renderers/Base';
import { Pagetransition } from './transitions/Pagetransition';
import { initialLoad, showConsole } from './utils/functions';

export const H = new Highway.Core({
  renderers: {
    global: Base,
  },
  transitions: {
    global: Pagetransition,
    // contextual: {
    //   project: Projecttransition,
    // },
    // -> data-transition="project"
  },
});

/**
 * Components
 */
showConsole();
initialLoad();

// TODO
// window.addEventListener('beforeunload', () => {
//   localStorage.removeItem('');
// });
