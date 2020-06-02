import { DataType } from '../enums/data-type.enum';

export interface Project {
  dataType: DataType;
  name?: string;
  url?: string;
  collections?: string[];
}
