/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

/** キャラクター */
export type Character = {
  __typename?: 'Character';
  /** 説明 */
  description?: Maybe<Scalars['String']['output']>;
  /** ID */
  id: Scalars['ID']['output'];
  /** 使える必殺技 */
  learnedSpecialMoves: Array<SpecialMove>;
  /** 名前 */
  name: Scalars['String']['output'];
};

/** キャラクターの入力 */
export type CharacterInput = {
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 使える必殺技 */
  learnedSpecialMoves: Array<Scalars['ID']['input']>;
  /** 名前 */
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** キャラクターの新規登録 */
  createCharacter: Character;
  /** 必殺技の新規登録 */
  createSpecialMove: SpecialMove;
  /** キャラクターの削除 */
  deleteCharacter: Character;
  /** 必殺技の削除 */
  deleteSpecialMove: Scalars['Boolean']['output'];
  /** キャラクターの更新 */
  updateCharacter: Character;
  /** 必殺技の更新 */
  updateSpecialMove: SpecialMove;
};


export type MutationCreateCharacterArgs = {
  input: CharacterInput;
};


export type MutationCreateSpecialMoveArgs = {
  input: SpecialMoveInput;
};


export type MutationDeleteCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSpecialMoveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCharacterArgs = {
  id: Scalars['ID']['input'];
  input: CharacterInput;
};


export type MutationUpdateSpecialMoveArgs = {
  id: Scalars['ID']['input'];
  input: SpecialMoveInput;
};

export type Query = {
  __typename?: 'Query';
  /** 登録されているキャラクターの一覧 */
  allCharacters: Array<Character>;
  /** 登録されている必殺技の一覧 */
  allSpecialMoves: Array<SpecialMove>;
  /** 登録されているキャラクターの数 */
  charactersCount: Scalars['Int']['output'];
  /** 登録されている必殺技の数 */
  specialMovesCount: Scalars['Int']['output'];
};


export type QueryAllSpecialMovesArgs = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
};

/** 必殺技 */
export type SpecialMove = {
  __typename?: 'SpecialMove';
  /** 登録日時 */
  createdAt: Scalars['DateTime']['output'];
  /**
   * 説明
   * @deprecated 説明など不要！
   */
  description?: Maybe<Scalars['String']['output']>;
  /** ID */
  id: Scalars['ID']['output'];
  /** 名前 */
  name: Scalars['String']['output'];
  /** 使用キャラクター */
  usedBy: Array<Character>;
};

/** 必殺技の入力 */
export type SpecialMoveInput = {
  /** 説明 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 名前 */
  name: Scalars['String']['input'];
  /** 使用キャラクター */
  usedBy: Array<Scalars['ID']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** 必殺技の新規登録を監視 */
  newSpecialMove: SpecialMove;
};

export type GetCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCharactersQuery = { __typename?: 'Query', charactersCount: number, allCharacters: Array<{ __typename?: 'Character', id: string, name: string, description?: string | null }> };

export type GetSpecialMovesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpecialMovesQuery = { __typename?: 'Query', specialMovesCount: number, allSpecialMoves: Array<{ __typename?: 'SpecialMove', id: string, name: string, description?: string | null }> };


export const GetCharactersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCharacters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"charactersCount"}},{"kind":"Field","name":{"kind":"Name","value":"allCharacters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetCharactersQuery, GetCharactersQueryVariables>;
export const GetSpecialMovesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpecialMoves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"specialMovesCount"}},{"kind":"Field","name":{"kind":"Name","value":"allSpecialMoves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetSpecialMovesQuery, GetSpecialMovesQueryVariables>;