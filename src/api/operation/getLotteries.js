import {fetchApi} from '../request'

export const getLotteries = () => fetchApi(`lotteries/available`, {})
