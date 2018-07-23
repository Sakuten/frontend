import {fetchApi} from '../request'

export const getApplications = () => fetchApi(`applications`, {})
