async function async1() {
    console.log('a');
    await async2()
    console.log('b')
  }
  
  async function async2() {
    return new Promise((resolve, rej) => {
        console.log('c')
        resolve()
    })
  }
  
  console.log('d')
  async1();
  
  setTimeout(()=> {
    console.log('e')
  },0)
  
  new Promise((resolve, reject) => {
    console.log('f')
    resolve()
  }).then(()=> {
    console.log('g')
  })

  /**
   * Queue:
   * microQueue: 
   * answer: d a c f g b e
   */