# Dragon Ball Battle Initialization
# Sets up the battle arena and summons boss

# Clear battle area
fill -15 60 -15 15 90 15 minecraft:air

# Create battle arena floor
fill -15 59 -15 15 59 15 minecraft:purpur_block

# Create arena walls (decoration)
fill -15 59 -15 -15 80 -15 minecraft:purpur_pillar
fill 15 59 -15 15 80 -15 minecraft:purpur_pillar
fill -15 59 15 -15 80 15 minecraft:purpur_pillar
fill 15 59 15 15 80 15 minecraft:purpur_pillar

# Teleport player to arena
teleport @s 0 65 0

# Summon player character at arena
summon dragonball:goku 0 65 -5

# Initialize boss based on progress
execute if score @s saga_progress matches 0..4 run summon dragonball:boss_raditz 0 65 5
execute if score @s saga_progress matches 5..9 run summon dragonball:vegeta 0 65 5
execute if score @s saga_progress matches 10..14 run summon dragonball:boss_frieza 0 65 5
execute if score @s saga_progress matches 15..19 run summon dragonball:boss_cell 0 65 5
execute if score @s saga_progress matches 20..24 run summon dragonball:boss_majinbuu 0 65 5
execute if score @s saga_progress matches 25..29 run summon dragonball:boss_jiren 0 65 5

# Tag entities as in battle
tag @e[type=dragonball:goku,c=1] add in_battle
tag @e[type=dragonball:boss_raditz] add in_battle
tag @e[type=dragonball:vegeta] add in_battle
tag @e[type=dragonball:boss_frieza] add in_battle
tag @e[type=dragonball:boss_cell] add in_battle
tag @e[type=dragonball:boss_majinbuu] add in_battle
tag @e[type=dragonball:boss_jiren] add in_battle

# Start battle music
music queue play minecraft:music.game.nether

# Display battle start
title @s times 10 60 20
title @s title {"text":"⚡ BATTLE START ⚡","color":"red"}
title @s subtitle {"text":"Defeat your enemy to progress!"}

# Initialize boss health scoreboard
scoreboard players set @e[tag=in_battle,type=!player] boss_health 100
