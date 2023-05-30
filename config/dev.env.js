'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 测试域名 http://wx.rex365.cn

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
