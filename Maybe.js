
class Nothing {

}

class Maybe {
  
  value;

  private constructor() {
    /** Only used internally */
  }

  of(value) {
    this.value = value
  }

  map(fn){
    return (
      this.value != null || this.value != undefined
        ? Maybe.of(fn(this.value))
        : Nothing
    )
  }
}