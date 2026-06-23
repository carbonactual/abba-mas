import Ajv, { type ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import schema from "../contracts.schema.json" with { type: "json" };

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

export type ContractName = keyof typeof schema.$defs;

export interface ValidationResult {
  valid: boolean;
  errors: ErrorObject[];
}

export function validateContract(name: ContractName, value: unknown): ValidationResult {
  const definition = schema.$defs[name];
  if (!definition) {
    throw new Error(`Unknown contract: ${String(name)}`);
  }

  const validate = ajv.compile({
    $schema: schema.$schema,
    $defs: schema.$defs,
    ...definition
  });

  const valid = validate(value);
  return {
    valid: Boolean(valid),
    errors: validate.errors ? [...validate.errors] : []
  };
}

export function assertContract(name: ContractName, value: unknown): void {
  const result = validateContract(name, value);
  if (!result.valid) {
    const message = result.errors
      .map((error) => `${error.instancePath || "/"} ${error.message ?? "is invalid"}`)
      .join("; ");
    throw new Error(`${name} validation failed: ${message}`);
  }
}
