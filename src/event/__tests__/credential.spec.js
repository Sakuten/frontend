import { CredentialObject } from "../credential"
import { Store } from "../../store"

describe("CredentialObject", () => {
  let event

  beforeEach(() => {
    event = new CredentialObject(new Store())
  })

  it("changes username", () => {
    event.onChangeUsername("username")
    expect(event.store.credential.username).toBe("username")
  })

  it("changes password", () => {
    event.onChangePassword("password")
    expect(event.store.credential.password).toBe("password")
  })

  it("clears the token in logout", () => {
    event.onLogout()
    expect(event.store.credential.token.length).toBe(0)
  })
})
