const { countColors } = require('./utils')


const scrolls = [
    {
        Name: "Fortifying Scroll",
        Color: "Purple",
        Value: 100,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 25
        },
        Description: "A mystical scroll imbued with the power to temporarily bolster the user's resilience to physical attacks.",
        Filename: "0001_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Empowering Scroll",
        Color: "Purple",
        Value: 350,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 80
        },
        Description: "An enigmatic scroll designed to significantly enhance the user's physical defenses in battle.",
        Filename: "0002_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Shielding Scroll",
        Color: "Purple",
        Value: 200,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 40
        },
        Description: "A protective scroll that temporarily strengthens the user's defense against physical attacks.",
        Filename: "0003_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Barrier Scroll",
        Color: "Purple",
        Value: 400,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 85
        },
        Description: "A formidable scroll that provides a significant boost to the user's physical resistance in combat.",
        Filename: "0004_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Reinforcing Scroll",
        Color: "Purple",
        Value: 120,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 30
        },
        Description: "A helpful scroll that momentarily reinforces the user's defenses against physical harm.",
        Filename: "0005_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Impenetrable Scroll",
        Color: "Purple",
        Value: 480,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 95
        },
        Description: "An incredible scroll that vastly increases the user's ability to withstand physical damage for a short time.",
        Filename: "0006_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Defensive Scroll",
        Color: "Purple",
        Value: 240,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 45
        },
        Description: "A sturdy scroll designed to temporarily heighten the user's physical defenses in battle.",
        Filename: "0007_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Resistant Scroll",
        Color: "Purple",
        Value: 150,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 35
        },
        Description: "An enchanted scroll that grants the user enhanced resilience to physical attacks for a brief period.",
        Filename: "0008_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Hardening Scroll",
        Color: "Purple",
        Value: 300,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 55
        },
        Description: "A strengthening scroll that momentarily improves the user's physical defense capabilities.",
        Filename: "0009_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Solidifying Scroll",
        Color: "Purple",
        Value: 420,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 75
        },
        Description: "A mighty scroll that bestows the user with a noticeable increase in physical defense for a short duration.",
        Filename: "0010_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Stalwart Scroll",
        Color: "Purple",
        Value: 250,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 50
        },
        Description: "A potent scroll that temporarily fortifies the user's ability to withstand physical assaults.",
        Filename: "0011_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Guardian Scroll",
        Color: "Purple",
        Value: 450,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 90
        },
        Description: "A powerful scroll that provides the user with exceptional physical defense enhancement for a short duration.",
        Filename: "0012_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Toughening Scroll",
        Color: "Purple",
        Value: 270,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 60
        },
        Description: "A sturdy scroll that temporarily augments the user's ability to endure physical strikes.",
        Filename: "0013_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Resilient Scroll",
        Color: "Purple",
        Value: 190,
        Effect: {
            effectType: "Raise Self Physical Defense",
            amount: 38
        },
        Description: "A magical scroll that temporarily bolsters the user's capacity to resist physical harm.",
        Filename: "0014_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mystic Defense Scroll",
        Color: "Blue",
        Value: 100,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 25
        },
        Description: "A magical scroll that temporarily enhances the user's resistance to magical attacks.",
        Filename: "0015_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Arcane Barrier Scroll",
        Color: "Blue",
        Value: 350,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 80
        },
        Description: "An enchanted scroll that significantly improves the user's defense against magic spells and abilities.",
        Filename: "0016_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Magical Veil Scroll",
        Color: "Blue",
        Value: 200,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 40
        },
        Description: "A protective scroll that temporarily enhances the user's ability to resist magical attacks.",
        Filename: "0017_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Enchanted Shield Scroll",
        Color: "Blue",
        Value: 400,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 85
        },
        Description: "A strong scroll that grants a significant boost to user's magical defense in combat.",
        Filename: "0018_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Safeguard Scroll",
        Color: "Blue",
        Value: 120,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 30
        },
        Description: "A helpful scroll that offers a temporary increase in the user's defense against magic spells and abilities.",
        Filename: "0019_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Ethereal Armor Scroll",
        Color: "Blue",
        Value: 480,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 95
        },
        Description: "An extraordinary scroll that substantially enhances the user's magical defense for a short time.",
        Filename: "0020_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Sorcerous Guard Scroll",
        Color: "Blue",
        Value: 240,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 45
        },
        Description: "An amplifying scroll designed to briefly boost the user's magical defenses during battle.",
        Filename: "0021_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Warding Scroll",
        Color: "Blue",
        Value: 150,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 35
        },
        Description: "An enchanted scroll that temporarily heightens the user's defenses against magical attacks.",
        Filename: "0022_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mystical Guard Scroll",
        Color: "Blue",
        Value: 300,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 55
        },
        Description: "A powerful scroll that momentarily enhances the user's magical defenses.",
        Filename: "0023_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mage Armor Scroll",
        Color: "Blue",
        Value: 420,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 75
        },
        Description: "A potent scroll that temporarily strengthens user's resistance to magic spells and effects.",
        Filename: "0024_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Protective Ward Scroll",
        Color: "Blue",
        Value: 250,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 50
        },
        Description: "A potent scroll that momentarily increases the user's resilience to magical assaults.",
        Filename: "0025_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Divine Aegis Scroll",
        Color: "Blue",
        Value: 450,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 90
        },
        Description: "A powerful scroll that grants the user exceptional magical defense enhancement for a short duration.",
        Filename: "0026_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Magical Barrier Scroll",
        Color: "Blue",
        Value: 270,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 60
        },
        Description: "A robust scroll that momentarily fortifies the user's defenses against magical harm.",
        Filename: "0027_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Arcane Protection Scroll",
        Color: "Blue",
        Value: 190,
        Effect: {
            effectType: "Raise Self Magical Defense",
            amount: 38
        },
        Description: "A mystical scroll that temporarily enhances the user's ability to resist magical effects.",
        Filename: "0028_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Nature's Embrace Scroll",
        Color: "Green",
        Value: 225,
        Effect: {
            effectType: "Heal",
            amount: 42
        },
        Description: "A rejuvenating scroll imbued with the power of nature, restoring a moderate amount of health.",
        Filename: "0029_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Forest Spirit Scroll",
        Color: "Green",
        Value: 475,
        Effect: {
            effectType: "Heal",
            amount: 95
        },
        Description: "A powerful scroll harnessing the vitality of the forest spirits, greatly healing the user.",
        Filename: "0030_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Soothing Breeze Scroll",
        Color: "Green",
        Value: 133,
        Effect: {
            effectType: "Heal",
            amount: 27
        },
        Description: "A calming scroll, healing the user with a gentle breeze of energy.",
        Filename: "0031_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Harmony Touch Scroll",
        Color: "Green",
        Value: 410,
        Effect: {
            effectType: "Heal",
            amount: 80
        },
        Description: "A restorative scroll providing harmony and balance to the user, significantly healing them.",
        Filename: "0032_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Vitality Bloom Scroll",
        Color: "Green",
        Value: 290,
        Effect: {
            effectType: "Heal",
            amount: 58
        },
        Description: "A rejuvenating scroll that bursts with vitality and healing energy.",
        Filename: "0033_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Lifeforce Renewal Scroll",
        Color: "Green",
        Value: 340,
        Effect: {
            effectType: "Heal",
            amount: 66
        },
        Description: "An invigorating scroll that revitalizes the user's lifeforce and heals them.",
        Filename: "0034_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Energetic Surge Scroll",
        Color: "Green",
        Value: 390,
        Effect: {
            effectType: "Heal",
            amount: 75
        },
        Description: "A potent scroll that infuses the user with a surge of healing energy.",
        Filename: "0035_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Tranquil Restoration Scroll",
        Color: "Green",
        Value: 175,
        Effect: {
            effectType: "Heal",
            amount: 35
        },
        Description: "A soothing scroll that restores health and promotes tranquility.",
        Filename: "0036_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Vibrant Essence Scroll",
        Color: "Green",
        Value: 253,
        Effect: {
            effectType: "Heal",
            amount: 50
        },
        Description: "A scroll infused with the vibrant essence of life, providing moderate healing to the user.",
        Filename: "0037_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Spirit Rejuvenation Scroll",
        Color: "Green",
        Value: 203,
        Effect: {
            effectType: "Heal",
            amount: 41
        },
        Description: "A revitalizing scroll that renews the user's energy and heals them.",
        Filename: "0038_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mender's Grace Scroll",
        Color: "Green",
        Value: 300,
        Effect: {
            effectType: "Heal",
            amount: 60
        },
        Description: "A restorative scroll graced by the power of menders, healing the user.",
        Filename: "0039_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Ancient Wisdom Scroll",
        Color: "Green",
        Value: 450,
        Effect: {
            effectType: "Heal",
            amount: 90
        },
        Description: "A rare scroll that taps into ancient wisdom, greatly restoring health to the user.",
        Filename: "0040_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mighty Strike Potion",
        Color: "Red",
        Value: 125,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 48
        },
        Description: "A potion imbued with the power to greatly enhance one's physical attack. Increases physical attack by 48 points.",
        Filename: "0041_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Fierce Assault Potion",
        Color: "Red",
        Value: 320,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 78
        },
        Description: "This potion will significantly increase your physical attack power, adding 78 points to your damage output.",
        Filename: "0042_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Savage Blow Potion",
        Color: "Red",
        Value: 275,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 70
        },
        Description: "Unleash brutal attacks with this potion that raises your physical attack by 70 points.",
        Filename: "0043_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Powerful Strike Potion",
        Color: "Red",
        Value: 200,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 55
        },
        Description: "This potion enhances your physical prowess, increasing your physical attack by 55 points.",
        Filename: "0044_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Potent Blow Potion",
        Color: "Red",
        Value: 420,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 95
        },
        Description: "A potent potion that significantly bolsters your physical attack, granting an additional 95 points.",
        Filename: "0045_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Forceful Smash Potion",
        Color: "Red",
        Value: 380,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 85
        },
        Description: "This potion empowers your strikes with a mighty force, raising your physical attack by 85 points.",
        Filename: "0046_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Intense Bash Potion",
        Color: "Red",
        Value: 50,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 25
        },
        Description: "Channel intense power through your weapon, boosting your physical attack by 25 points.",
        Filename: "0047_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Ferocious Hit Potion",
        Color: "Red",
        Value: 90,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 40
        },
        Description: "Unleash your inner beast with this potion, increasing your physical attack by 40 points.",
        Filename: "0048_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Raging Thrust Potion",
        Color: "Red",
        Value: 150,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 50
        },
        Description: "Infused with the essence of rage, this potion enhances your physical attack by 50 points.",
        Filename: "0049_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Thunderous Strike Potion",
        Color: "Red",
        Value: 410,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 90
        },
        Description: "Harness the power of thunder with this potion, increasing your physical attack by 90 points.",
        Filename: "0050_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Blazing Blow Potion",
        Color: "Red",
        Value: 180,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 60
        },
        Description: "Empower your weapon with blazing energy, boosting your physical attack by 60 points.",
        Filename: "0051_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Forceful Lunge Potion",
        Color: "Red",
        Value: 320,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 75
        },
        Description: "With a burst of energy, this potion increases your physical attack by 75 points.",
        Filename: "0052_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Vigorous Slam Potion",
        Color: "Red",
        Value: 230,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 65
        },
        Description: "Fortify your strength with this potion, raising your physical attack by 65 points.",
        Filename: "0053_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Swift Impact Potion",
        Color: "Red",
        Value: 260,
        Effect: {
            effectType: "Raise Self Physical Attack",
            amount: 70
        },
        Description: "Increase your attack speed and power, boosting your physical attack by 70 points.",
        Filename: "0054_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Weakening Surge Scroll",
        Color: "Aqua",
        Value: 300,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 62
        },
        Description: "A forceful scroll that weakens an opponent's physical defense, leaving them more susceptible to damage.",
        Filename: "0055_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Subduing Mist Scroll",
        Color: "Aqua",
        Value: 110,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 22
        },
        Description: "A mystifying scroll that creates a mist, subtly undermining the enemy's physical defense.",
        Filename: "0056_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Armor Breaker Scroll",
        Color: "Aqua",
        Value: 480,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 98
        },
        Description: "An intense scroll that shatters opponents' armor, leaving them defenseless against physical attacks.",
        Filename: "0057_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Faltering Gust Scroll",
        Color: "Aqua",
        Value: 225,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 46
        },
        Description: "A disrupting scroll that sends a gust, causing the enemy's physical defense to falter.",
        Filename: "0058_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Exposing Vibration Scroll",
        Color: "Aqua",
        Value: 170,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 32
        },
        Description: "A resonating scroll that emits a wave, exposing weaknesses in the opponent's physical defense.",
        Filename: "0059_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Barrier Erosion Scroll",
        Color: "Aqua",
        Value: 405,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 82
        },
        Description: "A potent scroll that erodes away the enemy's protective barrier, leaving them vulnerable to physical attacks.",
        Filename: "0060_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Deflection Descent Scroll",
        Color: "Aqua",
        Value: 370,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 75
        },
        Description: "A weakening scroll that decreases an opponent's ability to deflect physical attacks.",
        Filename: "0061_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Guardian Cripple Scroll",
        Color: "Aqua",
        Value: 260,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 54
        },
        Description: "A destabilizing scroll that targets the enemy's guardian strength, crippling their physical defense.",
        Filename: "0062_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Unraveling Wave Scroll",
        Color: "Aqua",
        Value: 145,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 28
        },
        Description: "A sapping scroll that emits a wave of energy, unraveling the opponent's physical defenses.",
        Filename: "0063_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Shattering Pulse Scroll",
        Color: "Aqua",
        Value: 440,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 89
        },
        Description: "A powerful scroll that releases a pulsating shockwave, shattering the enemy's physical defenses.",
        Filename: "0064_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Dissolving Aura Scroll",
        Color: "Aqua",
        Value: 335,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 68
        },
        Description: "An insidious scroll that projects a dissolving aura, leaving the enemy's physical defenses in disarray.",
        Filename: "0065_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Shieldbane Veil Scroll",
        Color: "Aqua",
        Value: 195,
        Effect: {
            effectType: "Lower Opponents Physical Defense",
            amount: 39
        },
        Description: "A disruptive scroll that envelops the enemy in a shieldbane veil, reducing their physical defense capability.",
        Filename: "0066_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mystic Debilitate Scroll",
        Color: "Orange",
        Value: 300,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 61
        },
        Description: "A mysterious scroll that weakens an opponent's magical defense, making them more susceptible to magical attacks.",
        Filename: "0067_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Warding Dissipation Scroll",
        Color: "Orange",
        Value: 210,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 43
        },
        Description: "A destabilizing scroll that dissipates the enemy's protective wards, reducing their magical defense.",
        Filename: "0068_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Aetheric Shatter Scroll",
        Color: "Orange",
        Value: 450,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 91
        },
        Description: "An intense scroll that shatters the opponent's aetheric barriers, leaving them vulnerable to magical attacks.",
        Filename: "0069_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Enchantment Erosion Scroll",
        Color: "Orange",
        Value: 120,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 24
        },
        Description: "A sapping scroll that erodes away the enemy's enchantments, reducing their resistance to magic.",
        Filename: "0070_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Arcane Disruption Scroll",
        Color: "Orange",
        Value: 400,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 81
        },
        Description: "A powerful scroll that disrupts the enemy's connection to the arcane, leaving their defenses weakened.",
        Filename: "0071_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Aura Suppression Scroll",
        Color: "Orange",
        Value: 350,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 71
        },
        Description: "A potent scroll that suppresses the enemy's defensive aura, leaving them more vulnerable to magical attacks.",
        Filename: "0072_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Barrier Fracture Scroll",
        Color: "Orange",
        Value: 250,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 51
        },
        Description: "A degenerative scroll that fractures the target's protective barriers, making them more susceptible to magic.",
        Filename: "0073_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Magical Dampening Scroll",
        Color: "Orange",
        Value: 160,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 33
        },
        Description: "A weakening scroll that dampens the enemy's magical defenses, making them more prone to magic-based attacks.",
        Filename: "0074_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Veil of Exposure Scroll",
        Color: "Orange",
        Value: 385,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 79
        },
        Description: "A heavy scroll that drapes a veil of exposure over the target, leaving their magical defenses compromised.",
        Filename: "0075_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Glyph Decay Scroll",
        Color: "Orange",
        Value: 195,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 39
        },
        Description: "A rotting scroll that causes the opponent's protective glyphs to decay, leaving them more vulnerable to magic attacks.",
        Filename: "0076_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mana Weave Unravel Scroll",
        Color: "Orange",
        Value: 432,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 88
        },
        Description: "A disruptive scroll that unravels the enemy's mana weave, causing their magical defenses to falter.",
        Filename: "0077_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Sorcerous Sabotage Scroll",
        Color: "Orange",
        Value: 290,
        Effect: {
            effectType: "Lower Opponents Magic Defense",
            amount: 59
        },
        Description: "A cunning scroll that sabotages the opponent's sorceries, leaving their magical defenses weakened.",
        Filename: "0078_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Divine Dispel Potion",
        Color: "Pink",
        Value: 320,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 75
        },
        Description: "This potion possesses divine powers that remove 75 points of invincibility or immunity from a target.",
        Filename: "0079_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Barrier Break Potion",
        Color: "Pink",
        Value: 180,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 40
        },
        Description: "Shatter your enemy's defenses with this potion, stripping away 40 points of invincibility or immunity.",
        Filename: "0080_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Veil Vanish Potion",
        Color: "Pink",
        Value: 250,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 60
        },
        Description: "Dispel the protective veil from your foe, removing 60 points of invincibility or immunity.",
        Filename: "0081_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Safeguard Shatter Potion",
        Color: "Pink",
        Value: 420,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 90
        },
        Description: "Destroy your enemy's safeguard with this powerful potion, negating 90 points of invincibility or immunity.",
        Filename: "0082_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Aegis Annul Potion",
        Color: "Pink",
        Value: 150,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 35
        },
        Description: "Annul your target's aegis with this potion, stripping away 35 points of invincibility or immunity.",
        Filename: "0083_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Ward Wipe Potion",
        Color: "Pink",
        Value: 290,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 70
        },
        Description: "Wipe away your enemy's magical ward, eliminating 70 points of invincibility or immunity.",
        Filename: "0084_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Shield Shred Potion",
        Color: "Pink",
        Value: 210,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 50
        },
        Description: "Tear through your foe's defenses with this potion, removing 50 points of invincibility or immunity.",
        Filename: "0085_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Guard Grind Potion",
        Color: "Pink",
        Value: 80,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 20
        },
        Description: "Grind down your enemy's guard, stripping away 20 points of invincibility or immunity.",
        Filename: "0086_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Protection Purge Potion",
        Color: "Pink",
        Value: 110,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 30
        },
        Description: "Purge your enemy's protection with this potion, removing 30 points of invincibility or immunity.",
        Filename: "0087_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Fortress Fissure Potion",
        Color: "Pink",
        Value: 230,
        Effect: {
            effectType: "Remove Invincibility",
            amount: 55
        },
        Description: "Cause a fissure in your opponent's fortress-like defenses, stripping away 55 points of invincibility or immunity.",
        Filename: "0088_scroll.png",
        Type: "Scroll"
    },
    {
        Name: "Bewildering Burst Potion",
        Color: "Black",
        Value: 180,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Confusion"
            },
            amount: 45
        },
        Description: "Unleash a burst of magical energy, causing confusion to your enemies with a potency of 45 points.",
        Filename: "0089_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Mystifying Mist Potion",
        Color: "Black",
        Value: 350,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Confusion"
            },
            amount: 75
        },
        Description: "Spread a mystifying mist on the battlefield, creating confusion with a potency of 75 points.",
        Filename: "0090_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Perplexing Pulse Potion",
        Color: "Black",
        Value: 100,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Confusion"
            },
            amount: 25
        },
        Description: "Send out a perplexing pulse, causing confusion to your enemies with a potency of 25 points.",
        Filename: "0091_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Disorienting Wave Potion",
        Color: "Black",
        Value: 250,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Confusion"
            },
            amount: 55
        },
        Description: "Release a disorienting wave of energy, creating confusion with a potency of 55 points.",
        Filename: "0092_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Confounding Cloud Potion",
        Color: "Black",
        Value: 400,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Confusion"
            },
            amount: 85
        },
        Description: "Summon a confounding cloud, causing confusion to your enemies with a potency of 85 points.",
        Filename: "0093_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Baffling Beam Potion",
        Color: "Black",
        Value: 150,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Confusion"
            },
            amount: 40
        },
        Description: "Project a baffling beam of energy, creating confusion with a potency of 40 points.",
        Filename: "0094_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Spatial Cascade Scroll",
        Color: "Black",
        Value: 365,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Teleport"
            },
            amount: 73
        },
        Description: "An enigmatic scroll that sends a cascade of spatial energies, teleporting the target to a different location.",
        Filename: "0095_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Dimensional Shift Scroll",
        Color: "Black",
        Value: 180,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Teleport"
            },
            amount: 36
        },
        Description: "A mysterious scroll that manipulates the very fabric of reality, instantly shifting the target to another position.",
        Filename: "0096_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Astral Rift Scroll",
        Color: "Black",
        Value: 400,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Teleport"
            },
            amount: 80
        },
        Description: "A potent scroll that tears a rift in the astral plane, teleporting the target to an unforeseen location.",
        Filename: "0097_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Warping Wind Scroll",
        Color: "Black",
        Value: 275,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Teleport"
            },
            amount: 55
        },
        Description: "A dislocating scroll that unleashes a warping wind, swiftly moving the target to a new location.",
        Filename: "0098_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Vortex Gate Scroll",
        Color: "Black",
        Value: 230,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Teleport"
            },
            amount: 46
        },
        Description: "A captivating scroll that creates a vortex gate, whisking the target away to a distant point.",
        Filename: "0099_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Reality Shatter Scroll",
        Color: "Black",
        Value: 340,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Teleport"
            },
            amount: 68
        },
        Description: "A powerful scroll that shatters the barriers of reality, teleporting the target to an uncharted location.",
        Filename: "0100_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Silencing Whispers Scroll",
        Color: "Black",
        Value: 200,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Mute"
            },
            amount: 40
        },
        Description: "A hushed scroll that releases whispers of silence, preventing the target from casting spells or using abilities that require speech.",
        Filename: "0101_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Voiceless Void Scroll",
        Color: "Black",
        Value: 320,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Mute"
            },
            amount: 64
        },
        Description: "A powerful scroll that creates a voiceless void around the target, temporarily rendering them speechless and unable to cast spells.",
        Filename: "0102_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Crippling Silence Scroll",
        Color: "Black",
        Value: 120,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Mute"
            },
            amount: 24
        },
        Description: "An oppressive scroll that imposes a crippling silence upon the target, hindering their ability to use speech-based abilities.",
        Filename: "0103_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Echo Suppression Scroll",
        Color: "Black",
        Value: 280,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Mute"
            },
            amount: 56
        },
        Description: "An enigmatic scroll that suppresses the target's echo, temporarily stopping them from uttering any spell incantations.",
        Filename: "0104_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Spell Silencer Scroll",
        Color: "Black",
        Value: 240,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Mute"
            },
            amount: 48
        },
        Description: "A nullifying scroll that eliminates any sound surrounding the target, making them unable to cast spells that require speech.",
        Filename: "0105_scrolls.png",
        Type: "Scroll"
    },
    {
        Name: "Wordless Dampening Scroll",
        Color: "Black",
        Value: 400,
        Effect: {
            effectType: {
                type: "Magic",
                attack: "Mute"
            },
            amount: 80
        },
        Description: "A potent scroll that unleashes a wordless dampening aura, leaving the target speechless and unable to use verbal talents.",
        Filename: "0106_scrolls.png",
        Type: "Scroll"
    }
]



