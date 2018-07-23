import { responsify } from '../../../util/responsify'

export const getApplications = () => new Promise((resolve, reject) => {
  resolve(responsify([
    {
      "id": 1,
      "lottery": {
        "classroom_id": 1,
        "done": false,
        "id": 1,
        "index": 0,
        "name": "5A.0",
        "winners": []
      },
      "status": "pending"
    }
  ]))
})
