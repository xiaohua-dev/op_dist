import request from '@/utils/request'

export function getEcsList(params) {
  return request({
    url: '/ecs/',
    method: 'get',
    params
  })
}
