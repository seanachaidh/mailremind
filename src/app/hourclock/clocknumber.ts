import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'clockNumber'
})
export class ClockNumber implements PipeTransform {
    transform(value: number, zeroes?: number) {
        if(!zeroes) var zeroes = 0;
        return value.toString().padStart(zeroes, '0');
    }   
}

@Pipe({
    name: 'amPm'
})
export class AmPm implements PipeTransform {
    transform(value: number, am?: boolean): number {
        if(am) {
            return value;
        } else {
            return value + 12;
        }
    }
}
