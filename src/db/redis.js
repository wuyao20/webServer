const redis = require('redis')

const { REDIS_CONFIG } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisClient.on('error', err=> {
    console.log(err)
})

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err)
                return
            }
            if(val == null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch(ex) {
                resolve(val)
            }
        })
    })
}

function set(key, val) {
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

module.exports = {
    set,
    get
}