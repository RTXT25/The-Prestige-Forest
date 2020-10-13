addLayer("p", {
    milestones: {
        0: {
            title: "The Reactor",
            effectDescription: "Allows you to activate the reactor, losing 5% of your particles per second but you gain a boost based on total particles lost",
            done: function() {return hasUpgrade("p", 15)},
            unlocked: function() {return hasUpgrade("p", 15)},
            toggles: [["p", "reactor"]],
        },
        1: {
            title: "The Compressor",
            effectDescription: "Allows you to activate the compressor, losing 50% of your energy per second but you gain a boost to particles based on total particles lost",
            done: function() {return hasUpgrade("p", 25)},
            unlocked: function() {return hasUpgrade("p", 25)},
            toggles: [["p", "compressor"]],
        }
    },
    resetDescription: "Change the energies form for ",
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        reactor: false,
        amtsacrificed: new Decimal(0),
        compressor: false,
        amtcompressed: new Decimal(0)
    }},
    name: "Particles",
    color:() => "#FFFFFF",
    resource: "particles",
    row: 0,

    baseResource: "energy",
    baseAmount() {return player.points},

    requires:() => new Decimal(10),
    type: "normal",
    exponent: 0.5,

    gainMult() {
        let value = new Decimal(1)
        if (hasUpgrade("p", 14)) value = value.times(new Decimal(upgradeEffect("p", 14)))
        if (hasUpgrade("p",25)) value = value.times(upgradeEffect("p",25))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        if (hasMilestone("a", 0)) value = value.times(1.5)
        return value
    },

    layerShown() {return true}, 

    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Generator",
            cost: new Decimal(1),
            description: "Gain 1 point per second",
        },
        12: {
            title: "Particle Smasher",
            description: "Particles are now being smashed together multiplying energy gain",
            cost: new Decimal(1),
            effect: function() {
                return (player.p.points.add(2).pow(0.5))
            },
            unlocked:function() {return hasUpgrade("p",11)}
        },
        13: {
            title: "Gravity",
            description: "Energy is now drawn towards the generator, making it stronger (boost starts at around 30)",
            cost: new Decimal(10),
            effect: function() {
                if (hasUpgrade("p",24)) {
                    if (player.points.lessThan(1)) return 1
                    let logamt = new Decimal("1000").div(player.points.pow(1.05)).add(1.001)
                    let value = player.points.log(logamt).add(2).pow(1.15)
                    if (value.lessThan(2)) return 2
                    return value
                }
                if (hasUpgrade("p",22)) {
                    if (player.points.lessThan(1)) return 1
                    let logamt = new Decimal("1000").div(player.points.pow(1.01)).add(1.001)
                    let value = player.points.log(logamt).add(2).pow(1.05)
                    if (value.lessThan(2)) return 2
                    return value
                }
                if (player.points.lessThan(1)) return 1
                let logamt = new Decimal("1000").div(player.points.root(1.01)).add(1.05)
                let value = player.points.log(logamt).add(2)
                if (value.lessThan(2)) return 2
                return value
            },
            unlocked:function() {return hasUpgrade("p",12)}
        },
        14: {
            title: "The Gravitator",
            description: "Uses gravity to create more particles",
            cost: new Decimal(25),
            effect: function() {
                if (hasUpgrade("p",24)) {
                    let value = new Decimal(upgradeEffect("p", 13)).pow((.85))
                    if (value.lessThan(1)) return 1
                    return value
                }
                if (hasUpgrade("p",23)) {
                    let value = new Decimal(upgradeEffect("p", 13)).pow((.75))
                    if (value.lessThan(1)) return 1
                    return value
                }
                let value = new Decimal(upgradeEffect("p", 13)).pow((.5))
                if (value.lessThan(1)) return 1
                return value
            },
            unlocked:function() {return hasUpgrade("p",13)}
        },
        15: {
            title: "Fission Reactor",
            description: "Unlock the ability to split particles apart for a big energy gain buff",
            cost: new Decimal(250),
            effect: function() {
                if (player.p.amtsacrificed.lessThan(1)) {return 1}
                if (hasUpgrade("p",24)) {
                    return player.p.amtsacrificed.log(1.005).times(10)
                }
                if (hasUpgrade("p",21)) {return player.p.amtsacrificed.log(1.01).times(10)}
                return player.p.amtsacrificed.log(1.05).times(10)
            },
            unlocked:function() {return hasUpgrade("p",14)}
        },
        21: {
            title: "Powerfull Fission",
            description: "The formula For the reactor effect is improved",
            cost: new Decimal("1e12"),
            unlocked:function() {return ((player.a.best.gte(1))&&(hasUpgrade("p",15)))}
        },
        22: {
            title: "Make Gravity Stronger",
            description: "The gravity formula is improved",
            cost: new Decimal("1e13"),
            unlocked:function() {return ((player.a.best.gte(1))&&(hasUpgrade("p",21)))}
        },
        23: {
            title: "Add Dark Energy The Gravitator Walls",
            description: "The gravitator formula is improved",
            cost: new Decimal("1e18"),
            unlocked:function() {return ((player.a.best.gte(1))&&(hasUpgrade("p",22)))}
        },
        24: {
            title: "The Improver",
            description: "Make this rows upgrades better",
            cost: new Decimal("1e21"),
            unlocked:function() {return ((player.a.best.gte(1))&&(hasUpgrade("p",23)))}
        },
        25: {
            title: "The Compresser",
            description: "Compresses Your Particles",
            cost: new Decimal("1e24"),
            effect: function () {return player.p.amtcompressed.add(1).log(2).add(1)},
            unlocked:function() {return ((player.a.best.gte(1))&&(hasUpgrade("p",24)))}
        }
    },
    hotkeys: [
        {key: "p", description: "P: Reset for particles", onPress(){if (player[this.layer].unlocked) doReset(this.layer)}}
    ],
    branches: ["a"]
})