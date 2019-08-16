'use strict'

const settings = require('standard-settings')
const { SpacebroClient } = require('spacebro-client')

const dgram = require('dgram')
const udpclient = dgram.createSocket('udp4')

const udp = {
  host: settings.get('udp:host') || '127.0.0.1',
  port: settings.get('udp:port') || 41234
}

const verbose = settings.get('verbose') || false
const events = settings.get('events')

const raw = [
  // ID (“Siudi_7B”)
  '53',
  '69',
  '75',
  '64',
  '69',
  '5F',
  '37',
  '42',
  // OPCODE
  '6D',
  '00',
  // SCENE INDEX
  '00',
  '00',
  // PAGE INDEX
  '00',
  '00',
  // COMMAND
  '01',
  '00',
  // VALUE
  '00',
  '00',
  '00',
  '00'
]

// scene raw array index : 10
// scene raw array index : 12

const spacebroclient = new SpacebroClient()

events.forEach((event) => {
  spacebroclient.on(event.name, (datas) => {
    if (!event.requiredData || Object.values(datas).includes(event.requiredData)) {
      console.log(`sending "${event.name}"...`)
      if (event.delay) console.log(`waiting ${event.delay}s...`)

      raw.splice(10, 1, event.scene)
      raw.splice(12, 1, event.page)

      const message = new Buffer(raw.join(''), 'hex')
      setTimeout(() => {
        udpclient.send(message, 0, message.length, udp.port, udp.host, (err, bytes) => {
          console.log(`"${event.name}" sent!`)
        })
      }, (event.delay || 0) * 1000)
    }
  })
})
