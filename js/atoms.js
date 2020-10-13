addLayer("a",{
    startData() { return {
        unl: function(){hasUpg("p",15)},
        points: new Decimal(0),
        best: 0
    }},
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

    layerShown() {return (hasUpg("p", 15)||(player.a.best.gte(1)))}, 
    baseAmount() {return (player.points)},
    milestones: {
        0: {
            requirementDesc: "1 Atom",
            effectDesc: "Unlock a new row of Particle Upgrades and raise particle gain by 1.5",
            done: function() {return player.a.best.gte(1)}
        }
    },
})