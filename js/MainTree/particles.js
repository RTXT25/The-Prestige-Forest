addLayer("p", {
    clickables: {
        rows: 1,
        cols: 2,
        11: {
            title: "The Reactor",
            unlocked: function() {return true},
            display: function() {
                value = "Allows you to activate the reactor, losing 5% of your particles per second but you gain a boost based on total particles lost.\n" + "Currently: " + clickableEffect("p", 11)+ "\n "
                if (typeof getClickableState("p", 11) == "undefined") {setClickableState("p", 11, true)}
                if (getClickableState("p", 11)) {value += "On"}
                else {value += "Off"}
                return value
            },
            effect: function() {
                if (player.p.amtsacrificed.lessThan(1)) {return 1}
                if (hasUpgrade("p",31)) return player.p.amtsacrificed.log(1.001).times(10).pow(layers.a.effect())
                if (hasUpgrade("p",24)) {
                    return player.p.amtsacrificed.log(1.005).times(1).pow(layers.a.effect())
                }
                if (hasUpgrade("p",21)) return player.p.amtsacrificed.log(1.01).times(1).pow(layers.a.effect())
                return player.p.amtsacrificed.log(1.05).times(1)
            },
            canClick: function() {
                return true
            },
            onClick: function() {
                if (typeof getClickableState("p", 11) == "undefined") {setClickableState("p", 11, true)}
                setClickableState("p", 11, !getClickableState("p", 11))
            },
            style: {
                "height": "200px",
                "width": "200px",
                "border-radius": "25%",
                "border": "2px solid",
                "border-color": 'rgba(0, 0, 0, 0.125)',
                "font-size": '10px'
            }
        },
        12: {
            title: "The Compressor",
            display: function() {
                value = "Allows you to activate the compressor, losing 50% of your energy per second but you gain a boost to particles based on total energy lost\n" + "Currently: " + clickableEffect("p", 12)+ "\n "
                if (typeof getClickableState("p", 12) == "undefined") {setClickableState("p", 12, true)}
                if (getClickableState("p", 12)) {value += "On"}
                else {value += "Off"}
                return value
            },
            effect: function () {
                if (hasUpgrade("p",31)) return player.p.amtcompressed.add(1).log(1.8).add(2).pow(layers.a.effect())
                return player.p.amtcompressed.add(1).log(2).add(2).pow(layers.a.effect())
            },
            unlocked: function() {return hasUpgrade("p", 25)},
            canClick: function() {
                return true
            },
            onClick: function() {
                if (typeof getClickableState("p", 12) == "undefined") {setClickableState("p", 12, true)}
                setClickableState("p", 12, !getClickableState("p", 12))
            },
            style: {
                "height": "200px",
                "width": "200px",
                "border-radius": "25%",
                "border": "2px solid",
                "border-color": 'rgba(0, 0, 0, 0.125)',
                "font-size": '10px'
            }
        }
    },
    resetDescription: "Change the energy's form for ",
    startData() { return {
        unlocked: true,
        points: new Decimal(696969696696969696969696969696969696969696969),
        amtsacrificed: new Decimal(0),
        compressor: false,
        amtcompressed: new Decimal(0),
        clickables: {11: false, 12: false},
        best: new Decimal(0)
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
        if (hasUpgrade("p",25)) value = value.times(clickableEffect("p",12))
        if (hasUpgrade("a",11)) value = value.times(upgradeEffect("a", 11))
        return value
    },
    gainExp() {
        let value = new Decimal(1)
        if (hasMilestone("a", 0)) value = value.times(1.5)
        return value
    },

    layerShown() {return true}, 

    upgrades: {
        rows: 3,
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
                if (hasUpgrade("p",34)) return player.p.points.add(2).pow(0.75)
                return (player.p.points.add(2).pow(0.5))
            },
            unlocked:function() {return hasUpgrade("p",11)}
        },
        13: {
            title: "Gravity",
            description: "Energy is now drawn towards the generator, making it stronger (boost starts at around 30)",
            cost: new Decimal(10),
            effect: function() {
                if (hasUpgrade("p",32)) {
                    if (player.points.lessThan(1)) return 1
                    let logamt = new Decimal("1000").div(player.points.pow(1.25)).add(1.0001)
                    let value = player.points.log(logamt).add(2).pow(1.5)
                    if (hasUpgrade("a",13)) value = value.pow(upgradeEffect("a",13))
                    if (value.lessThan(2)) return 2
                    return value
                }
                if (hasUpgrade("p",24)) {
                    if (player.points.lessThan(1)) return 1
                    let logamt = new Decimal("1000").div(player.points.pow(1.05)).add(1.001)
                    let value = player.points.log(logamt).add(2).pow(1.15)
                    if (hasUpgrade("a",13)) value = value.pow(upgradeEffect("a",13))
                    if (value.lessThan(2)) return 2
                    return value
                }
                if (hasUpgrade("p",22)) {
                    if (player.points.lessThan(1)) return 1
                    let logamt = new Decimal("1000").div(player.points.pow(1.01)).add(1.001)
                    let value = player.points.log(logamt).add(2).pow(1.05)
                    if (hasUpgrade("a",13)) value = value.pow(upgradeEffect("a",13))
                    if (value.lessThan(2)) return 2
                    return value
                }
                if (player.points.lessThan(1)) return 1
                let logamt = new Decimal("1000").div(player.points.root(1.01)).add(1.05)
                let value = player.points.log(logamt).add(2)
                if (hasUpgrade("a",13)) value = value.pow(upgradeEffect("a",13))
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
                if (hasUpgrade("a",14)) {
                    let value = new Decimal(upgradeEffect("p", 13)).pow(1.10)
                    if (value.lessThan(1)) return 1
                    return value
                }
                if (hasUpgrade("p",33)) {
                    let value = new Decimal(upgradeEffect("p", 13)).pow((.90))
                    if (value.lessThan(1)) return 1
                    return value
                }
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
            unlocked:function() {return ((player.a.best.gte(1))&&(hasUpgrade("p",24)))}
        },
        31: {
            title: "Fission Even Stronger, Compression is easier",
            description: "The fission and compression formula is even stronger",
            cost: new Decimal("1e31"),
            unlocked:function() {return ((player.a.best.gte(2))&&(hasUpgrade("p",25)))}
        },
        32: {
            title: "Energy Is Now Part Of The Generator",
            description: "The Gravity Formula Is Better",
            cost: new Decimal("1e33"),
            unlocked:function() {return ((player.a.best.gte(2))&&(hasUpgrade("p",31)))}
        },
        33: {
            title: "The Gravitator Has A Newborn Star In The Center",
            description: "The gravitator formula is better",
            cost: new Decimal("1e44"),
            unlocked:function() {return ((player.a.best.gte(2))&&(hasUpgrade("p",32)))}
        },
        34: {
            title: "Revamp The Particle Smasher",
            description: "The particle smasher formula is better",
            cost: new Decimal("1e45"),
            unlocked:function() {return ((player.a.best.gte(2))&&(hasUpgrade("p",33)))}
        },
        35: {
            title: "Reactor & Compressor are INFINITE",
            description: "The 2 upgrades mentioned above dont remove your energy and particles",
            cost: new Decimal("1e67"),
            unlocked:function() {return ((player.a.best.gte(2))&&(hasUpgrade("p",34)))}
        }
    },
    hotkeys: [
        {key: "p", description: "P: Reset for particles", onPress(){if (player[this.layer].unlocked) doReset(this.layer)}}
    ],
    branches: ["a"],
    doReset(resettingLayer) {
        if (resettingLayer == "a") {
            if (hasMilestone("a", 2)) {
                layerDataReset("p", ["upgrades","clickables"])
            }
            else {
                layerDataReset("p")
            }
        }
    }
})
