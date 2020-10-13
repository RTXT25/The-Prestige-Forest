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
            done: function() {return false /*player.a.best.gte(2)*/},
            unlocked: function() {return false}
        }
    },
    tabFormat: {
        "Main": {
            content: ["main-display",["prestige-button",function() {return "Compress your energy into "}], "milestones"]
        },
        "Not Main": {
            unlocked: function() {return false},
            content: ["milestones"]
        }
    },
    hotkeys: [
        {key: "a", description: "A: Reset for atoms", onPress(){if (player[this.layer].unlocked()) doReset(this.layer)}}
    ],
})