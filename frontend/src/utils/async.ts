export function wait(t: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}
