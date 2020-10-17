
/**
 * Class representing a point
 */
export class Point {
    x: number;
    y: number;
    /**
     * 
     * @param x X axis
     * @param y Y axis
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

/**
 * Creates a binned interval scale
 * @param start Start of the interval
 * @param stop End of the interval
 * @param steps Boundries of the interval
 * @returns An array with specific points on an interval
 */
export function interval(start: number, stop: number, steps: number): Array<number> {
    var retval: Array<number> = new Array<number>();
    for(let i = 0; i < stop; i += steps) {
        retval.push(i);
    }
    return retval;
}

/**
 * Draws a circle of points
 * @param toSpin Points to spin around
 * @param center The center of the circle drawn
 * @param r The radius of the circle draw
 * @returns The coordinates of the circle
 */
export function spin(toSpin: Array<number>, center: Point, r: number): Array<Point> {
    var a = center.x;
    var b = center.y;

    var steps: number = (2*Math.PI)/toSpin.length;
    var piInterval: Array<number> = interval(0, 2*Math.PI, steps);

    var retval: Array<Point> = new Array<Point>();
    for (let index = 0; index < toSpin.length; index++) {
        var element: number = toSpin[index];
        var t: number = piInterval[index];

        var x: number = a + r*Math.cos(t);
        var y: number = b + r*Math.sin(t);

        retval.push(new Point(Math.round(x), Math.round(y)));
        
    }
    return retval;
}

export function radiansToNumber(r: number, m: number): number {
    return Math.round((r/(2*Math.PI))*m);
}

export function calculateAngle(corner: Point, clockOrigin: Point, clickPoint: Point): number {
    var square = function(x: number){
        return Math.pow(x, 2);
    }
    var A: number = calculateDistance(corner, clockOrigin);
    var B: number = calculateDistance(corner, clickPoint);
    var C: number = calculateDistance(clockOrigin, clickPoint);

    var cosine: number = (square(B) + square(A) - square(C))/(2*A*B);
    var radians = Math.acos(cosine);

    if (clickPoint.x < clockOrigin.x) {
        radians = (2*Math.PI) - radians;
    }

    return radians;
}

/**
 * Calculates the euclidean distance between two points
 * @param pointA The first point
 * @param pointB The second point
 */
export function calculateDistance(pointA: Point, pointB: Point): number {
    return Math.sqrt(Math.pow((pointA.x - pointB.x),2) + Math.pow((pointA.y - pointB.y),2));
}
