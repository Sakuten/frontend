import moment from 'moment'

export const checkAndFetch = (store) => {
  for (const {lottery: {end_of_drawing: time}} of store.application.applicationList) {
    const diff = moment(time, 'HH:mm:ss')
    if (diff < moment()) {
      store.fetchStatus()
      return
    }
  }
}
