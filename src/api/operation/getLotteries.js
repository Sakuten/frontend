import {fetchApi} from '../request'

export const getLotteries = () => fetchApi(`api/lotteries`, {})
