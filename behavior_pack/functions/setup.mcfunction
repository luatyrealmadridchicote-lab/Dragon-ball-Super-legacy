# Dragon Ball Setup Functions
# Initialize world with story mode

# Set up game rules
gamerule sendCommandFeedback true
gamerule commandBlockOutput true
gamerule showDeathMessages true
gamerule naturalRegeneration true
gamerule keepInventory true
gamerule showCoordinates true

# Set difficulty
gamerule difficulty 2

# Initialize scoreboards
scoreboard objectives add power_level dummy "Power Level"
scoreboard objectives add victories dummy "Victories"
scoreboard objectives add saga_progress dummy "Saga Progress"
scoreboard objectives add level dummy "Level"
scoreboard objectives add exp dummy "Experience"
scoreboard objectives add ki_energy dummy "Ki Energy"
scoreboard objectives add boss_health dummy "Boss HP"

# Create a spawn area
fill -20 60 -20 20 70 20 minecraft:air
fill -20 59 -20 20 59 20 minecraft:grass_block

# Spawn starting NPCs
summon dragonball:master_roshi 0 64 5 {CustomName:'{"text":"Master Roshi"}'}
summon dragonball:bulma 10 64 0 {CustomName:'{"text":"Bulma"}'}

# Set starting spawn point
setworldspawn 0 65 0

# Welcome message
title @s times 10 70 20
title @s title {"text":"Dragon Ball Super Legacy","color":"gold"}
title @s subtitle {"text":"v1.21.133 - Minecraft Education Edition"}

# Give starting items
give @s minecraft:wooden_sword 1
give @s minecraft:apple 10
give @s minecraft:compass 1
