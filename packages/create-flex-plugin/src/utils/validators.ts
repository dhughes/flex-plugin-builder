import { logger } from 'flex-dev-utils';
import { prompt } from 'flex-dev-utils/dist/inquirer';
import { isSidOfType, SidPrefix } from 'flex-dev-utils/dist/sids';
import {
  isValidPluginName,
  isValidUrl,
  validateAccountSid,
  validateGitHubUrl,
} from 'flex-dev-utils/dist/validators';

import { FlexPluginArguments } from '../lib/create-flex-plugin';

/**
 * Prompts the user to enter AccountSid
 * @private
 */
export const _promptForAccountSid = async (): Promise<string> => {
  return await prompt({
    type: 'input',
    name: 'accountSid',
    message: 'Twilio Flex Account SID',
    validate: validateAccountSid,
  });
};

/**
 * Prompts the user to enter template URL
 * @private
 */
export const _promptForTemplateUrl = async (): Promise<string> => {
  return await prompt({
    type: 'input',
    name: 'template',
    message: 'Template URL',
    validate: validateGitHubUrl,
  });
};

/**
 * Further validates the configuration
 *
 * @param config {FlexPluginArguments}  the configuration
 * @return {Promise<FlexPluginArguments>}
 */
const validate = async (config: FlexPluginArguments): Promise<FlexPluginArguments> => {
  config.name = config.name || '';

  if (!isValidPluginName(config.name)) {
    logger.error('Invalid plugin name. Names need to start with plugin-');
    return process.exit(1);
  }

  if (config.accountSid && !isSidOfType(config.accountSid, SidPrefix.AccountSid)) {
    config.accountSid = await _promptForAccountSid();
  }

  if (config.template && !isValidUrl(config.template)) {
    config.template = await _promptForTemplateUrl();
  }

  return config;
};

export default validate;
