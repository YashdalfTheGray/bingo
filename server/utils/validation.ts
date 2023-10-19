interface ArgValidationConfig<F extends (...args: unknown[]) => unknown> {
  argName: string;
  validator: (value: Parameters<F>) => boolean;
}

interface Stringable {
  toString(): string;
}

export class ValidationError<T extends Stringable> extends Error {
  constructor(
    private argName: string,
    private val: T,
  ) {
    super(
      `Parameter named ${argName} with value ${val.toString()} failed validation.`,
    );
  }

  get argumentName() {
    return this.argName;
  }

  get value() {
    return this.val;
  }
}

export function validate<F extends (...args: any[]) => ReturnType<F>>(
  fn: F,
  validationConfig: ArgValidationConfig<F>[],
  ...args: Parameters<F>
): ReturnType<F> {
  if (validationConfig.length === 0) {
    throw new Error('No validators passed in!');
  }
  validationConfig.forEach((config, i) => {
    if (!config.validator(args)) {
      throw new ValidationError(config.argName, args[i] as Stringable);
    }
  });
  return fn(...args);
}

export function assert<T extends Stringable>(
  condition: boolean,
  argName: string,
  value: T,
) {
  if (!condition) {
    throw new ValidationError(argName, value);
  }
}
