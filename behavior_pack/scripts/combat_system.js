# Dragon Ball Combat System
# Handles all battle mechanics and damage calculations

import { world, system, Player } from '@minecraft/server';

class CombatSystem {
  constructor() {
    this.activeBattles = new Map();
    this.characterStats = new Map();
    this.battleLog = [];
  }

  initializeCharacterStats(character, stats) {
    this.characterStats.set(character, {
      health: stats.health,
      maxHealth: stats.maxHealth,
      attack: stats.attack,
      defense: stats.defense,
      speed: stats.speed,
      kiEnergy: stats.kiEnergy,
      maxKiEnergy: stats.maxKiEnergy,
      powerLevel: stats.powerLevel,
      level: stats.level,
      abilities: stats.abilities || []
    });
  }

  calculateDamage(attacker, defender, ability) {
    const attackerStats = this.characterStats.get(attacker);
    const defenderStats = this.characterStats.get(defender);

    if (!attackerStats || !defenderStats) return 0;

    let baseDamage = attackerStats.attack * 2;
    let abilityModifier = 1.0;

    // Ability modifiers
    if (ability === 'kamehameha') abilityModifier = 2.5;
    if (ability === 'spiritbomb') abilityModifier = 3.0;
    if (ability === 'destructodisc') abilityModifier = 1.8;
    if (ability === 'galickgun') abilityModifier = 2.2;
    if (ability === 'finalflash') abilityModifier = 2.8;

    const defense = defenderStats.defense * 0.5;
    const levelDifference = (attackerStats.level - defenderStats.level) * 5;
    const powerDifference = (attackerStats.powerLevel - defenderStats.powerLevel) * 0.001;

    let totalDamage = (baseDamage * abilityModifier + levelDifference) * (1 + powerDifference);
    totalDamage = Math.max(1, totalDamage - defense);

    return Math.floor(totalDamage);
  }

  applyDamage(target, damage) {
    const stats = this.characterStats.get(target);
    if (!stats) return false;

    stats.health = Math.max(0, stats.health - damage);
    return stats.health <= 0; // Returns true if knocked out
  }

  useAbility(character, ability) {
    const stats = this.characterStats.get(character);
    if (!stats) return false;

    const kiCosts = {
      'kiblast': 20,
      'kamehameha': 100,
      'spiritbomb': 150,
      'destructodisc': 80,
      'galickgun': 90,
      'finalflash': 120,
      'bigbangattack': 110
    };

    const cost = kiCosts[ability] || 50;
    if (stats.kiEnergy < cost) return false;

    stats.kiEnergy -= cost;
    return true;
  }

  restoreKi(character, amount) {
    const stats = this.characterStats.get(character);
    if (!stats) return false;

    stats.kiEnergy = Math.min(stats.maxKiEnergy, stats.kiEnergy + amount);
    return true;
  }

  startBattle(player1, player2) {
    const battleId = `${player1}-vs-${player2}`;
    this.activeBattles.set(battleId, {
      player1: player1,
      player2: player2,
      round: 0,
      started: Date.now(),
      actions: []
    });
    return battleId;
  }

  endBattle(battleId) {
    return this.activeBattles.delete(battleId);
  }

  getBattleStats(character) {
    return this.characterStats.get(character);
  }
}

const combatSystem = new CombatSystem();
export { combatSystem };
