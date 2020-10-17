import { Component } from "@angular/core";
import { Drawer } from './drawer';
import { calculateAngle, Point, radiansToNumber, spin } from './utils';

@Component({
    templateUrl: "./hourclock-template.html",
    selector: "hourclock",
    styleUrls: ["./hourclock-style.sass"]
})
export class HourClock {
    hour: number;
    minute: number;
    labelMinutes: Array<number>
    labelHours: Array<number>;

    minutePoints: Array<Point>
    hourPoints: Array<Point>

    drawer: Drawer;
    
    hourMode: boolean;

    pmButton: HTMLButtonElement;
    amButton: HTMLButtonElement;
    amMode: boolean;

    private createLabels() {
        for (let counter = 0; counter < 60; counter+=5) {
            this.labelMinutes.push(counter);
        }

        for (let counter = 1; counter <= 12; counter++) {
            this.labelHours.push(counter);
        }
    }

    private handleHours(center: Point, zeropoint: Point, clickedpoint: Point) {
        var r: number = calculateAngle(center, zeropoint, clickedpoint);
        var nHours = radiansToNumber(r, 12);

        console.log("Radians: " + r.toString() + ";Hours: " + nHours.toString());
        this.hour = nHours;
        this.hourMode = false;
    }

    private handleMinutes(center: Point, zeropoint: Point, clickedpoint: Point) {
        var r: number = calculateAngle(center, zeropoint, clickedpoint);
        var nMinutes = radiansToNumber(r, 60);

        console.log("Radians: " + r.toString() + ";Hours: " + nMinutes.toString());
        this.minute = nMinutes;
        this.hourMode = true;
    }

    private drawClock() {
        this.drawer.clear();
        if(this.hourMode) {
            this.drawer.drawSequence(this.labelHours, this.hourPoints, 33, 2);
        } else {
            this.drawer.drawSequence(this.labelMinutes, this.minutePoints, 33, 3);
        }
    }

    constructor () {
        var d: Date = new Date();
        this.hour = d.getHours();
        this.minute = d.getMinutes();

        this.labelMinutes = new Array<number>();
        this.labelHours = new Array<number>();
        this.createLabels();
        this.minutePoints = spin(this.labelMinutes, new Point(0, 0), 110);
        this.hourPoints = spin(this.labelHours, new Point(0, 0), 110);

        this.hourMode = true;
        this.amMode = true;
    }

    ngAfterViewInit() {
        this.drawer = new Drawer("clockcanvas");
        this.drawClock();
        this.amButton = <HTMLButtonElement> document.getElementById("ambutton");
        this.pmButton = <HTMLButtonElement> document.getElementById("pmbutton");
    }

    clockClick(event: MouseEvent){
        console.log("Cicking the clock");
        var logstring: string = "location: " + event.offsetX + "," + event.offsetY;
        console.log(logstring);
        
        var clickedPoint: Point = new Point(event.offsetX, event.offsetY);
        var centerPoint: Point = new Point(this.drawer.canvasElement.width/2, this.drawer.canvasElement.height/2);
        var clockZero: Point = new Point(this.drawer.canvasElement.width/2, 0);

        if(this.hourMode) {
            this.handleHours(centerPoint, clockZero, clickedPoint);
        } else {
            this.handleMinutes(centerPoint, clockZero, clickedPoint);
        }
        this.drawClock();
    }
    /**
     * switchAM
     */
    public switchAM(event: Event) {
        this.amButton.setAttribute("aria-clicked", "true");
        this.pmButton.setAttribute("aria-clicked", "false");
        this.amMode = true;
    }
    /**
     * switchPM
     */
    public switchPM(event: Event) {
        this.amButton.setAttribute("aria-clicked", "false");
        this.pmButton.setAttribute("aria-clicked", "true");
        this.amMode = false;
    }
}
