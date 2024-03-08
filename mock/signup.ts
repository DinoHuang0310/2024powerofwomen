import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/signup',
    method: 'post',
    timeout: 2000,
    response: ({ query }) => {
      return {
        "status": "ok",
        "statusCode": "0000",
        "message": "執行成功"
      }
    },
  }
] as MockMethod[]