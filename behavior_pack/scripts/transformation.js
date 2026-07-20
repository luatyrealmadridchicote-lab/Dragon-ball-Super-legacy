# Dragon Ball Transformation System
# Handles all Super Saiyan and other transformations

import { world, system } from '@minecraft/server';

const TRANSFORMATIONS = {
  NORMAL: 0,
  SSJ: 1,
  SSJ2: 2,
  SSJ3: 3,
  SSJBLUE: 4,
  UI: 5,
  SSJG: 6,
  SSJGE: 7
};

const TRANSFORMATION_REQUIREMENTS = {
  [TRANSFORMATIONS.SSJ]: { powerLevel: 50000, questProgress: 10 },
  [TRANSFORMATIONS.SSJ2]: { powerLevel: 100000, questProgress: 30 },
  [TRANSFORMATIONS.SSJ3]: { powerLevel: 250000, questProgress: 50 },
  [TRANSFORMATIONS.SSJG]: { powerLevel: 500000, questProgress: 60 },
  [TRANSFORMATIONS.SSJBLUE]: { powerLevel: 750000, questProgress: 70 },
  [TRANSFORMATIONS.UI]: { powerLevel: 1000000, questProgress: 90 }
};

const TRANSFORMATION_BONUSES = {
  [TRANSFORMATIONS.SSJ]: { attack: 1.5, speed: 1.5, kiRegen: 1.2 },
  [TRANSFORMATIONS.SSJ2]: { attack: 1.7, speed: 1.7, kiRegen: 1.4 },
  [TRANSFORMATIONS.SSJ3]: { attack: 2.0, speed: 1.8, kiRegen: 1.5 },
  [TRANSFORMATIONS.SSJG]: { attack: 1.8, speed: 1.6, defense: 1.3 },
  [TRANSFORMATIONS.SSJBLUE]: { attack: 2.2, speed: 2.0, defense: 1.5, kiRegen: 1.6 },
  [TRANSFORMATIONS.UI]: { attack: 2.5, speed: 2.5, defense: 2.0, kiRegen: 2.0 }
};

class TransformationSystem {
  constructor() {
    this.playerTransformations = new Map();
  }

  canTransform(character, targetTransform, currentStats) {
    const requirements = TRANSFORMATION_REQUIREMENTS[targetTransform];
    if (!requirements) return false;

    return (
      currentStats.powerLevel >= requirements.powerLevel &&
      currentStats.questProgress >= requirements.questProgress
    );
  }

  transform(character, targetTransform, stats) {
    if (!this.canTransform(character, targetTransform, stats)) {
      return { success: false, message: 'Requirements not met!' };
    }

    const bonuses = TRANSFORMATION_BONUSES[targetTransform];
    const transformationNames = {
      [TRANSFORMATIONS.SSJ]: 'Super Saiyan',
      [TRANSFORMATIONS.SSJ2]: 'Super Saiyan 2',
      [TRANSFORMATIONS.SSJ3]: 'Super Saiyan 3',
      [TRANSFORMATIONS.SSJG]: 'Super Saiyan God',
      [TRANSFORMATIONS.SSJBLUE]: 'Super Saiyan Blue',
      [TRANSFORMATIONS.UI]: 'Ultra Instinct'
    };

    const newStats = { ...stats };
    newStats.attack *= bonuses.attack;
    newStats.speed *= bonuses.speed;
    if (bonuses.defense) newStats.defense *= bonuses.defense;
    if (bonuses.kiRegen) newStats.kiRegen = (newStats.kiRegen || 1) * bonuses.kiRegen;

    this.playerTransformations.set(character, targetTransform);

    return {
      success: true,
      message: `Transformed into ${transformationNames[targetTransform]}!`,
      newStats: newStats
    };
  }

  getTransformationLevel(character) {
    return this.playerTransformations.get(character) || TRANSFORMATIONS.NORMAL;
  }

  deTransform(character) {
    this.playerTransformations.delete(character);
    return true;
  }
}

const transformationSystem = new TransformationSystem();
export { transformationSystem, TRANSFORMATIONS };
