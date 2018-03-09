import fetch from 'isomorphic-unfetch'

const addQuery = obj => {
    let result = ''
    for (const prop in obj) {
        result = result + genQuery(prop, obj[prop])
    }
    return result
}

const genQuery = (key, value) => `&${key}=${value}`

// GET
const get = async (path, options) => {
    let qs = '?appkey=' + process.env.APPKEY
    if (options !== undefined) qs = qs + addQuery(options)
    return await fetch(process.env.DOMAIN + path + qs).then(data => data.json())
}

// helper method
const withBody = method => async (path, body, token) => {
    let qs = '?appkey=' + process.env.APPKEY
    if (token) {
        qs = qs + '&token=' + token
    }
    return await fetch(process.env.DOMAIN + path + qs, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(data => data.json())
}

// POST
const post = withBody('POST')
// PUT
const put = withBody('PUT')
// PATCH
const patch = withBody('PATCH')

export default { get, post, put, patch }
