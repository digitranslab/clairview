import { MetaService } from './meta/meta.service';
import { CvConfig } from './utils/cv-config';
import Noco from './Noco';

// run upgrader
import NcUpgrader from '~/version-upgrader/NcUpgrader';

export default async () => {
  const config = await CvConfig.createByEnv();
  Noco._ncMeta = new MetaService(config);
  await NcUpgrader.upgrade({ ncMeta: Noco._ncMeta });
};
