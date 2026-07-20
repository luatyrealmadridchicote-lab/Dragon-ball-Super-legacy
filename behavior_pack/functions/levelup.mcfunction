# Dragon Ball Level Up Function
# Handles leveling up and stat increases

# Increase level
scoreboard players add @s level 1

# Reset experience
scoreboard players set @s exp 0

# Increase power level
scoreboard players add @s power_level 250

# Grant effects
effect @s speed 300 1 true
effect @s strength 300 1 true
effect @s absorption 300 2 true

# Display level up message
title @s times 10 70 20
title @s title {"text":"LEVEL UP!","color":"gold"}
title @s subtitle {"text":"New level unlocked!"}

# Play level up sound
playsound mob.guardian.land @s
playsound note.pling @s
