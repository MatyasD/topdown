class GearGenerator{
    constructor() {
        this.rarities = ["basic", "rare", "legendary"];
        this.gearNames = ["magazine", "boots", "torso", "gloves", "belt", "head"];
        this.gear = [];
    }

    generateGear(numOfGear){

        let createdGear = this.generateAttributes(numOfGear);

        for (let i = 0; i < numOfGear; i++) {
            if (createdGear.generatedGearNames[i] !== "magazine"){
                this.gear.unshift(new Gear(`gear/assets/${createdGear.generatedGearNames[i]}/${this.rarities[createdGear.generatedRarities[i]]}.png`, createdGear.hp[i], createdGear.speed[i],createdGear.generatedGearNames[i] ));

            }else {
                this.gear.unshift(new Magazine(`gear/assets/${createdGear.generatedGearNames[i]}/${this.rarities[createdGear.generatedRarities[i]]}.png`, createdGear.gun.magSize[i], createdGear.gun.bullSpread[i], createdGear.gun.fireRate[i], createdGear.gun.totalAmmo[i], createdGear.gun.damage[i], createdGear.gun.reloadTime[i]), this.gearNames[createdGear.generatedGearNames[i]]);
            }

        }

        this.gear = this.gear.filter(item => typeof item == "object");
        return this.gear;
    }

    getRarity(){
        let raritySum = 0;

        for (let i = 0; i < this.rarities.length; i++) {
            raritySum += i + 1;
        }
        let selectedRarity = Math.floor(Math.random() * raritySum) + 1;

        if (selectedRarity === 1) return 2;
        if (selectedRarity === 2 || selectedRarity === 3) return 1;
        if (selectedRarity === 4 || selectedRarity === 5 || selectedRarity === 6) return 0;
    }

    getGearName(){
        return this.gearNames[Math.floor(Math.random() * this.gearNames.length)];
    }

    generateAttributes(numOfGear){
        // nahradit generovanim v rozsahu

        let gear = {
             generatedRarities: [],
             generatedGearNames: [],
             hp: [],
             speed: [],
             gun: {
                 magSize: [],
                 bullSpread: [],
                 fireRate: [],
                 totalAmmo: [],
                 damage: [],
                 reloadTime: []
            }
        }

        for (let i = 0; i < numOfGear; i++) {
            gear.generatedRarities.push(this.getRarity());
            gear.generatedGearNames.push(this.getGearName());
            if (gear.generatedGearNames[i] !== "magazine"){
                gear.hp[i] = (gear.generatedRarities[i] + 1) * 10;
                if (gear.generatedGearNames[i] === "boots"){
                    gear.speed[i] = (gear.generatedRarities[i] + 1) * 2;
                }else{
                    gear.speed[i] = 0;
                }
            }else{
                // kod pro zbran; dalsi objekt do gear;
                gear.gun.magSize[i] = (gear.generatedRarities[i] + 2) * 10;
                // cim vice tim lepe
                gear.gun.bullSpread[i] = (gear.generatedRarities[i] + 1) * 2;
                // dodelat fire rate
                gear.gun.fireRate[i] = (gear.generatedRarities[i] + 1) * 1;

                gear.gun.totalAmmo[i] = (gear.generatedRarities[i] + 1) * 20;
                gear.gun.damage[i] = (gear.generatedRarities[i] + 1) * 3;
                gear.gun.reloadTime[i] = (4 - (gear.generatedRarities[i] + 1))
            }
        }
        return gear;
    }


}


 // let gear = [new Gear("gear/assets/torso/basic.png", 40, 0, "torso"),new Gear("gear/assets/gloves/legendary.png", 20, 0, "gloves") ]