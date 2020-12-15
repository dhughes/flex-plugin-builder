import { Credential } from 'flex-dev-utils';

import BaseClient from './baseClient';

export default class PluginsApiClient extends BaseClient {
  public static BaseUri = 'Builds';

  constructor(auth: Credential) {
    super(auth, PluginsApiClient.getBaseUrl());
  }

  public static getBaseUrl = () => {
    return `${BaseClient.getBaseUrl('flex-api', 'v1')}/PluginService`;
  };

  /**
   * Checks whether the beta feature flag has been turned on for this account
   */
  public hasFlag = async (): Promise<boolean> => {
    return this.http
      .get('/Plugins')
      .then(() => true)
      .catch(() => false);
  };
}
