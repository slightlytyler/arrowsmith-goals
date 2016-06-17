import { zipObject } from 'lodash';

const statuses = ['pending', 'success', 'failure'];

export default (NAME, type) => zipObject(
  statuses,
  statuses.map(status => `${NAME}/${type}/${status.toUpperCase()}`)
);
