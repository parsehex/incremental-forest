/*
  ABOUT
  Inform methods should be called any time an in-game value changes that the UI needs to know about
  Examples
    - Player gains or loses money
      - if money >= workerSalary, the 'hire' button should become enabled
      - the money counter needs to update with the new value
      - if money === 0, a notification should show up that the player is out of money
    - a worker is hired (or fired for the most part)
      - the 'fire' button should become enabled
      - the worker count should update

  ORGANIZATION
  The game should communicate only through Inform and its methods
  Inform should decide how to change the UI based on just (mostly) raw data alone
 */

import player from './player';
import worker from './worker';

// world?

export default { player, worker };
