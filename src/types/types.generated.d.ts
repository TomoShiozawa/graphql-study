import { GraphQLResolveInfo } from 'graphql';
import { SpecialMoveModel, CharacterModel } from './models';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

/** 必殺技 */
export type SpecialMove = {
  __typename?: 'SpecialMove';
  /** 説明 */
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Character: ResolverTypeWrapper<CharacterModel>;
  CharacterInput: CharacterInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SpecialMove: ResolverTypeWrapper<SpecialMoveModel>;
  SpecialMoveInput: SpecialMoveInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Character: CharacterModel;
  CharacterInput: CharacterInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  SpecialMove: SpecialMoveModel;
  SpecialMoveInput: SpecialMoveInput;
  String: Scalars['String']['output'];
}>;

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  learnedSpecialMoves?: Resolver<Array<ResolversTypes['SpecialMove']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCharacter?: Resolver<ResolversTypes['Character'], ParentType, ContextType, RequireFields<MutationCreateCharacterArgs, 'input'>>;
  createSpecialMove?: Resolver<ResolversTypes['SpecialMove'], ParentType, ContextType, RequireFields<MutationCreateSpecialMoveArgs, 'input'>>;
  deleteCharacter?: Resolver<ResolversTypes['Character'], ParentType, ContextType, RequireFields<MutationDeleteCharacterArgs, 'id'>>;
  deleteSpecialMove?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSpecialMoveArgs, 'id'>>;
  updateCharacter?: Resolver<ResolversTypes['Character'], ParentType, ContextType, RequireFields<MutationUpdateCharacterArgs, 'id' | 'input'>>;
  updateSpecialMove?: Resolver<ResolversTypes['SpecialMove'], ParentType, ContextType, RequireFields<MutationUpdateSpecialMoveArgs, 'id' | 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allCharacters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  allSpecialMoves?: Resolver<Array<ResolversTypes['SpecialMove']>, ParentType, ContextType>;
  charactersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  specialMovesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type SpecialMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpecialMove'] = ResolversParentTypes['SpecialMove']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  usedBy?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Character?: CharacterResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SpecialMove?: SpecialMoveResolvers<ContextType>;
}>;

