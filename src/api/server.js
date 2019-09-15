import request from '@/utils/request'

export function getEcsList(params) {
  return request({
    url: '/ecs/',
    method: 'get',
    params
  })
}

export function getMysqlList(params) {
  return request({
    url: '/mysql/',
    method: 'get',
    params
  })
}

export function getSlbList(params) {
  return request({
    url: '/slb/',
    method: 'get',
    params
  })
}

export function getRedisList(params) {
  return request({
    url: '/redis/',
    method: 'get',
    params
  })
}

export function getDnsList(params) {
  return request({
    url: '/dns/',
    method: 'get',
    params
  })
}