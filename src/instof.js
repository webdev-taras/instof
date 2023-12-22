module.exports = instof

const instype = require('instype')

function classname(target) {
  const type = instype(target)
  if (type === 'String') return target
  if (type === 'Function') return target?.prototype?.constructor?.name ?? ''
  return ''
}

const deadlocks = ['Undefined', 'Null', 'Dictionary', 'Object']

function instof(value, target) {
  const type = instype(value)
  const name = classname(target)

  if (!name) return false
  if (type === name) return true
  if (deadlocks.includes(type)) return false

  let proto = Object.getPrototypeOf(value)
  while (proto) {
    if (proto.constructor.name === name) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
