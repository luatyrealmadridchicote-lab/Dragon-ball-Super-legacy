# Dragon Ball Transformation Sequence

# Check for transformation trigger (creative mode or command)
execute as @a run function dragonball:check_transformation

# Apply SSJ Effects
execute as @e[tag=ssj,tag=!ssj_effect] at @s run function dragonball:apply_ssj_effects

# Apply SSJ2 Effects
execute as @e[tag=ssj2,tag=!ssj2_effect] at @s run function dragonball:apply_ssj2_effects

# Apply SSJ3 Effects
execute as @e[tag=ssj3,tag=!ssj3_effect] at @s run function dragonball:apply_ssj3_effects

# Apply Ultra Instinct Effects
execute as @e[tag=ui,tag=!ui_effect] at @s run function dragonball:apply_ui_effects
