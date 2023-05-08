class Gun {
    constructor(magSize, bullSpread, fireRate, totalAmmo, damage, reloadTime) {
        this.magSize = magSize;
        this.bullSpread = bullSpread;
        this.fireRate = fireRate;
        this.totalAmmo = totalAmmo;
        this.damage = damage;
        this.leftInMag = magSize;
        this.reloadTime = reloadTime;
        this.reloadRunning = false;
    }


    shoot() {

        if (this.leftInMag > 0 && !this.reloadRunning) {
            this.leftInMag--;
            this.showAmmoInfo();
            let bulletPoint = document.querySelector(".bullet-point");
            let bulletPointPos = {
                x: bulletPoint.getBoundingClientRect().left + window.scrollX,
                y: bulletPoint.getBoundingClientRect().top + window.scrollY
            }


            // let offset = (Math.random() - 0.5) * Math.PI / this.gun.bullSpread;
            // přičíst offset pro spread
            let bullDirection = Math.atan2(mouseY - bulletPointPos.y, mouseX - bulletPointPos.x);



            let bullet = new Bullet(bulletPointPos.x, bulletPointPos.y, bullDirection, 15);
            bullet.createBullet();

            game.player.bullets.push(bullet);
        }

    }

    showAmmoInfo() {
        let ammoInfoEl = document.getElementById("ammoInfoText").innerHTML = `${this.leftInMag} / ${this.totalAmmo}`;
        if (this.leftInMag === 0 && this.totalAmmo !== 0) {
            this.reload();
        }
    }


    reload() {
        if (!this.reloadRunning && this.leftInMag !== this.magSize && this.totalAmmo !== 0) {
            this.reloadRunning = true;

            let reloadTimeout = setTimeout(() => {
                if (this.leftInMag < this.magSize) {
                    if (this.totalAmmo > this.magSize) {
                        this.totalAmmo -= this.magSize - this.leftInMag;
                        this.leftInMag += this.magSize - this.leftInMag;
                    } else {
                        this.leftInMag = this.totalAmmo;
                        this.totalAmmo = 0;
                    }
                }

                this.showAmmoInfo()
                this.reloadRunning = false
            }, this.reloadTime * 1000)

            let msToEnd = this.reloadTime * 1000;
            const timerEnd = new Date().getTime() + (this.reloadTime * 1000);

            const myTimeout = setInterval(() => {
                msToEnd = timerEnd - new Date().getTime();
                let reloadTimeEl = document.getElementById("reloadTimer").innerHTML = `${Math.abs((msToEnd / 1000).toFixed(2))}s`;
                if ((msToEnd / 1000).toFixed(2) <= 0) document.getElementById("reloadTimer").innerHTML = ` `;
                if (msToEnd < 0) {
                    clearInterval(reloadTimeout)
                    clearInterval(myTimeout)
                }
            }, 100);
        }
    }

}