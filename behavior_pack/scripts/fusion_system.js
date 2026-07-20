# Dragon Ball Fusion System
# Handles fusion mechanics (Fusion Dance, Potara)

import { world, system } from '@minecraft/server';

const FUSION_TYPES = {
  FUSION_DANCE: 'fusion_dance',
  POTARA: 'potara',
  METAMORAN: 'metamoran'
};

const FUSION_PAIRS = {
  'goku+vegeta': 'vegito',
  'goku+krillin': 'gokillin',
  'vegeta+nappa': 'nappegeta',
  'trunks+gohan': 'transhan',
  'goku+gohan': 'gogohan'
};

const FUSION_DURATION = 300000; // 5 minutes in milliseconds
const FUSION_COOLDOWN = 60000; // 1 minute cooldown

class FusionSystem {
  constructor() {
    this.activeFusions = new Map();
    this.fusionCooldowns = new Map();
  }

  canFuse(character1, character2, fusionType) {
    const key1 = `${character1}+${character2}`;
    const key2 = `${character2}+${character1}`;
    const fusedName = FUSION_PAIRS[key1] || FUSION_PAIRS[key2];

    if (!fusedName) return { canFuse: false, reason: 'Incompatible fusion pair' };

    const cooldownKey1 = `${character1}_${character2}`;
    const cooldownKey2 = `${character2}_${character1}`;
    const now = Date.now();

    if (this.fusionCooldowns.get(cooldownKey1) > now || this.fusionCooldowns.get(cooldownKey2) > now) {
      return { canFuse: false, reason: 'Fusion on cooldown' };
    }

    return { canFuse: true, fusedName: fusedName };
  }

  performFusion(character1, character2, stats1, stats2, fusionType) {
    const canFuseResult = this.canFuse(character1, character2, fusionType);
    if (!canFuseResult.canFuse) return canFuseResult;

    const fusedName = canFuseResult.fusedName;
    const fusedStats = this.calculateFusedStats(stats1, stats2);
    const fusionId = `${character1}_${character2}_${Date.now()}`;

    const fusionData = {
      character1: character1,
      character2: character2,
      fusedName: fusedName,
      fusedStats: fusedStats,
      startTime: Date.now(),
      endTime: Date.now() + FUSION_DURATION,
      type: fusionType
    };

    this.activeFusions.set(fusionId, fusionData);

    // Set cooldown
    const cooldownKey1 = `${character1}_${character2}`;
    const cooldownKey2 = `${character2}_${character1}`;
    this.fusionCooldowns.set(cooldownKey1, Date.now() + FUSION_COOLDOWN);
    this.fusionCooldowns.set(cooldownKey2, Date.now() + FUSION_COOLDOWN);

    return {
      success: true,
      fusionId: fusionId,
      fusedName: fusedName,
      fusedStats: fusedStats,
      duration: FUSION_DURATION
    };
  }

  calculateFusedStats(stats1, stats2) {
    return {
      health: (stats1.health + stats2.health) * 1.2,
      maxHealth: (stats1.maxHealth + stats2.maxHealth) * 1.2,
      attack: (stats1.attack + stats2.attack) * 1.3,
      defense: (stats1.defense + stats2.defense) * 1.25,
      speed: (stats1.speed + stats2.speed) * 1.2,
      powerLevel: (stats1.powerLevel + stats2.powerLevel) * 1.5,
      kiEnergy: (stats1.kiEnergy + stats2.kiEnergy) * 1.1,
      maxKiEnergy: (stats1.maxKiEnergy + stats2.maxKiEnergy) * 1.1
    };
  }

  checkFusionExpiry(fusionId) {
    const fusion = this.activeFusions.get(fusionId);
    if (!fusion) return null;

    if (Date.now() > fusion.endTime) {
      this.activeFusions.delete(fusionId);
      return { expired: true, characters: [fusion.character1, fusion.character2] };
    }

    return { expired: false, timeRemaining: fusion.endTime - Date.now() };
  }

  defuse(fusionId) {
    return this.activeFusions.delete(fusionId);
  }
}

const fusionSystem = new FusionSystem();
export { fusionSystem, FUSION_TYPES, FUSION_PAIRS };
