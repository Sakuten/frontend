export class CheckerObject {
  constructor (store) {
    this.store = store
  }

  onChangeClassroom = (classroom) => {
    this.store.checker.setClassroom(classroom)
  }
}
