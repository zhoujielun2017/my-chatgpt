import { post } from '@/utils/request'

export interface LoginParam {
  email: string
  password: string
}

export function fetchLogin<T>(loginParam: LoginParam) {
  return post<T>({
    url: '/login/login',
    data: loginParam,
  })
}
export function fetchHadLogin<T>() {
  return post<T>({
    url: '/login/hadLogin',

  })
}
export function fetchReg<T>(loginParam: LoginParam) {
  return post<T>({
    url: '/login/reg',
    data: loginParam,
  })
}
