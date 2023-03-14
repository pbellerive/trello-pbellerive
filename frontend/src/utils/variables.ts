// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEnv = (name: string, defaultValue?: string): any => {
  const r = process.env[name] || defaultValue;

  if (
    (r !== undefined && r !== null)
    && (
      /^(true|false)$/.test(r)
      || /^\[.*]$/.test(r)
      || /^{.*}$/.test(r)
      || /^[-+]?[0-9]*\.?[0-9]+$/.test(r)
    )
  ) {
    return JSON.parse(r);
  }

  return r;
};

export default {};
