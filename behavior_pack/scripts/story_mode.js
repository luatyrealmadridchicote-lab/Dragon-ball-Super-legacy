# Dragon Ball Story Mode System
# Handles all story progression and NPC interactions

import { world, system } from '@minecraft/server';

const STORY_PHASES = {
  INTRO: 0,
  SAIYAN_SAGA: 1,
  NAMEK_SAGA: 2,
  ANDROID_SAGA: 3,
  CELL_SAGA: 4,
  BUU_SAGA: 5,
  SUPER_SAGA: 6,
  TOURNAMENT_OF_POWER: 7,
  ENDGAME: 8
};

const BOSS_SEQUENCE = [
  { name: 'raditz', phase: STORY_PHASES.SAIYAN_SAGA, difficulty: 1 },
  { name: 'nappa', phase: STORY_PHASES.SAIYAN_SAGA, difficulty: 2 },
  { name: 'vegeta', phase: STORY_PHASES.SAIYAN_SAGA, difficulty: 3 },
  { name: 'frieza', phase: STORY_PHASES.NAMEK_SAGA, difficulty: 4 },
  { name: 'zarbon', phase: STORY_PHASES.NAMEK_SAGA, difficulty: 3 },
  { name: 'ginyu', phase: STORY_PHASES.NAMEK_SAGA, difficulty: 4 },
  { name: 'android17', phase: STORY_PHASES.ANDROID_SAGA, difficulty: 5 },
  { name: 'android18', phase: STORY_PHASES.ANDROID_SAGA, difficulty: 5 },
  { name: 'cell', phase: STORY_PHASES.CELL_SAGA, difficulty: 6 },
  { name: 'majinbuu', phase: STORY_PHASES.BUU_SAGA, difficulty: 7 },
  { name: 'gokuBlack', phase: STORY_PHASES.SUPER_SAGA, difficulty: 7 },
  { name: 'jiren', phase: STORY_PHASES.TOURNAMENT_OF_POWER, difficulty: 8 }
];

class StoryModeSystem {
  constructor() {
    this.playerProgress = new Map();
    this.currentBattle = null;
    this.battleRewards = {
      exp: 100,
      power: 50,
      items: []
    };
  }

  initializePlayer(player) {
    const playerId = player.id;
    this.playerProgress.set(playerId, {
      currentPhase: STORY_PHASES.INTRO,
      defeatedBosses: [],
      powerLevel: 1000,
      exp: 0,
      level: 1,
      selectedCharacter: 'goku',
      transformations: [],
      achievements: []
    });
    player.onScreenDisplay.setTitle('Welcome to Dragon Ball Super Legacy!');
    player.onScreenDisplay.setActionBar('Type /go dragon ball to begin');
  }

  progressStory(player, bossName) {
    const playerId = player.id;
    const progress = this.playerProgress.get(playerId);
    
    if (!progress) return false;

    const boss = BOSS_SEQUENCE.find(b => b.name === bossName);
    if (!boss) return false;

    progress.defeatedBosses.push(bossName);
    progress.currentPhase = boss.phase + 1;
    progress.powerLevel += boss.difficulty * 100;
    progress.exp += boss.difficulty * 50;

    this.checkLevelUp(player, progress);
    this.checkPhaseCompletion(player, progress);
    
    return true;
  }

  checkLevelUp(player, progress) {
    const expNeeded = progress.level * 500;
    if (progress.exp >= expNeeded) {
      progress.level += 1;
      progress.exp = 0;
      player.runCommand(`title @s title {"text":"LEVEL UP! Level ${progress.level}","color":"gold"}`);
      player.runCommand(`playsound mob.guardian.land @s`);
    }
  }

  checkPhaseCompletion(player, progress) {
    const phaseNames = ['Intro', 'Saiyan Saga', 'Namek Saga', 'Android Saga', 'Cell Saga', 'Buu Saga', 'Super Saga', 'Tournament of Power', 'Endgame'];
    player.onScreenDisplay.setActionBar(`${phaseNames[progress.currentPhase]} - Power Level: ${progress.powerLevel}`);
  }

  getPlayerProgress(player) {
    return this.playerProgress.get(player.id);
  }

  getStoryStatus(player) {
    const progress = this.getPlayerProgress(player);
    if (!progress) return null;
    
    return {
      phase: progress.currentPhase,
      level: progress.level,
      powerLevel: progress.powerLevel,
      defeatedBosses: progress.defeatedBosses.length,
      character: progress.selectedCharacter
    };
  }
}

const storyMode = new StoryModeSystem();

// Export for use in other scripts
export { storyMode, STORY_PHASES, BOSS_SEQUENCE };
