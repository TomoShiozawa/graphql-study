/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCharacters {\n    charactersCount\n    allCharacters {\n      id\n      name\n      description\n      learnedSpecialMoves {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetCharactersDocument,
    "\n  mutation DeleteCharacter($id: ID!) {\n    deleteCharacter(id: $id)\n  }\n": typeof types.DeleteCharacterDocument,
    "\n  mutation CreateCharacter($input: CharacterInput!) {\n    createCharacter(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.CreateCharacterDocument,
    "\n  mutation CreateSpecialMove($input: SpecialMoveInput!) {\n    createSpecialMove(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.CreateSpecialMoveDocument,
    "\n  query GetSpecialMoves {\n    specialMovesCount\n    allSpecialMoves {\n      id\n      name\n      description\n      usedBy {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetSpecialMovesDocument,
    "\n  mutation DeleteSpecialMove($id: ID!) {\n    deleteSpecialMove(id: $id)\n  }\n": typeof types.DeleteSpecialMoveDocument,
    "\n  subscription NewSpecialMove {\n    newSpecialMove {\n      name\n      usedBy {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n": typeof types.NewSpecialMoveDocument,
};
const documents: Documents = {
    "\n  query GetCharacters {\n    charactersCount\n    allCharacters {\n      id\n      name\n      description\n      learnedSpecialMoves {\n        id\n        name\n      }\n    }\n  }\n": types.GetCharactersDocument,
    "\n  mutation DeleteCharacter($id: ID!) {\n    deleteCharacter(id: $id)\n  }\n": types.DeleteCharacterDocument,
    "\n  mutation CreateCharacter($input: CharacterInput!) {\n    createCharacter(input: $input) {\n      id\n      name\n    }\n  }\n": types.CreateCharacterDocument,
    "\n  mutation CreateSpecialMove($input: SpecialMoveInput!) {\n    createSpecialMove(input: $input) {\n      id\n      name\n    }\n  }\n": types.CreateSpecialMoveDocument,
    "\n  query GetSpecialMoves {\n    specialMovesCount\n    allSpecialMoves {\n      id\n      name\n      description\n      usedBy {\n        id\n        name\n      }\n    }\n  }\n": types.GetSpecialMovesDocument,
    "\n  mutation DeleteSpecialMove($id: ID!) {\n    deleteSpecialMove(id: $id)\n  }\n": types.DeleteSpecialMoveDocument,
    "\n  subscription NewSpecialMove {\n    newSpecialMove {\n      name\n      usedBy {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n": types.NewSpecialMoveDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacters {\n    charactersCount\n    allCharacters {\n      id\n      name\n      description\n      learnedSpecialMoves {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCharacters {\n    charactersCount\n    allCharacters {\n      id\n      name\n      description\n      learnedSpecialMoves {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCharacter($id: ID!) {\n    deleteCharacter(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCharacter($id: ID!) {\n    deleteCharacter(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCharacter($input: CharacterInput!) {\n    createCharacter(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCharacter($input: CharacterInput!) {\n    createCharacter(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSpecialMove($input: SpecialMoveInput!) {\n    createSpecialMove(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSpecialMove($input: SpecialMoveInput!) {\n    createSpecialMove(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSpecialMoves {\n    specialMovesCount\n    allSpecialMoves {\n      id\n      name\n      description\n      usedBy {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSpecialMoves {\n    specialMovesCount\n    allSpecialMoves {\n      id\n      name\n      description\n      usedBy {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSpecialMove($id: ID!) {\n    deleteSpecialMove(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteSpecialMove($id: ID!) {\n    deleteSpecialMove(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription NewSpecialMove {\n    newSpecialMove {\n      name\n      usedBy {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription NewSpecialMove {\n    newSpecialMove {\n      name\n      usedBy {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;