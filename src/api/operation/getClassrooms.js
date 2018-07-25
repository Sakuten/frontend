import {fetchApi} from '../request'

export const getClassrooms = () => fetchApi(`classrooms`, {})
