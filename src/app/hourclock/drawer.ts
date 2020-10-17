import { Point } from './utils';

export class Drawer {
    canvasElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    private drawCircle() {
        var radius = Math.floor(this.canvasElement.width/2)
        //The radius is also the center.
        this.ctx.beginPath();
        this.ctx.arc(radius, radius, radius, 0, 2*Math.PI);
        this.ctx.fillStyle = 'gray';
        this.ctx.stroke()
    }

    public clear() {
        this.ctx.clearRect(0,0,this.canvasElement.width, this.canvasElement.height);
        this.drawCircle();
    }

    /**
     * Draws a sequence of numbers on the canvas
     * @param data The number sequence to draw
     * @param coords The coordinates at which each element is drawn
     * @param shift Shift the coordinates by this point
     */
    public drawSequence(data: Array<number>, coords: Array<Point>, height:number, start?: number, shift?: Point) {
        if(!shift) var shift:Point = new Point(this.canvasElement.width/2, this.canvasElement.height/2);
        if(!start) var start:number = 0;

        var firstLoop: boolean = true;
        var counter: number = start;
        var coordcounter = 0;

        var fontString: string = height.toString() + "px Arial";
        this.ctx.font = fontString;
        while (counter != start || firstLoop) {
            if(firstLoop) firstLoop = false;
            var d: number = data[counter];
            var c: Point = coords[coordcounter];
            var ds: string = d.toString();
            
            var dsm: TextMetrics = this.ctx.measureText(ds);

            this.ctx.fillText(ds, c.x + (shift.x - (dsm.width/2)), c.y + (shift.y + 15));
            counter = (counter+1) % data.length;
            coordcounter++;
        }
    }
    /**
     * Starts a new drawer instance for a canvas indicated by an ID
     * @param canvasId The id of the canvas on the document
     */
    constructor(canvasId: string) {
        this.canvasElement = <HTMLCanvasElement> document.getElementById(canvasId);
        this.ctx = this.canvasElement.getContext("2d");
        this.drawCircle();
    }
}