# Dragon Ball Ki Blast Ability

# Check if player can use Ki Blast
execute as @a[tag=can_use_kiblast] at @s run particle minecraft:blue_flame ~ ~1.5 ~ 0.1 0.1 0.1 0.05 5
execute as @a[tag=can_use_kiblast] at @s run summon minecraft:arrow ~ ~1.5 ^ ^1 {Motion:[0,0,2]}
execute as @a[tag=can_use_kiblast] run playsound mob.blaze.hurt @s

# Remove tag after use
tag @a[tag=can_use_kiblast] remove can_use_kiblast

# Kamehameha - Powerful Blue Energy Wave
execute as @a[tag=can_use_kamehameha] at @s run particle minecraft:blue_flame ~ ~1.5 ~ 0.3 0.3 0.3 0.2 20
execute as @a[tag=can_use_kamehameha] at @s run summon minecraft:fireball ~ ~1.5 ^ ^2 {Motion:[0,0,4],power:[0.0,0.0,0.0,1.0]}
execute as @a[tag=can_use_kamehameha] run playsound mob.blaze.death @s ~ ~ ~ 2 1
tag @a[tag=can_use_kamehameha] remove can_use_kamehameha

# Spirit Bomb - Ultimate Team Attack
execute as @a[tag=can_use_spiritbomb] at @s run particle minecraft:blue_flame ~ ~3 ~ 0.5 0.5 0.5 0.3 50
execute as @a[tag=can_use_spiritbomb] at @s run particle minecraft:explosion ~ ~3 ~ 0 0 0 0 1
execute as @a[tag=can_use_spiritbomb] run playsound ambient.cave @s ~ ~ ~ 2 0.5
tag @a[tag=can_use_spiritbomb] remove can_use_spiritbomb

# Destructo Disc - Slicing Energy Attack
execute as @a[tag=can_use_destructodisc] at @s run particle minecraft:portal ~ ~1.5 ~ 0.1 0.1 0.1 0.1 10
execute as @a[tag=can_use_destructodisc] run playsound entity.endereye.death @s
tag @a[tag=can_use_destructodisc] remove can_use_destructodisc
