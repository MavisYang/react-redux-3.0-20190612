/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 10:34:54
 * @LastEditTime: 2019-11-12 16:27:24
 * @LastEditors: lidandan
 */
/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
export const ORIGIN_NAME = 'test.gemii.cc:58080'
export const SUB_API_PATH = '/lizcloud/api'
export const SUB_WS_PATH = '/lizcloud/ws'
export const WS_NAME = (location.protocol == 'https:' ? 'wss://' : 'ws://') + ORIGIN_NAME + SUB_WS_PATH
export const API_PATH = location.protocol + '//' + ORIGIN_NAME + SUB_API_PATH
export const GD_PATH = location.protocol + '//' + ORIGIN_NAME + '/skui/GDScope/'
// mock数据的请求地址
export const MOCK_PATH = 'http://mock.dev.gemii.cc:58080/lizcloud/api'

