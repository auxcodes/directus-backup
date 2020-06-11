import { DataType } from '../enums/data-type.enum';
import { Collection } from './collection';

export interface Project {
  name?: string;
  url?: string;
  collections?: Collection[];
}
