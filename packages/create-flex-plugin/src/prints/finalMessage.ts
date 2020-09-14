import { logger } from 'flex-dev-utils';
import { boxen } from 'flex-dev-utils';
import { multilineString } from 'flex-dev-utils/dist/strings';

import { FlexPluginArguments } from '../lib/create-flex-plugin';

const headline = logger.coloredStrings.headline;

/**
 * Prints the final message after the successful creation of a new project
 * @param config
 */
export default (config: FlexPluginArguments) => {
  const installCommand = config.yarn ? 'yarn' : 'npm install';
  const setupMessage = multilineString(
    `${headline('Setup:')}`,
    `$ cd ${config.name}/`,
    `$ ${installCommand}`,
  );

  const devMessage = multilineString(
    `${headline('Development:')}`,
    `$ cd ${config.name}/`,
    `$ twilio flex:plugins:start`,
  );

  const buildMessage = multilineString(
    `${headline('Build Command:')}`,
    `$ cd ${config.name}/`,
    `$ twilio flex:plugins:build`,
  );

  const deployMessage = multilineString(
    `${headline('Deploy Command:')}`,
    `$ cd ${config.name}/`,
    `$ twilio flex:plugins:deploy`,
  );

  let message = multilineString(
    `Your Twilio Flex Plugin project has been successfully created!`,
    `${config.install ? '' : `\n\n ${setupMessage}`}\n`,
    `${devMessage}\n`,
    `${buildMessage}\n`,
    `${deployMessage}\n`,
    'For more info check the README.md file or go to:',
    '➡ https://www.twilio.com/docs/flex',
  );

  const columns = (process.stdout.columns || 100) - 14;
  message = logger.wrap(message, columns, { hard: true });

  boxen.info(message, false);
};
