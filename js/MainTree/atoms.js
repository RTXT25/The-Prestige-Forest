addLayer("a",{
    startData() { return {
        unlocked: function(){return (hasUpgrade("p", 15)||(player.a.best.gte(1)))},
        points: new Decimal(0),
        best: new Decimal(0)
    }},
    resetDescription: "Compress energy for ",
    resource: "atoms",
    color:() => "#17E6F0",
    row: 1,
    requires:() => new Decimal("1e11"),
    type: "static",
    exponent: 1,
    base: new Decimal(1e15),
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        return new Decimal(1)
    },

    baseResource: "energy",
    canBuyMax: function() {return false},

    layerShown() {return (hasUpgrade("p", 15)||(player.a.best.gte(1))||(player.c.best.gte(1)))}, 
    baseAmount() {return (player.points)},
    milestones: {
        0: {
            requirementDescription: "1 Atom",
            effectDescription: "Unlock a new row of Particle Upgrades and raise particle gain by 1.5",
            done: function() {return player.a.best.gte(1)}
        },
        1: {
            requirementDescription: "2 Atoms",
            effectDescription: "Unlock a new row of Particle Upgrades and unlock atom upgrades",
            done: function() {return player.a.best.gte(2)},
        },
        2: {
            requirementDescription: "3 Atoms",
            effectDescription: "Keep particle upgrades on reset",
            done: function() {return player.a.best.gte(3)},
        },
        3: {
            requirementDescription: "4 Atoms",
            effectDescription: "Unlock the next atom upgrade and the atom buff",
            done: function() {return player.a.best.gte(4)},
        },
        4: {
            requirementDescription: "5 Atoms",
            effectDescription: "Gain 100% of particle gain every second and unlock an atom upgrade",
            done: function() {return player.a.best.gte(5)},
        },
    },
    tabFormat: {
        "Main": {
            content: ["main-display",["prestige-button",function() {return "Compress your energy into "}],"best", "milestones"]
        },
        "Upgrades": {
            unlocked:function() {return hasMilestone("a", 1)},
            content: ["upgrades"]
        }
    },
    upgrades: {
        rows: 1,
        cols: 4,
        11: {
            cost: new Decimal(2),
            title: "The atomizer",
            description: "Boosts particle gain based on atoms",
            effect: function() {
                return player.a.points.add(2).pow(1.5)
            },
            unlocked:function() {return hasMilestone("a", 1)}
        },
        12: {
            cost: new Decimal(4),
            title: "The Energiser",
            description: "Boosts energy gain based on atoms",
            effect: function() {
                return player.a.points.add(2).pow(1.5)
            },
            unlocked:function() {return (hasMilestone("a", 1)&&(hasUpgrade("a",11)))}
        },
        13: {
            cost: new Decimal(6),
            title: "More Mass = MUCH More Gravity",
            description: "Atoms now boost gravity",
            effect: function() {
                return player.a.points.add(1).pow(.31)
            },
            unlocked:function() {return (hasMilestone("a", 3)&&(hasUpgrade("a",12)))}
        },
        14: {
            cost: new Decimal(10),
            title: "The Gravitator Is At 110% Efficiency",
            description: "The Gravitator is now stronger than gravity",
            unlocked:function() {return (hasMilestone("a", 4)&&(hasUpgrade("a",13)))}
        }
    },

    hotkeys: [
        {key: "a", description: "A: Reset for atoms", onPress(){if (player[this.layer].unlocked()) doReset(this.layer)}}
    ],
    effect: function() {
        if (hasMilestone("a",3)) return player.a.points.add(1).pow(0.30)
        else return 1
    },
    effectDescription: function() {
        if (hasMilestone("a",3)) return ("raising the reactor and compressor buff by " + this.effect().toString())
    },
    branches: ["c"],
    doReset(resettingLayer) {
        if (resettingLayer == "c") {
            layerDataReset("a")
            layerDataReset("p")
        }
    }
})
