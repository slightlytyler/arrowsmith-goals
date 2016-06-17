import createService from 'api/service';
import { NAME } from './config';

const service = createService(NAME);

export const createRecord = service.createRecord;

export const updateRecord = service.updateRecord;

export const deleteRecord = service.deleteRecord;

export const fetchCollection = service.fetchCollection;
