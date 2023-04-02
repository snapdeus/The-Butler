const potions = [
    {
        Name: "Energizing Orange Potion",
        Color: "Orange",
        Value: 90,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 45,
        },
        Description: "An invigorating potion crafted from exotic plants, known to replenish the AP Meter by 45 points.",
        Filename: "0001_potions.png",
        Type: "Potion"
    },
    {
        Name: "Recharging Orange Potion",
        Color: "Orange",
        Value: 300,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 80,
        },
        Description: "A potent elixir synthesized from powerful crystals, capable of restoring the AP Meter by 80 points.",
        Filename: "0002_potions.png",
        Type: "Potion"
    },
    {
        Name: "Revitalizing Orange Potion",
        Color: "Orange",
        Value: 45,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 20,
        },
        Description: "A refreshing potion distilled from pristine waters, replenishing the AP Meter by 20 points.",
        Filename: "0003_potions.png",
        Type: "Potion"
    },
    {
        Name: "Empowering Orange Potion",
        Color: "Orange",
        Value: 475,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 100,
        },
        Description: "A legendary potion imbued with the essence of pure energy, fully replenishing the AP Meter by 100 points.",
        Filename: "0004_potions.png",
        Type: "Potion"
    },
    {
        Name: "Intense Red Potion",
        Color: "Red",
        Value: 85,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 55,
        },
        Description: "A fiery potion infused with the power of ancient warriors, enhancing Physical Attack by 55 points.",
        Filename: "0005_potions.png",
        Type: "Potion"
    },
    {
        Name: "Fierce Red Potion",
        Color: "Red",
        Value: 310,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 90,
        },
        Description: "A potent potion blended with the essence of renowned fighters, increasing Physical Attack by 90 points.",
        Filename: "0006_potions.png",
        Type: "Potion"
    },
    {
        Name: "Bold Red Potion",
        Color: "Red",
        Value: 48,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 20,
        },
        Description: "A daring potion distilled from potent herbs, raising Physical Attack by 20 points.",
        Filename: "0007_potions.png",
        Type: "Potion"
    },
    {
        Name: "Raging Red Potion",
        Color: "Red",
        Value: 480,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 100,
        },
        Description: "A legendary potion harnessing the power of the mightiest warriors, increasing Physical Attack by 100 points.",
        Filename: "0008_potions.png",
        Type: "Potion"
    },
    {
        Name: "Reviving Orange Potion",
        Color: "Orange",
        Value: 115,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 60,
        },
        Description: "A potent potion crafted from energizing ingredients, known to replenish the AP Meter by 60 points.",
        Filename: "0009_potions.png",
        Type: "Potion"
    },
    {
        Name: "Infusing Orange Potion",
        Color: "Orange",
        Value: 220,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 70,
        },
        Description: "A rejuvenating potion formulated with rare compounds, capable of restoring the AP Meter by 70 points.",
        Filename: "0010_potions.png",
        Type: "Potion"
    },
    {
        Name: "Restoring Orange Potion",
        Color: "Orange",
        Value: 60,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 25,
        },
        Description: "A soothing potion brewed from healing herbs, replenishing the AP Meter by 25 points.",
        Filename: "0011_potions.png",
        Type: "Potion"
    },
    {
        Name: "Invigorating Orange Potion",
        Color: "Orange",
        Value: 480,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 95,
        },
        Description: "An extraordinary potion imbued with potent energy, significantly replenishing the AP Meter by 95 points.",
        Filename: "0012_potions.png",
        Type: "Potion"
    },
    {
        Name: "Dynamic Orange Potion",
        Color: "Orange",
        Value: 110,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 55,
        },
        Description: "An energizing potion made with powerful roots, replenishing the AP Meter by 55 points.",
        Filename: "0013_potions.png",
        Type: "Potion"
    },
    {
        Name: "Effervescent Orange Potion",
        Color: "Orange",
        Value: 420,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 85,
        },
        Description: "A bubbling potion brewed with enchanted gemstones, restoring the AP Meter by 85 points.",
        Filename: "0014_potions.png",
        Type: "Potion"
    },
    {
        Name: "Guarding Blue Potion",
        Color: "Blue",
        Value: 130,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 60,
        },
        Description: "A protective potion infused with magical barriers, increasing Magic Defense by 60 points.",
        Filename: "0015_potions.png",
        Type: "Potion"
    },
    {
        Name: "Elemental Orange Potion",
        Color: "Orange",
        Value: 75,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 28,
        },
        Description: "An earthy potion blended with elemental ingredients, replenishing the AP Meter by 28 points.",
        Filename: "0016_potions.png",
        Type: "Potion"
    },
    {
        Name: "Stabilizing Orange Potion",
        Color: "Orange",
        Value: 350,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 93,
        },
        Description: "A well-balanced potion known for its ability to restore harmony, replenishing the AP Meter by 93 points.",
        Filename: "0017_potions.png",
        Type: "Potion"
    },
    {
        Name: "Vibrant Orange Potion",
        Color: "Orange",
        Value: 60,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 30,
        },
        Description: "A bright and lively potion with revitalizing properties, replenishing the AP Meter by 30 points.",
        Filename: "0018_potions.png",
        Type: "Potion"
    },
    {
        Name: "Harmonizing Orange Potion",
        Color: "Orange",
        Value: 180,
        Effect: {
            effectType: "Replenish AP Meter",
            amount: 65,
        },
        Description: "A calming potion brewed to restore balance, replenishing the AP Meter by 65 points.",
        Filename: "0019_potions.png",
        Type: "Potion"
    },
    {
        Name: "Enchanting Green Potion",
        Color: "Green",
        Value: 80,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 53,
        },
        Description: "A potent potion infused with magical energy, increasing Magic Attack by 53 points.",
        Filename: "0020_potions.png",
        Type: "Potion"
    },
    {
        Name: "Mystic Green Potion",
        Color: "Green",
        Value: 400,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 94,
        },
        Description: "A mysterious potion brewed by ancient sages, raising Magic Attack by 94 points.",
        Filename: "0021_potions.png",
        Type: "Potion"
    },
    {
        Name: "Arcane Green Potion",
        Color: "Green",
        Value: 50,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 22,
        },
        Description: "A potion crafted from rare eldritch ingredients, increasing Magic Attack by 22 points.",
        Filename: "0022_potions.png",
        Type: "Potion"
    },
    {
        Name: "Spellbinding Green Potion",
        Color: "Green",
        Value: 240,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 78,
        },
        Description: "An enthralling potion that enhances the caster's abilities, raising Magic Attack by 78 points.",
        Filename: "0023_potions.png",
        Type: "Potion"
    },
    {
        Name: "Otherworldly Green Potion",
        Color: "Green",
        Value: 450,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 99,
        },
        Description: "A transcendent potion that unlocks hidden sources of magical power, increasing Magic Attack by 99 points.",
        Filename: "0024_potions.png",
        Type: "Potion"
    },
    {
        Name: "Ethereal Green Potion",
        Color: "Green",
        Value: 70,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 35,
        },
        Description: "A potion distilled from spiritual energies, raising Magic Attack by 35 points.",
        Filename: "0025_potions.png",
        Type: "Potion"
    },
    {
        Name: "Astral Green Potion",
        Color: "Green",
        Value: 320,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 84,
        },
        Description: "An out-of-this-world potion that empowers spellcasters, boosting Magic Attack by 84 points.",
        Filename: "0026_potions.png",
        Type: "Potion"
    },
    {
        Name: "Sorcerous Green Potion",
        Color: "Green",
        Value: 30,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 12,
        },
        Description: "An enchanted potion crafted by skilled magicians, increasing Magic Attack by 12 points.",
        Filename: "0027_potions.png",
        Type: "Potion"
    },
    {
        Name: "Eldritch Green Potion",
        Color: "Green",
        Value: 390,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 91,
        },
        Description: "A potion that draws its power from ancient knowledge, raising Magic Attack by 91 points.",
        Filename: "0028_potions.png",
        Type: "Potion"
    },
    {
        Name: "Alchemic Green Potion",
        Color: "Green",
        Value: 200,
        Effect: {
            effectType: "Raise Magic Attack",
            amount: 58,
        },
        Description: "A potion brewed through an intricate alchemical process, boosting Magic Attack by 58 points.",
        Filename: "0029_potions.png",
        Type: "Potion"
    },
    {
        Name: "Healing Aqua Potion",
        Color: "Aqua",
        Value: 95,
        Effect: {
            effectType: "Replenish HP",
            amount: 54,
        },
        Description: "A rejuvenating potion made from healing plants, known to replenish HP by 54 points.",
        Filename: "0030_potions.png",
        Type: "Potion"
    },
    {
        Name: "Revitalizing Aqua Potion",
        Color: "Aqua",
        Value: 425,
        Effect: {
            effectType: "Replenish HP",
            amount: 92,
        },
        Description: "A powerful potion crafted with potent ingredients, able to restore HP by 92 points.",
        Filename: "0031_potions.png",
        Type: "Potion"
    },
    {
        Name: "Soothing Aqua Potion",
        Color: "Aqua",
        Value: 60,
        Effect: {
            effectType: "Replenish HP",
            amount: 25,
        },
        Description: "A calming potion made from serene waters, replenishing HP by 25 points.",
        Filename: "0032_potions.png",
        Type: "Potion"
    },
    {
        Name: "Curative Aqua Potion",
        Color: "Aqua",
        Value: 250,
        Effect: {
            effectType: "Replenish HP",
            amount: 80,
        },
        Description: "An invigorating potion with natural healing properties, restoring HP by 80 points.",
        Filename: "0033_potions.png",
        Type: "Potion"
    },
    {
        Name: "Restorative Aqua Potion",
        Color: "Aqua",
        Value: 480,
        Effect: {
            effectType: "Replenish HP",
            amount: 97,
        },
        Description: "A restorative potion crafted from enchanted ingredients, able to replenish HP by 97 points.",
        Filename: "0034_potions.png",
        Type: "Potion"
    },
    {
        Name: "Mending Aqua Potion",
        Color: "Aqua",
        Value: 75,
        Effect: {
            effectType: "Replenish HP",
            amount: 35,
        },
        Description: "A restoring potion brewed with medicinal herbs, mending wounds and replenishing HP by 35 points.",
        Filename: "0035_potions.png",
        Type: "Potion"
    },
    {
        Name: "Nurturing Aqua Potion",
        Color: "Aqua",
        Value: 300,
        Effect: {
            effectType: "Replenish HP",
            amount: 85,
        },
        Description: "A nurturing potion infused with the essence of life, replenishing HP by 85 points.",
        Filename: "0036_potions.png",
        Type: "Potion"
    },
    {
        Name: "Renewing Aqua Potion",
        Color: "Aqua",
        Value: 30,
        Effect: {
            effectType: "Replenish HP",
            amount: 10,
        },
        Description: "A gentle potion infused with subtle healing energy, renewing HP by 10 points.",
        Filename: "0037_potions.png",
        Type: "Potion"
    },
    {
        Name: "Recovering Aqua Potion",
        Color: "Aqua",
        Value: 370,
        Effect: {
            effectType: "Replenish HP",
            amount: 89,
        },
        Description: "A potent potion capable of healing even the most severe injuries, replenishing HP by 89 points.",
        Filename: "0038_potions.png",
        Type: "Potion"
    },
    {
        Name: "Vitalizing Aqua Potion",
        Color: "Aqua",
        Value: 220,
        Effect: {
            effectType: "Replenish HP",
            amount: 73,
        },
        Description: "A revitalizing potion designed to enhance well-being, increasing HP by 73 points.",
        Filename: "0039_potions.png",
        Type: "Potion"
    },
    {
        Name: "Mystical Blue Potion",
        Color: "Blue",
        Value: 200,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 50
        },
        Description: "A mystical potion that raises your Magic Defense by 50 points.",
        Filename: "00040_potions.png",
        Type: "Potion"
    },
    {
        Name: "Soothing Blue Potion",
        Color: "Blue",
        Value: 400,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 80
        },
        Description: "A soothing potion that increases your Magic Defense by 80 points.",
        Filename: "00041_potions.png",
        Type: "Potion"
    },
    {
        Name: "Tranquil Blue Potion",
        Color: "Blue",
        Value: 100,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 25
        },
        Description: "A tranquil potion that boosts your Magic Defense by 25 points.",
        Filename: "00042_potions.png",
        Type: "Potion"
    },
    {
        Name: "Guardian Blue Potion",
        Color: "Blue",
        Value: 250,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 55
        },
        Description: "A guardian potion that improves your Magic Defense by 55 points.",
        Filename: "00043_potions.png",
        Type: "Potion"
    },
    {
        Name: "Serene Blue Potion",
        Color: "Blue",
        Value: 150,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 40
        },
        Description: "A serene potion that enhances your Magic Defense by 40 points.",
        Filename: "00044_potions.png",
        Type: "Potion"
    },
    {
        Name: "Dazzling Blue Potion",
        Color: "Blue",
        Value: 450,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 90
        },
        Description: "A dazzling potion that increases your Magic Defense by 90 points.",
        Filename: "00045_potions.png",
        Type: "Potion"
    },
    {
        Name: "Sheltering Blue Potion",
        Color: "Blue",
        Value: 300,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 60
        },
        Description: "A sheltering potion that boosts your Magic Defense by 60 points.",
        Filename: "00046_potions.png",
        Type: "Potion"
    },
    {
        Name: "Ethereal Blue Potion",
        Color: "Blue",
        Value: 50,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 20
        },
        Description: "An ethereal potion that improves your Magic Defense by 20 points.",
        Filename: "00047_potions.png",
        Type: "Potion"
    },
    {
        Name: "Fortifying Blue Potion",
        Color: "Blue",
        Value: 350,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 65
        },
        Description: "A fortifying potion that strengthens your Magic Defense by 65 points.",
        Filename: "00048_potions.png",
        Type: "Potion"
    },
    {
        Name: "Empowering Blue Potion",
        Color: "Blue",
        Value: 500,
        Effect: {
            effectType: "Raise Magic Defense",
            amount: 100
        },
        Description: "An empowering potion that enhances your Magic Defense by 100 points.",
        Filename: "00049_potions.png",
        Type: "Potion"
    },
    {
        Name: "Sturdy Purple Potion",
        Color: "Purple",
        Value: 200,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 50
        },
        Description: "A sturdy potion that raises your Physical Defense by 50 points.",
        Filename: "00050_potions.png",
        Type: "Potion"
    },
    {
        Name: "Resilient Purple Potion",
        Color: "Purple",
        Value: 400,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 80
        },
        Description: "A resilient potion that increases your Physical Defense by 80 points.",
        Filename: "00051_potions.png",
        Type: "Potion"
    },
    {
        Name: "Durable Purple Potion",
        Color: "Purple",
        Value: 100,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 25
        },
        Description: "A durable potion that boosts your Physical Defense by 25 points.",
        Filename: "00052_potions.png",
        Type: "Potion"
    },
    {
        Name: "Impenetrable Purple Potion",
        Color: "Purple",
        Value: 250,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 55
        },
        Description: "An impenetrable potion that improves your Physical Defense by 55 points.",
        Filename: "00053_potions.png",
        Type: "Potion"
    },
    {
        Name: "Unyielding Purple Potion",
        Color: "Purple",
        Value: 150,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 40
        },
        Description: "An unyielding potion that enhances your Physical Defense by 40 points.",
        Filename: "00054_potions.png",
        Type: "Potion"
    },
    {
        Name: "Fortress Purple Potion",
        Color: "Purple",
        Value: 450,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 90
        },
        Description: "A fortress potion that increases your Physical Defense by 90 points.",
        Filename: "00055_potions.png",
        Type: "Potion"
    },
    {
        Name: "Reinforced Purple Potion",
        Color: "Purple",
        Value: 300,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 60
        },
        Description: "A reinforced potion that boosts your Physical Defense by 60 points.",
        Filename: "00056_potions.png",
        Type: "Potion"
    },
    {
        Name: "Adamant Purple Potion",
        Color: "Purple",
        Value: 50,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 20
        },
        Description: "An adamant potion that improves your Physical Defense by 20 points.",
        Filename: "00057_potions.png",
        Type: "Potion"
    },
    {
        Name: "Unbreakable Purple Potion",
        Color: "Purple",
        Value: 350,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 65
        },
        Description: "An unbreakable potion that strengthens your Physical Defense by 65 points.",
        Filename: "00058_potions.png",
        Type: "Potion"
    },
    {
        Name: "Invulnerable Purple Potion",
        Color: "Purple",
        Value: 500,
        Effect: {
            effectType: "Raise Physical Defense",
            amount: 100
        },
        Description: "An invulnerable potion that enhances your Physical Defense by 100 points.",
        Filename: "00059_potions.png",
        Type: "Potion"
    },
    {
        Name: "Invincible Potion",
        Color: "Pink",
        Value: 480,
        Effect: {
            effectType: "Become Invincible",
            amount: 95
        },
        Description: "A powerful potion that grants the user temporary invincibility for a short period.",
        Filename: "00060_potions.png",
        Type: "Potion"
    },
    {
        Name: "Untouchable Potion",
        Color: "Pink",
        Value: 320,
        Effect: {
            effectType: "Become Invincible",
            amount: 60
        },
        Description: "A mystical potion that provides the user with invincibility for a limited time.",
        Filename: "00061_potions.png",
        Type: "Potion"
    },
    {
        Name: "Impervious Potion",
        Color: "Pink",
        Value: 280,
        Effect: {
            effectType: "Become Invincible",
            amount: 53
        },
        Description: "An extraordinary potion that makes the user invincible, warding off harm.",
        Filename: "00062_potions.png",
        Type: "Potion"
    },
    {
        Name: "Unbreakable Potion",
        Color: "Pink",
        Value: 460,
        Effect: {
            effectType: "Become Invincible",
            amount: 90
        },
        Description: "A potent potion that grants the user an invincible state for a short duration.",
        Filename: "00063_potions.png",
        Type: "Potion"
    },
    {
        Name: "Adamantine Potion",
        Color: "Pink",
        Value: 200,
        Effect: {
            effectType: "Become Invincible",
            amount: 30
        },
        Description: "A formidable potion that renders the user invulnerable to incoming attacks.",
        Filename: "00064_potions.png",
        Type: "Potion"
    },
    {
        Name: "Shielding Potion",
        Color: "Pink",
        Value: 400,
        Effect: {
            effectType: "Become Invincible",
            amount: 75
        },
        Description: "A protective potion that offers the user an invincible state, shielding from damage.",
        Filename: "00065_potions.png",
        Type: "Potion"
    },
    {
        Name: "Divine Potion",
        Color: "Pink",
        Value: 350,
        Effect: {
            effectType: "Become Invincible",
            amount: 64
        },
        Description: "A heavenly potion that grants the user invincibility for a brief period.",
        Filename: "00066_potions.png",
        Type: "Potion"
    },
    {
        Name: "Indestructible Potion",
        Color: "Pink",
        Value: 230,
        Effect: {
            effectType: "Become Invincible",
            amount: 40
        },
        Description: "An unyielding potion that bestows invincibility upon the user for a short time.",
        Filename: "00067_potions.png",
        Type: "Potion"
    },
    {
        Name: "Imperishable Potion",
        Color: "Pink",
        Value: 420,
        Effect: {
            effectType: "Become Invincible",
            amount: 80
        },
        Description: "A sustaining potion that preserves the user, making them invincible temporarily.",
        Filename: "00068_potions.png",
        Type: "Potion"
    },
    {
        Name: "Unyielding Potion",
        Color: "Pink",
        Value: 100,
        Effect: {
            effectType: "Become Invincible",
            amount: 10
        },
        Description: "A tenacious potion that bestows the gift of invincibility on the user during combat.",
        Filename: "00069_potions.png",
        Type: "Potion"
    },
    {
        Name: "Mighty Potion",
        Color: "Red",
        Value: 180,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 86
        },
        Description: "A bold potion with magical elements that increases the physical attack of the user by 86 points.",
        Filename: "00070_potions.png",
        Type: "Potion"
    },
    {
        Name: "Fierce Potion",
        Color: "Red",
        Value: 68,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 35
        },
        Description: "A vibrant red potion that harnesses the power to enhance the user's physical attack capability by 35 points.",
        Filename: "00071_potions.png",
        Type: "Potion"
    },
    {
        Name: "Rapid Potion",
        Color: "Red",
        Value: 395,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 93
        },
        Description: "An intense crimson potion filled with magical energy, giving a tremendous boost of 93 points to the physical attack.",
        Filename: "00072_potions.png",
        Type: "Potion"
    },
    {
        Name: "Vigorous Potion",
        Color: "Red",
        Value: 155,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 64
        },
        Description: "A lively red potion that fortifies the user's physical prowess, raising their physical attack by 64 points.",
        Filename: "00073_potions.png",
        Type: "Potion"
    },
    {
        Name: "Strong Potion",
        Color: "Red",
        Value: 217,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 78
        },
        Description: "A daring scarlet potion with arcane properties that bolsters the user's physical attack strength by 78 points.",
        Filename: "00074_potions.png",
        Type: "Potion"
    },
    {
        Name: "Ferocious Potion",
        Color: "Red",
        Value: 310,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 89
        },
        Description: "A fiery red potion that channels the fierce magic to amplify the user's physical attack by 89 points.",
        Filename: "00075_potions.png",
        Type: "Potion"
    },
    {
        Name: "Brave Potion",
        Color: "Red",
        Value: 425,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 95
        },
        Description: "This fierce ruby potion imbues the drinker with immense strength, boosting their physical attack by an incredible 95 points.",
        Filename: "00076_potions.png",
        Type: "Potion"
    },
    {
        Name: "Potent Potion",
        Color: "Red",
        Value: 283,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 81
        },
        Description: "A bright red potion that channels the raw energy of the arcane. It empowers the user's physical attack by 81 points.",
        Filename: "00077_potions.png",
        Type: "Potion"
    },
    {
        Name: "Gallant Potion",
        Color: "Red",
        Value: 127,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 56
        },
        Description: "A rich red potion that magnifies the user's physical prowess and attack ability by 56 points.",
        Filename: "00078_potions.png",
        Type: "Potion"
    },
    {
        Name: "Valiant Potion",
        Color: "Red",
        Value: 480,
        Effect: {
            effectType: "Raise Physical Attack",
            amount: 98
        },
        Description: "An exalted deep red potion infused with powerful magical energies that raises the user's physical attack by a staggering 98 points.",
        Filename: "00079_potions.png",
        Type: "Potion"
    },
    {
        Name: "Replenishing Potion",
        Color: "Orange",
        Value: 350,
        Effect: {
            effectType: "Replenish AP meter",
            amount: 85
        },
        Description: "An invigorating orange potion that restores the user's action power by 85 points.",
        Filename: "00080_potions.png",
        Type: "Potion"
    },
    {
        Name: "Revitalizing Potion",
        Color: "Orange",
        Value: 275,
        Effect: {
            effectType: "Replenish AP meter",
            amount: 75
        },
        Description: "A refreshing orange potion that magically refills the user's AP meter by 75 points.",
        Filename: "00081_potions.png",
        Type: "Potion"
    }

];


const countPotionColors = potions.reduce((acc, cur) => {
    if (acc[cur.Color]) {
        acc[cur.Color] = acc[cur.Color] + 1
    } else {
        acc[cur.Color] = 1
    }
    return acc;
}, {})

const totalPotions = potions.length

const potionsMetaInfo = {
    totalPotions,
    potionCounts: countPotionColors
};

module.exports = {
    potions,
    potionsMetaInfo
};