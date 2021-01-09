import 'module-alias/register';
import 'reflect-metadata';
import SHabbo from '@SHabbo';

try {
  const app = new SHabbo();
  app.run();
} catch (e) {
  console.log('Running app error', e);
}
