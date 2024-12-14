export const evaluateExpression = (expression: string): number | string => {
  try {
    const precedence: Record<string, number> = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };
    const operators: Record<string, (a: number, b: number) => number> = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
      },
    };

    const tokens = expression?.match(/(\d+(\.\d+)?)|[-+*/]/g);
    if (!tokens) return "Error";

    const values: number[] = [];
    const ops: string[] = [];

    const applyOperation = () => {
      const b = values?.pop();
      const a = values?.pop();
      const op = ops?.pop();
      if (a === undefined || b === undefined || !op) return;
      values?.push(operators[op](a, b));
    };

    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        values?.push(Number(token));
      } else if (token in operators) {
        while (
          ops?.length &&
          precedence[ops[ops?.length - 1]] >= precedence[token]
        ) {
          applyOperation();
        }
        ops?.push(token);
      } else {
        return "Error";
      }
    }

    while (ops?.length) applyOperation();

    return values?.length === 1 ? values[0] : "Error";
  } catch {
    return "Error";
  }
};
