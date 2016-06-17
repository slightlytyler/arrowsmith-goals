import { reduce } from 'lodash';

// Takes set of modules and the atom key i.e. hooks
// Returns an array of all the module atoms i.e. all the hooks
export default (modules, key) => reduce(
  modules,
  (result, m) => (m[key] ? result.concat(Object.values(m[key])) : result),
  []
);
