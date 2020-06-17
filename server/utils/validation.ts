interface ArgValidationConfig<F extends (...args: any[]) => any> {
  argName: string;
  validator: (value: Parameters<F>) => boolean;
}

export function validate<F extends (...args: any[]) => any>(
  fn: F,
  validationConfig: ArgValidationConfig<F>[],
  ...args: Parameters<F>
): ReturnType<F> {
  if (validationConfig.length === 0) {
    throw new Error('No validators passed in!');
  }
  validationConfig.forEach((config, i) => {
    if (!config.validator(args)) {
      throw new Error(
        `Parameter named ${config.argName} with value ${args[i]} failed validation.`
      );
    }
  });
  return fn(...args);
}

export function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}