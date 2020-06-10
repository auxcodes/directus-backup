import { LoginConfig } from './login-config';

export interface BackupConfig {
  downloadLogin?: LoginConfig;
  uploadLogin?: LoginConfig;
}
