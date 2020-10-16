addLayer("c", {
    name: "Chemicals",
    resource: "Chemical Synthesizers",
    row: 1,
    color:() => "#DC143C",
    baseResource: "atoms",
    baseAmount() {return player.a.points},
    requires:() => new Decimal(11),
    type: "normal",
    exponent: 0.75,
    gainMult() {
        let value = new Decimal(1)
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        return value
    },
    hotkeys: [
        {key: "c", description: "C: Reset for chemicals", onPress(){if (player[this.layer].unlocked()) doReset(this.layer)}}
    ],
    layerShown: function(){return (hasMilestone("a", 4)||(player.c.best.gte(1)))},
    resetDescription: "Bond atoms toghether for ",
    startData() { return {
        unlocked: function(){return (hasMilestone("a", 4)||(player.c.best.gte(1)))},
        points: new Decimal(0),
        best: 0
    }},
})