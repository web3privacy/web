import { format, compareAsc, addDays, isFuture } from 'date-fns';

export const types = [
    { id: "", plural: 'All events'},
    { id: "collab", name: 'Collaboration', plural: 'Collaborations' },
    { id: "congress", name: 'Congress', plural: 'Congresses' },
    { id: "hackathon", name: 'Hackathon', plural: 'Hackathons' },
    { id: "meetup", name: 'Meetup', plural: 'Meetups' },
    { id: "online", name: 'Online', plural: 'Online' },
    { id: "privacy-corner", name: 'Privacy Corner', plural: 'Privacy Corners' },
    { id: "rave", name: 'Rave', plural: 'Raves' },
    { id: "summit", name: 'Summit', plural: 'Summits' },
]

export const countryNames = {
    ad: 'andorra',
    ae: 'united arab emirates',
    af: 'afghanistan',
    ag: 'antigua and barbuda',
    ai: 'anguilla',
    al: 'albania',
    am: 'armenia',  	
    ao: 'angola',
    ar: 'argentina',
    as: 'american samoa',
    at: 'austria',
    au: 'australia',
    aw: 'aruba',
    ax: 'åland islands',
    az: 'azerbaijan',
    ba: 'bosnia and herzegovina',
    bb: 'barbados',
    bd: 'bangladesh',
    be: 'belgium',
    bf: 'burkina faso',
    bg: 'bulgaria',
    bh: 'bahrain',
    bi: 'burundi',
    bj: 'benin',
    bl: 'saint barthélemy',
    bm: 'bermuda',
    bn: 'brunei',
    bo: 'bolivia',
    bq: 'bonaire',
    br: 'brazil',
    bs: 'bahamas',
    bt: 'bhutan',
    bv: 'bouvet island',
    bw: 'botswana',
    by: 'belarus',
    bz: 'belize',
    ca: 'canada',
    cc: 'cocos islands',
    cd: 'democratic republic of the congo',
    cf: 'central african republic',
    cg: 'congo',
    ch: 'switzerland',
    ci: 'ivory coast',
    ck: 'cook islands',
    cl: 'chile',
    cm: 'cameroon',
    cn: 'china',
    co: 'colombia',
    cr: 'costa rica',
    cu: 'cuba',
    cv: 'cabo verde',
    cw: 'curaçao',
    cx: 'christmas island',
    cy: 'cyprus',
    cz: 'czechia',
    de: 'germany',
    dj: 'djibouti',
    dk: 'denmark',
    dm: 'dominica',
    do: 'dominican republic',
    dz: 'algeria',
    ec: 'ecuador',
    ee: 'estonia',
    eg: 'egypt',
    eh: 'western sahara',
    er: 'eritrea',
    es: 'spain',
    et: 'ethiopia',
    fi: 'finland',
    fj: 'fiji',
    fk: 'falkland islands',
    fm: 'micronesia',
    fo: 'faroe islands',
    fr: 'france',
    ga: 'gabon',
    gb: 'united kingdom of great britain',
    gd: 'grenada',
    ge: 'georgia',
    gf: 'french guiana',
    gg: 'guernsey',
    gh: 'ghana',
    gi: 'gibraltar',
    gl: 'greenland',
    gm: 'gambia',
    gn: 'guinea',
    gp: 'guadeloupe',
    gq: 'equatorial guinea',
    gr: 'greece',
    gs: 'south georgia and the south sandwich islands',
    gt: 'guatemala',
    gu: 'guam',
    gw: 'guinea-bissau',
    gy: 'guyana',
    hk: 'hong kong',
    hm: 'heard island and mcdonald islands',
    hn: 'honduras',
    hr: 'croatia',
    ht: 'haiti',
    hu: 'hungary',
    id: 'indonesia',
    ie: 'ireland',
    il: 'israel',
    im: 'isle of man',
    in: 'india',
    io: 'british indian ocean territory',
    iq: 'iraq',
    ir: 'iran',
    is: 'iceland',
    it: 'italy',
    je: 'jersey',
    jm: 'jamaica',
    jo: 'jordan',
    jp: 'japan',
    ke: 'kenya',
    kg: 'kyrgyzstan',
    kh: 'cambodia',
    ki: 'kiribati',
    km: 'comoros',
    kn: 'saint kitts and nevis',
    kp: 'democratic peoples republic of korea',
    kr: 'republic of korea',
    kw: 'kuwait',
    ky: 'cayman islands',
    kz: 'kazakhstan',
    la: 'lao',
    lb: 'lebanon',
    lc: 'saint lucia',
    li: 'liechtenstein',
    lk: 'sri lanka',
    lr: 'liberia',
    ls: 'lesotho',
    lt: 'lithuania',
    lu: 'luxembourg',
    lv: 'latvia',
    ly: 'libya',
    ma: 'morocco',
    mc: 'monaco',
    md: 'moldova',
    me: 'montenegro',
    mf: 'saint martin',
    mg: 'madagascar',
    mh: 'marshall islands',
    mk: 'north macedonia',
    ml: 'mali',
    mm: 'myanmar',
    mn: 'mongolia',
    mo: 'macao',
    mp: 'northern mariana islands',
    mq: 'martinique',
    mr: 'mauritania',
    ms: 'montserrat',
    mt: 'malta',
    mu: 'mauritius',
    mv: 'maldives',
    mw: 'malawi',
    mx: 'mexico',
    my: 'malaysia',
    mz: 'mozambique',
    na: 'namibia',
    nc: 'new caledonia',
    ne: 'niger',
    nf: 'norfolk island',
    ng: 'nigeria',
    ni: 'nicaragua',
    nl: 'netherlands',
    no: 'norway',
    np: 'nepal',
    nr: 'nauru', 
    nu: 'niue',
    nz: 'new zealand',
    om: 'oman',
    pa: 'panama',
    pe: 'peru',
    pf: 'french polynesia',
    pg: 'papua new guinea',
    ph: 'philippines',
    pk: 'pakistan',
    pl: 'poland',
    pm: 'saint pierre and miquelon',
    pn: 'pitcairn',
    pr: 'puerto rico',
    ps: 'palestine',
    pt: 'portugal',
    pw: 'palau',
    py: 'paraguay',
    qa: 'qatar',
    re: 'réunion',
    ro: 'romania',
    rs: 'serbia',
    rw: 'rwanda',
    sa: 'saudi arabia',
    sb: 'solomon islands',
    sc: 'seychelles',
    sd: 'sudan',
    se: 'sweden',
    sg: 'singapore',
    sh: 'saint helena',
    si: 'slovenia',
    sj: 'svalbard and jan mayen',
    sk: 'slovakia',
    sl: 'sierra leone',
    sm: 'san marino',
    sn: 'senegal',
    so: 'somalia',
    sr: 'suriname',
    ss: 'south sudan',
    st: 'sao tome and principe',
    sv: 'el salvador',
    sx: 'sint maarten',
    sz: 'eswatini',
    tc: 'turks and caicos islands',
    td: 'chad',
    tf: 'french southern territories',
    tg: 'togo',
    th: 'thailand',
    tj: 'tajikistan',
    tk: 'tokelau',
    tl: 'timor-leste',
    tm: 'turkmenistan',
    tn: 'tunisia',
    to: 'tonga',
    tr: 'türkiye',
    tt: 'trinidad and tobago',
    tv: 'tuvalu',
    tw: 'taiwan',
    tz: 'tanzania',
    ug: 'uganda',
    um: 'united states minor outlying islands',
    uy: 'uruguay',
    uz: 'uzbekistan',
    va: 'holy see',
    vc: 'saint vincent and the grenadines',
    ve: 'venezuela', 
    vg: 'virgin islands (british)',
    vi: 'virgin islands (u.s.)',
    vn: 'viet nam',
    vu: 'vanuatu',
    wf: 'wallis and futuna',
    ws: 'samoa',
    ye: 'yemen',
    yt: 'mayotte',
    za: 'south africa',
    zm: 'zambia',
    zw: 'zimbabwe',
}

