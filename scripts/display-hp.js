const MODULE_ID = 'display-hp';

function drawBars_Override() {
    if (!this.actor || (this.data.displayBars === CONST.TOKEN_DISPLAY_MODES.NONE)) return;
    ["bar1", "bar2"].forEach((b, i) => {

        if (this.hud?.bars || this.bars) {
            const bar = (this.hud?.bars[b] || this.bars[b]);
            const attr = this.document.getBarAttribute(b);
            if (!attr || (attr.type !== "bar")) return bar.visible = false;

            let number = i;
            let data = attr;

            const val = Number(data.value);
            const pct = Math.clamped(val, 0, data.max) / data.max;

            // Determine sizing
            let h = Math.max((canvas.dimensions.size / 12), 8);
            const w = this.w;
            const bs = Math.clamped(h / 8, 1, 2);
            if (this.data.height >= 2) h *= 1.6;  // Enlarge the bar for large tokens



            // Determine the color to use
            const blk = 0x000000;
            let color;
            if (i === 0) color = PIXI.utils.rgb2hex([(1 - (pct / 2)), pct, 0]);
            else color = PIXI.utils.rgb2hex([(0.5 * pct), (0.7 * pct), 0.5 + (pct / 2)]);

            // Draw the bar
            bar.clear()
            bar.removeChildren()
            bar.beginFill(blk, 0.5).lineStyle(bs, blk, 1.0).drawRoundedRect(0, 0, this.w, h, 3)
            bar.beginFill(color, 1.0).lineStyle(bs, blk, 1.0).drawRoundedRect(0, 0, pct * w, h, 2)

            // Set position
            let posY = number === 0 ? this.h - h : 0;
            bar.position.set(0, posY);

            const style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: h,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff'], // gradient
                stroke: '#000000',
                strokeThickness: 1,
                dropShadow: false,
                dropShadowColor: '#ffffff',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                lineJoin: 'round',
            });
            const richText = new PIXI.Text(attr.value + "/" + attr.max, style);
            richText.x = (bar.width / 2) - (richText.width / 2);
            richText.y = -2;//(bar.y+bar.height);
            richText.color

            bar.addChild(richText);

            bar.visible = true;
        }

    });

}


Hooks.once('setup', function () {

    libWrapper.register(MODULE_ID, 'Token.prototype.drawBars', drawBars_Override, "OVERRIDE")

    console.log('Display-HP started!')


})