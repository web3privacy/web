import core from "../core.json";

export function getPersonByGH(user) {
    return core.people.find(p => p.refs?.github?.toLowerCase() === user.toLowerCase())
}

export function personLink (p) {
    if (p.refs?.twitter) {
        return `https://twitter.com/${p.refs.twitter}`
    }
    if (p.refs?.bsky) {
        return `https://bsky.app/profile/${p.refs.bsky}`
    }
    if (p.refs?.github) {
        return `https://github.com/${p.refs.github}`
    }
    if (p.refs?.linkedin) {
        return `https://linkedin.com/in/${p.refs.github}`
    }
    return '#'
}
