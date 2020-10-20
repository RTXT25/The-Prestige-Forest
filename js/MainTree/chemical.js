addLayer("c", {
    name: "Chemicals",
    resource: "Chemical Synthesizers",
    row: 1,
    color:() => "#DC143C",
    baseResource: "atoms",
    baseAmount() {return player.a.points},
    requires:() => new Decimal(11),
    type: "custom",
    canBuyMax() {
        return false
    },
    prestigeButtonText() {
        value = "Compress atoms together for " + layers.c.getResetGain().toString() + " Chemical Synthesizers <br>" + "Next at: " + layers.c.getNextAt().toString() + " atoms"
        return value
    },
    canReset() {
        if (player.a.points.gte(new Decimal(11).add(player.c.points.times(10)))) {return true}
        else {return false}
    },
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    getResetGain: function() {return new Decimal(1)},
    hotkeys: [
        {key: "c", description: "C: Reset for chemicals", onPress(){if (player[this.layer].unlocked()) doReset(this.layer)}}
    ],
    getNextAt() {
        return new Decimal(11).add(player.c.points.times(10))
    },
    layerShown: function(){return (hasMilestone("a", 4)||(player.c.best.gte(1)))},
    resetDescription: "Bond atoms toghether for ",
    startData() { return {
        unlocked: function(){return (hasMilestone("a", 4)||(player.c.best.gte(1)))},
        points: new Decimal(0),
        best: new Decimal(0)
    }},
    milestones: {
        0: {
            requirementDescription: "1 Chemical Synthesizer",
            effectDescription: "Unlock a new row of atom upgrades and unlock synthesis",
            done: function() {return player.c.best.gte(1)}
        },
    }
})