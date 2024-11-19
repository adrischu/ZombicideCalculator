function bernoulliGenau(p: number, n: number, k: number): number {
  return (fact(n) / (fact(k) * fact(n - k))) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

export function bernoulliMindestens(p: number, n: number, k: number): number {
  let result: number = 0

  for (let i = k; i <= n; i++) {
    result += bernoulliGenau(p, n, i)
  }
  return result
}

function fact(a: number): number {
  let res: number = 1

  if (a % 1 !== 0 || a < 0) {
    throw new Error('Calculation of factorial only works for whole positive numbers.')
  }
  for (let i = 1; i <= a; i++) {
    res *= i
  }
  return res
}
