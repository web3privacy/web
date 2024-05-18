import { isPast } from 'date-fns';

export function isFutureDate (dt) {
    if (dt.match(/^\d{4}-\d{2}-\d{2}$/) && isPast(new Date(dt))) {
		return false
	}
    return true
}