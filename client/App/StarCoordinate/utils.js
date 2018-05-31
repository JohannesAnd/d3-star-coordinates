export function calculateAxis(data) {
  const elements = data[0].length;

  return new Array(elements).fill(false).map((_, i) => {
    const angle = (i / elements) * 2 * Math.PI;

    return [Math.sin(angle), Math.cos(angle)];
  });
}

export function multiply(array1, array2) {
  return array1.map((el, i) => el * array2[i]).reduce((a, v) => a + v, 0);
}
