import createTree from './tree/create';
import createNode from './node/create';
import internals from './util/internals';
import innerHTML from './inner-html';
import outerHTML from './outer-html';
import { defaultTasks, tasks } from './transaction';
import release from './release';
import use from './use';
import { addTransitionState, removeTransitionState } from './transition';
import { __VERSION__ } from './version';

const VERSION = `${__VERSION__}-runtime`;

const api = {
  VERSION,
  addTransitionState,
  removeTransitionState,
  release,
  createTree,
  use,
  outerHTML,
  innerHTML,
  html: createTree,
  defaultTasks,
};

// This is an internal API exported purely for middleware and extensions to
// leverage internal APIs that are not part of the public API. There are no
// promises that this will not break in the future. We will attempt to minimize
// changes and will supply fallbacks when APIs change.
const Internals = Object.assign(internals, api, { defaultTasks, tasks, createNode });

// Attach a circular reference to `Internals` for ES/CJS builds.
api.Internals = Internals;

// Automatically hook up to DevTools if they are present.
if (typeof devTools === 'function') {
  use(devTools(Internals));
  console.info('diffHTML DevTools Found and Activated...');
}

export {
  VERSION,
  addTransitionState,
  removeTransitionState,
  release,
  createTree,
  use,
  outerHTML,
  innerHTML,
  createTree as html,
  Internals,
};

export default api;