export function dateInfo (item) {
    const isDate = item.date.match(/^\d{4}-\d{2}-\d{2}$/)
    const future = isDate && !isFuture(new Date(item.date));
    const dateMatch = item.date.match(/^(\d{4})/)
    const year = dateMatch ? dateMatch[1] : null

    return { isDate, isFuture: future, year }
}

export function dateFormat (str, fmt) {
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return format(new Date(str), fmt || 'MMM d, yyyy')
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
            return `Summit ${item.city}` + (full ? ` ${date.year}`: '')// + (cc ? ` @ ${cc}` : '')
            break;
        case 'congress':
            //num = item.id.match(/^w3ps(\d+)$/)[1]
            return `Congress ${item.city}` + (full ? ` ${date.year}`: '')// + (cc ? ` @ ${cc}` : '')
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
        case 'collab':
            return `Collaboration with `+ (item.coincidenceFull ? item.coincidenceFull : `${item.coincidence} ${date.year}`)
            break;
        case 'rave':
            return `Rave ${item.city}` + (full ? ` ${date.year}`: '')
            break;
        case 'online':
            //num = item.id.match(/^w3ph(\d+)$/)[1]
            return `Online ${item.city}` + (full ? ` ${date.year}`: '')// + (cc ? ` @ ${cc}` : '')
            break;
    }
}

export function ccRenderer (item) {
    let ccm = item.coincidence?.match(/\[(\w+)\]/)
    let cc = ccm && ccm[1] ? ccm[1] : (item.coincidence ? item.coincidence : null)
    return cc
}

export function eventStatus(item) {
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

    const date = dateInfo(item);
    const eventDate = new Date(item.date);
    const currentDate = new Date();

    return item.confirmed
        ? (eventDate < currentDate ? statuses.past : statuses.confirmed)
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
    if (item.thumbs && item.thumbs['poster-simple:640']) {
        return item.thumbs['poster-simple:640']
    }
    if (item.thumbs && item.thumbs['poster:640']) {
        return item.thumbs['poster:640']
    }

    if (item.images && item.images['poster-simple']) {
        return item.images['poster-simple'];
    }
    if (item.images && item.images.poster) {
        return item.images.poster;
    }
    return null
}

export function getSpeakerImage(speaker, size='400') {
    if (speaker.thumbs && speaker.thumbs[size]) {
        return speaker.thumbs[size];
    }
    return speaker.imageUrl;
}
