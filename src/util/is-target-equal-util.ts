export type TargetHost = Record<'target', Function>;
//evalua si las dos clases son iguales
export function isTargetEqual<T extends TargetHost, U extends TargetHost>(
  a: T,
  b: U,
) {
  return a.target === b.target || (
    a.target.prototype ?
      isTargetEqual({ target: (a.target as any).__proto__ }, b) :
      false
  );
}