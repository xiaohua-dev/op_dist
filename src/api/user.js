import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api-token-auth/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserList(params) {
  return request({
    url: '/user/',
    method: 'get',
    params
  })
}

export function getRoleList(params) {
  return request({
    url: '/role/',
    method: 'get',
    params
  })
}

export function getSysuserList(params) {
  return request({
    url: '/sysuser/',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
