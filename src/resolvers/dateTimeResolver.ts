import { GraphQLScalarType, Kind } from "graphql";

export const dateTimeResolver = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO 8601 時間形式",
  serialize(value) {
    if (value instanceof Date) {
      return new Date(value).toISOString();
    }
    throw Error("DateTime must be a Date object");
  },
  parseValue(value) {
    if (typeof value === "string") {
      return new Date(value);
    }
    throw Error("DateTime Scalar parser expected a 'string'");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
