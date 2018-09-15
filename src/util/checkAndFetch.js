import moment from 'moment'

export const checkAndFetch = (store) => {
  for (const {lottery: {end_of_drawing: time}} of store.application.applicationList) {
    const endOfDrawing = moment(time, 'HH:mm:ss')
    if (endOfDrawing < moment()) {
      store.fetchStatus()
      return
    }
  }
}
