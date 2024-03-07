import { format, compareAsc, addDays, isFuture } from 'date-fns';

export const types = [
    { id: "", plural: 'All events'},
    { id: "meetup", name: 'Meetup', plural: 'Meetups' },
    { id: "summit", name: 'Summit', plural: 'Summits' },
    { id: "privacy-corner", name: 'Privacy Corner', plural: 'Privacy Corners' },
    { id: "online-summit", name: 'Online Summit', plural: 'Online Summits' },
]

export const countryNames = {
    cz: 'Czechia',
    it: 'Italy',
    de: 'Germany',
    es: 'Spain',
    si: 'Slovenia',
    dk: 'Denmark',
    pl: 'Poland',
    be: 'Belgium',
    pt: 'Portugal',
    ee: 'Estonia',
    nl: 'Netherlands',
    ro: 'Romania',
    gr: 'Greece',
    th: 'Thailand',
}

export function dateInfo (item) {
    const isDate = item.date.match(/^\d{4}-\d{2}-\d{2}$/)
    const future = isDate && !isFuture(new Date(item.date));
    const dateMatch = item.date.match(/^(\d{4})/)
    const year = dateMatch ? dateMatch[1] : null

    return { isDate, isFuture: future, year }
}

export function dateFormat (str) {
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return format(new Date(str), 'MMM d, yyyy')
    }
    const qm = str.match(/^(\d{4})\/(\w+)$/)
    if (qm) {
        return `${qm[2]}, ${qm[1]}`
    }
    return str
}

export function dateEnd(str, days) {
    return format(addDays(new Date(str), days-1), 'yyyy-MM-dd');
}

export function nameRenderer (item, full = false) {
    let num;
    let ccm = item.coincidence?.match(/\[(\w+)\]/)
    let cc = ccm && ccm[1] ? ccm[1] : (item.coincidence ? item.coincidence : null)
    const date = dateInfo(item)
    switch (item.type) {
        case 'summit':
            //num = item.id.match(/^w3ps(\d+)$/)[1]
            return `Summmit ${item.city}` + (full ? ` ${date.year}`: '')// + (cc ? ` @ ${cc}` : '')
            break;
        case 'meetup':
            //num = item.id.match(/(\d+)$/)
            return `Meetup ${item.city}` + (full ? ` ${date.year}`: '')// + (cc ? ` @ ${cc}` : '')
            break;
        case 'hackathon':
            //num = item.id.match(/^w3ph(\d+)$/)[1]
            return `Hackathon ${item.city}` + (full ? ` ${date.year}`: '')// + (cc ? ` @ ${cc}` : '')
            break;
        case 'privacy-corner':
            return `Privacy Corner at `+ (item.coincidenceFull ? item.coincidenceFull : `${item.coincidence} ${date.year}`)
            break;
        case 'online-summit':
            return "ONLINE Summit" + (item['name-extension'] ? ' ' + item['name-extension'] : '') + (full ? ` ${date.year}` : '');
            break;
    }
}

export function ccRenderer (item) {
    let ccm = item.coincidence?.match(/\[(\w+)\]/)
    let cc = ccm && ccm[1] ? ccm[1] : (item.coincidence ? item.coincidence : null)
    return cc
}

export function eventStatus (item) {
    const statuses = {
        preregistration: {
            title: 'Pre-registration',
            color: 'text-orange-500',
        },
        unconfirmed: {
            title: 'Planned',
            color: ''
        },
        confirmed: {
            title: 'Confirmed',
            color: 'text-green-500',
        },
        past: {
            title: 'Already happened',
            color: 'text-green-800',
        }
    }
    
    const date = dateInfo(item)
    return item.confirmed
        ? (date.isDate ? statuses.past : statuses.confirmed)
        : (item.links?.rsvp ? statuses.preregistration : statuses.unconfirmed);
}

export function getSpeaker (core, id) {
    return core.people.find(p => p.id === id)
}

export function findExt (eventsExt, item) {
    let slug = null
    if (item.links?.web && item.links.web.match(/^https:\/\/lu.ma\//)) {
        slug = item.links.web.match(/^https:\/\/lu.ma\/(.+)$/)[1]
    }
    if (item.links?.rsvp && item.links.rsvp.match(/^https:\/\/lu.ma\//)) {
        slug = item.links.rsvp.match(/^https:\/\/lu.ma\/(.+)$/)[1]
    }
    if (!slug) {
        return null
    }
    return eventsExt.find(ex => ex.url === slug)
}

export function getEventPoster (item) {
    if (item.images && item.images['poster-simple']) {
        return item.images['poster-simple'];
    }
    if (item.images && item.images.poster) {
        return item.images.poster;
    }
    return null
}