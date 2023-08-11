/* c8 ignore start */

import { WebpackPluginInstance, Compiler } from 'webpack';
import { onIPCServerMessage, IPCType } from '../devServer/ipcServer';

let isCalled = false;

export default class DelayRenderStaticPlugin implements WebpackPluginInstance {
  apply(compiler: Compiler): void {
    compiler.hooks.beforeCompile.tapAsync('DelayPlugin', async (_, done) => {
      if (isCalled) {
        done();
      }
      onIPCServerMessage(IPCType.onEmitAllCompilesComplete, () => {
        isCalled = true;
        done();
      });
    });
  }
}

/* c8 ignore stop */
