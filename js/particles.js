addLayer("p", {
    milestones: {
        0: {
            title: "The Reactor",
            effectDesc: "Allows you to activate the reactor, losing one particle per second but you gain a boost based on total particles lost",
            done: function() {return hasUpg("p", 21)},
            unl: function() {return hasUpg("p", 21)},
            toggles: [["p", "reactor"]],
        }
    },
    startData() { return {
        unl: true,
        points: new Decimal(0),
        reactor: false,
        amtsacrificed: new Decimal(0),
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
        if (hasUpg("p", 14)) value = value.times(new Decimal(upgEffect("p", 14)))
        return value
    },
    gainExp() {
        return new Decimal(1)
    },

    layerShown() {return true}, 

    upgrades: {
        rows: 2,
        cols: 4,
        11: {
            title: "Generator",
            cost: new Decimal(1),
            desc: "Gain 1 point per second",
        },
        12: {
            title: "Particle Smasher",
            desc: "Particles are now being smashed together multiplying energy gain",
            cost: new Decimal(2),
            effect: function() {
                return (player.p.points.add(1).pow(0.5))
            }
        },
        13: {
            title: "Gravity",
            desc: "Energy is now drawn towards the generator, making it stronger (boost starts at around 30)",
            cost: new Decimal(10),
            effect: function() {
                if (player.points.lessThan(1)) return 1
                let logamt = new Decimal("1000").div(player.points.root(1.01)).add(1.05)
                let value = player.points.log(logamt)
                if (value.lessThan(1)) return 1
                return value
            }
        },
        14: {
            title: "The Gravitator",
            desc: "Uses gravity to create more particles",
            cost: new Decimal(50),
            effect: function() {
                let value = new Decimal(upgEffect("p", 13)).pow((1/3))
                if (value.lessThan(1)) return 1
                return value
            }
        },
        21: {
            title: "Fission Reactor",
            desc: "Unlock the ability to split particles apart for a big energy gain buff",
            cost: new Decimal(1000),
            effect: function() {
                if (player.p.amtsacrificed.lessThan(1)) {return 1}
                return player.p.amtsacrificed.pow(1.05)
            }
        },
    },
    hotkeys: [
        {key: "p", desc: "P: Reset for particles", onPress(){if (player[this.layer].unl) doReset(this.layer)}}
    ]
})