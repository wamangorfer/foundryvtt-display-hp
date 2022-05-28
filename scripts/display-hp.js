const MODULE_ID = 'display-hp';

function drawBars_Override() {
    if (!this.actor || (this.data.displayBars === CONST.TOKEN_DISPLAY_MODES.NONE)) return;
    ["bar1", "bar2"].forEach((b, i) => {
        const bar = this.hud.bars[b];
        const attr = this.document.getBarAttribute(b);
        if (!attr || (attr.type !== "bar")) return bar.visible = false;
        this._drawBar(i, bar, attr);
        bar.visible = true;

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: bar.height,
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
        const richText = new PIXI.Text(attr.value +"/"+attr.max, style);
        richText.x = (bar.width/2) - (richText.width/2);
        richText.y = -2;//(bar.y+bar.height);
        richText.color

        bar.addChild(richText);
    });

}


Hooks.once('setup', function () {

    libWrapper.register(MODULE_ID, 'Token.prototype.drawBars', drawBars_Override, "OVERRIDE")

    console.log(`Attribute Bar Colors v1.0 | initialized`)


})