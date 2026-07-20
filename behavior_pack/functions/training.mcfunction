# Dragon Ball Training Function
# Handles training sequences and experience gain

# Training with Master Roshi
execute if score @s training_mode matches 1 at @s run function dragonball:training_roshi

# Training with King Kai
execute if score @s training_mode matches 2 at @s run function dragonball:training_kingkai

# Training with Whis
execute if score @s training_mode matches 3 at @s run function dragonball:training_whis

# Experience gain
scoreboard players add @s exp 1

# Level up check
execute if score @s exp matches 500.. run function dragonball:levelup
