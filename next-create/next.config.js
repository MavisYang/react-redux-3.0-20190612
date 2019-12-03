/*
 * @Author: lidandan
 * @Date: 2019-11-11 15:22:27
 * @LastEditors: lidandan
 * @LastEditTime: 2019-11-11 15:31:06
 * @Description: 
 */
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
