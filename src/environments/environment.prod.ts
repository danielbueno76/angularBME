import { RealModule } from './../app/real.module';
import { commonEnvironment } from './environment.common';
export const environment = {
  production: true,
  common: commonEnvironment,
  variableServicesModule: RealModule
};
