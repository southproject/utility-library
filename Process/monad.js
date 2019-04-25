composeImpure = (f, g) => x => () => f(g(x)())()


const Effect = f => ({
    map: g => Effect(x => g(f(x))),
    runWith: x => f(x),
  })
  
  Effect.of = value => Effect(() => value)