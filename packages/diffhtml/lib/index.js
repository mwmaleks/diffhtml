import createTree from './tree/create';
import createNode from './node/create';
import parseNewTree from './tasks/parse-new-tree';
import reconcileTrees from './tasks/reconcile-trees';
import internals from './util/internals';
import parse from './util/parse';
import innerHTML from './inner-html';
import outerHTML from './outer-html';
import { defaultTasks, tasks } from './transaction';
import html from './html';
import release from './release';
import use from './use';
import { addTransitionState, removeTransitionState } from './transition';
import { __VERSION__ as VERSION } from './version';

// At startup inject the HTML parser into the default set of tasks.
defaultTasks.splice(defaultTasks.indexOf(reconcileTrees), 0, parseNewTree);

const api = {
  VERSION,
  addTransitionState,
  removeTransitionState,
  release,
  createTree,
  use,
  outerHTML,
  innerHTML,
  html,
};

// This is an internal API exported purely for middleware and extensions to
// leverage internal APIs that are not part of the public API. There are no
// promises that this will not break in the future. We will attempt to minimize
// changes and will supply fallbacks when APIs change.
//
// Note: The HTML parser is only available in this mode.
const Internals = Object.assign(internals, api, { parse, defaultTasks, tasks, createNode });

// Attach a circular reference to `Internals` for ES/CJS builds.
api.Internals = Internals;

// Automatically hook up to DevTools if they are present.
if (typeof devTools !== 'undefined') {
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
  html,
  Internals,
};

export default api;
