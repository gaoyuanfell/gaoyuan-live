import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'data',
	pure: true
})
export class DataPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		return value;
	}
}
