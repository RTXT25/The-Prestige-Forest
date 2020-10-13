addLayer("a",{
    startData() { return {
        unlocked: function(){return (hasUpgrade("p", 15)||(player.a.best.gte(1)))},
        points: new Decimal(0),
        best: 0
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

    layerShown() {return (hasUpgrade("p", 15)||(player.a.best.gte(1)))}, 
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
        }
    },
    tabFormat: {
        "Main": {
            content: ["main-display",["prestige-button",function() {return "Compress your energy into "}], "milestones"]
        },
        "Upgrades": {
            unlocked:function() {return hasMilestone("a", 1)},
            content: ["upgrades"]
        }
    },
    upgrades: {
        rows: 1,
        cols: 2,
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
        }
    },
    hotkeys: [
        {key: "a", description: "A: Reset for atoms", onPress(){if (player[this.layer].unlocked()) doReset(this.layer)}}
    ],
})