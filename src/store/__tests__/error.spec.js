import { ErrorObject } from "../error"
import axios from 'axios'

describe("ErrorObject", () => {
  let store

  beforeEach(() => {
    store = new ErrorObject()
  })

  it("creates new errors", () => {
    store.addError("Error1")
    store.addError("Error2")
    expect(store.errorList.length).toBe(2)
    expect(store.errorList[0]).toBe("Error1")
    expect(store.errorList[1]).toBe("Error2")
  })

  it("catches network errors", async () => {
    await axios.get("http://dummy.invalid/")
      .catch(error => {
        expect(store.errorList.length).toBe(1)
      })
  })
})
