import { DataType } from '../enums/data-type.enum';

export interface LoginConfig {
  url: string;
  project: string;
  email: string;
  server: DataType;
}
