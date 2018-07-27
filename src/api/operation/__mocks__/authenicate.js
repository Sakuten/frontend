import { responsify } from '../../../util/responsify'

export const authenicate = (secretId, password) => new Promise((resolve, reject) => {
  resolve(responsify({
    'message': 'Login Successful',
    'token': 'gAAAAABbOIWaeB0_KFZ9rBGhZS1kBlLrMmeHC4m7T3xt5oGhiaowrZw_J_n2xoP04aAfLHUN8SSJjW6NtTE6r0Jd6CbYAa_cAAfkwHsWU1K6ywCL3mtqrHPb5SQwp3WkapuuXTEPeBrWEbPazD8lD5fxSJw-glVD8A=='
  }))
})