const countScrollColors = countColors(scrolls)

const totalScrolls = scrolls.length

const scrollsMetaInfo = {
    totalScrolls,
    scrollCounts: countScrollColors
};


const scrollsDescripObj = {
    Purple: "Raise Self Physical Defense Scrolls: Temporarily enhance the user's physical defense, making them more resistant to physical attacks.",
    Blue: "Raise Self Magical Defense Scrolls: Temporarily increase the user's magical defense, improving their resistance to magic spells and abilities.",
    Green: "Raise Self Magical Attack Scrolls: Temporarily boost the user's magical attack power, allowing them to deal more damage with magic spells and abilities.",
    Red: "Raise Self Physical Attack Scrolls: Temporarily increase the user's physical offense, allowing them to deal more damage with physical attacks.",
    Aqua: "Lower Opponents Physical Defense Scrolls: Temporarily weaken an opponent's physical defense, making them more susceptible to physical damage.",
    Orange: "Lower Opponents Magic Defense Scrolls: Temporarily diminish an opponent's magical defense, making them more vulnerable to magical attacks.",
    Pink: "Remove Invincibility Scrolls: Strip a target of their invincibility or immunities, making them susceptible to damage and other effects.",
    Black: "Do Magic Attack Scrolls: Unleash a magical attack with specific effects based on the subcategory."
};

const mergeScrollCountsAndDescriptions = (scrollCounts, scrollsDescripObj) => {
    const updatedScrollCounts = Object.entries(scrollCounts).map(([color, count]) => ({
        [color]: {
            count: count,
            description: scrollsDescripObj[color]
        }
    }));
    const combinedScrollCounts = Object.assign({}, ...updatedScrollCounts);
    return combinedScrollCounts;
};


scrollsMetaInfo.scrollCounts = mergeScrollCountsAndDescriptions(scrollsMetaInfo.scrollCounts, scrollsDescripObj);
module.exports = {
    scrolls,
    scrollsMetaInfo
};