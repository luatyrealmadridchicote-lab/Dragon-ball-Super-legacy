# Dragon Ball NPC Dialogue System
# Handles all NPC interactions and dialogue trees

import { world, system } from '@minecraft/server';

const DIALOGUE_TREES = {
  master_roshi: {
    greeting: 'Ah, welcome! I am Master Roshi. Are you ready to train?',
    options: [
      { text: 'Train', action: 'start_training', reward: { exp: 50, power: 25 } },
      { text: 'Story', action: 'tell_story', reward: { exp: 25 } },
      { text: 'Leave', action: 'leave' }
    ]
  },
  king_kai: {
    greeting: 'Greetings, warrior. I am King Kai. I sense your potential.',
    options: [
      { text: 'Advanced Training', action: 'advanced_training', reward: { exp: 100, power: 50 } },
      { text: 'Learn Techniques', action: 'learn_techniques', reward: { exp: 75 } },
      { text: 'Ask for Guidance', action: 'guidance', reward: { exp: 50 } },
      { text: 'Depart', action: 'leave' }
    ]
  },
  bulma: {
    greeting: 'Oh! Need some tech support? I can help with equipment and upgrades.',
    options: [
      { text: 'Upgrade Equipment', action: 'upgrade', reward: { items: ['tech_upgrade'] } },
      { text: 'Buy Items', action: 'shop', reward: null },
      { text: 'Check Inventory', action: 'inventory', reward: null },
      { text: 'Goodbye', action: 'leave' }
    ]
  },
  whis: {
    greeting: 'Interesting. You wish to grow stronger? I can accelerate your training.',
    options: [
      { text: 'Ultra Instinct Training', action: 'ui_training', reward: { exp: 200, power: 100 } },
      { text: 'God Power Lessons', action: 'god_training', reward: { exp: 150, power: 75 } },
      { text: 'Sparring Match', action: 'sparring', reward: { exp: 100, power: 50 } },
      { text: 'Excuse Me', action: 'leave' }
    ]
  }
};

class NPCDialogueSystem {
  constructor() {
    this.playerDialogues = new Map();
    this.conversationStates = new Map();
  }

  startDialogue(player, npcName) {
    const dialogue = DIALOGUE_TREES[npcName];
    if (!dialogue) return null;

    const playerId = player.id;
    this.playerDialogues.set(playerId, npcName);
    this.conversationStates.set(playerId, 0);

    return {
      npc: npcName,
      message: dialogue.greeting,
      options: dialogue.options
    };
  }

  selectOption(player, optionIndex) {
    const playerId = player.id;
    const npcName = this.playerDialogues.get(playerId);
    
    if (!npcName) return null;

    const dialogue = DIALOGUE_TREES[npcName];
    if (!dialogue || optionIndex >= dialogue.options.length) return null;

    const option = dialogue.options[optionIndex];
    
    return {
      action: option.action,
      reward: option.reward,
      message: this.getActionMessage(option.action, npcName)
    };
  }

  getActionMessage(action, npcName) {
    const messages = {
      start_training: 'Begin your training regimen!',
      advanced_training: 'Prepare yourself for intense training!',
      ui_training: 'Focus your mind on mastering Ultra Instinct...',
      shop: 'Browse our latest equipment!',
      upgrade: 'Let me enhance your gear!',
      leave: 'Farewell, warrior!',
      tell_story: 'Listen to the tales of martial arts...'
    };
    return messages[action] || 'Continue...';
  }

  endDialogue(player) {
    const playerId = player.id;
    this.playerDialogues.delete(playerId);
    this.conversationStates.delete(playerId);
    return true;
  }

  getDialogueTree(npcName) {
    return DIALOGUE_TREES[npcName] || null;
  }
}

const npcDialogueSystem = new NPCDialogueSystem();
export { npcDialogueSystem, DIALOGUE_TREES };
