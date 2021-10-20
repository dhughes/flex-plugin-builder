import * as spawnUtils from 'flex-dev-utils/dist/spawn';

import startToolkit from '../start';

jest.mock('flex-dev-utils/dist/spawn');

describe('StartToolkit', () => {
  const runFlag = '--run-script';
  const coreCwd = '--core-cwd';
  const cwd = 'the-cwd';

  it('should invoke the start script', async () => {
    const spawn = jest.spyOn(spawnUtils, 'spawn').mockReturnThis();

    await startToolkit({ cwd: 'the-cwd', name: 'the-name' });

    expect(spawn).toHaveBeenCalledTimes(3);
    expect(spawn).toHaveBeenCalledWith('node', [
      expect.stringContaining('pre-script-check'),
      runFlag,
      coreCwd,
      cwd,
      '--cwd',
      cwd,
    ]);
    expect(spawn).toHaveBeenCalledWith('node', [
      expect.stringContaining('pre-start-check'),
      runFlag,
      coreCwd,
      cwd,
      '--cwd',
      cwd,
    ]);
    expect(spawn).toHaveBeenCalledWith('node', [
      expect.stringContaining('start'),
      runFlag,
      coreCwd,
      cwd,
      '--name',
      'the-name',
    ]);
  });
});
