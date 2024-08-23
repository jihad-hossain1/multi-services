
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model ULink
 * 
 */
export type ULink = $Result.DefaultSelection<Prisma.$ULinkPayload>
/**
 * Model LmTmLnk
 * 
 */
export type LmTmLnk = $Result.DefaultSelection<Prisma.$LmTmLnkPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ustatus: {
  FREE: 'FREE',
  PAID: 'PAID'
};

export type ustatus = (typeof ustatus)[keyof typeof ustatus]


export const uverify: {
  VERIFIED: 'VERIFIED',
  PENDING: 'PENDING'
};

export type uverify = (typeof uverify)[keyof typeof uverify]

}

export type ustatus = $Enums.ustatus

export const ustatus: typeof $Enums.ustatus

export type uverify = $Enums.uverify

export const uverify: typeof $Enums.uverify

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ULinks
 * const uLinks = await prisma.uLink.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ULinks
   * const uLinks = await prisma.uLink.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.uLink`: Exposes CRUD operations for the **ULink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ULinks
    * const uLinks = await prisma.uLink.findMany()
    * ```
    */
  get uLink(): Prisma.ULinkDelegate<ExtArgs>;

  /**
   * `prisma.lmTmLnk`: Exposes CRUD operations for the **LmTmLnk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LmTmLnks
    * const lmTmLnks = await prisma.lmTmLnk.findMany()
    * ```
    */
  get lmTmLnk(): Prisma.LmTmLnkDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.18.0
   * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ULink: 'ULink',
    LmTmLnk: 'LmTmLnk',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "uLink" | "lmTmLnk" | "user"
      txIsolationLevel: never
    }
    model: {
      ULink: {
        payload: Prisma.$ULinkPayload<ExtArgs>
        fields: Prisma.ULinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ULinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ULinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>
          }
          findFirst: {
            args: Prisma.ULinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ULinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>
          }
          findMany: {
            args: Prisma.ULinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>[]
          }
          create: {
            args: Prisma.ULinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>
          }
          createMany: {
            args: Prisma.ULinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ULinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>
          }
          update: {
            args: Prisma.ULinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>
          }
          deleteMany: {
            args: Prisma.ULinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ULinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ULinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ULinkPayload>
          }
          aggregate: {
            args: Prisma.ULinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateULink>
          }
          groupBy: {
            args: Prisma.ULinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<ULinkGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ULinkFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ULinkAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ULinkCountArgs<ExtArgs>
            result: $Utils.Optional<ULinkCountAggregateOutputType> | number
          }
        }
      }
      LmTmLnk: {
        payload: Prisma.$LmTmLnkPayload<ExtArgs>
        fields: Prisma.LmTmLnkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LmTmLnkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LmTmLnkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>
          }
          findFirst: {
            args: Prisma.LmTmLnkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LmTmLnkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>
          }
          findMany: {
            args: Prisma.LmTmLnkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>[]
          }
          create: {
            args: Prisma.LmTmLnkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>
          }
          createMany: {
            args: Prisma.LmTmLnkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LmTmLnkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>
          }
          update: {
            args: Prisma.LmTmLnkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>
          }
          deleteMany: {
            args: Prisma.LmTmLnkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LmTmLnkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LmTmLnkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LmTmLnkPayload>
          }
          aggregate: {
            args: Prisma.LmTmLnkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLmTmLnk>
          }
          groupBy: {
            args: Prisma.LmTmLnkGroupByArgs<ExtArgs>
            result: $Utils.Optional<LmTmLnkGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LmTmLnkFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LmTmLnkAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LmTmLnkCountArgs<ExtArgs>
            result: $Utils.Optional<LmTmLnkCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    links: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | UserCountOutputTypeCountLinksArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ULinkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Address
   */





  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
  }, ExtArgs["result"]["address"]>


  export type AddressSelectScalar = {
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
  }


  export type $AddressPayload = {
    name: "Address"
    objects: {}
    scalars: {
      street: string
      city: string
      state: string
      zip: string
    }
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>





  /**
   * Fields of the Address model
   */ 
  interface AddressFieldRefs {
    readonly street: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly zip: FieldRef<"Address", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
  }


  /**
   * Model ULink
   */

  export type AggregateULink = {
    _count: ULinkCountAggregateOutputType | null
    _min: ULinkMinAggregateOutputType | null
    _max: ULinkMaxAggregateOutputType | null
  }

  export type ULinkMinAggregateOutputType = {
    id: string | null
    link: string | null
    content: string | null
    authorId: string | null
  }

  export type ULinkMaxAggregateOutputType = {
    id: string | null
    link: string | null
    content: string | null
    authorId: string | null
  }

  export type ULinkCountAggregateOutputType = {
    id: number
    link: number
    content: number
    authorId: number
    _all: number
  }


  export type ULinkMinAggregateInputType = {
    id?: true
    link?: true
    content?: true
    authorId?: true
  }

  export type ULinkMaxAggregateInputType = {
    id?: true
    link?: true
    content?: true
    authorId?: true
  }

  export type ULinkCountAggregateInputType = {
    id?: true
    link?: true
    content?: true
    authorId?: true
    _all?: true
  }

  export type ULinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ULink to aggregate.
     */
    where?: ULinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ULinks to fetch.
     */
    orderBy?: ULinkOrderByWithRelationInput | ULinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ULinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ULinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ULinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ULinks
    **/
    _count?: true | ULinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ULinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ULinkMaxAggregateInputType
  }

  export type GetULinkAggregateType<T extends ULinkAggregateArgs> = {
        [P in keyof T & keyof AggregateULink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateULink[P]>
      : GetScalarType<T[P], AggregateULink[P]>
  }




  export type ULinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ULinkWhereInput
    orderBy?: ULinkOrderByWithAggregationInput | ULinkOrderByWithAggregationInput[]
    by: ULinkScalarFieldEnum[] | ULinkScalarFieldEnum
    having?: ULinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ULinkCountAggregateInputType | true
    _min?: ULinkMinAggregateInputType
    _max?: ULinkMaxAggregateInputType
  }

  export type ULinkGroupByOutputType = {
    id: string
    link: string
    content: string
    authorId: string
    _count: ULinkCountAggregateOutputType | null
    _min: ULinkMinAggregateOutputType | null
    _max: ULinkMaxAggregateOutputType | null
  }

  type GetULinkGroupByPayload<T extends ULinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ULinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ULinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ULinkGroupByOutputType[P]>
            : GetScalarType<T[P], ULinkGroupByOutputType[P]>
        }
      >
    >


  export type ULinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    content?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uLink"]>


  export type ULinkSelectScalar = {
    id?: boolean
    link?: boolean
    content?: boolean
    authorId?: boolean
  }

  export type ULinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ULinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ULink"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      link: string
      content: string
      authorId: string
    }, ExtArgs["result"]["uLink"]>
    composites: {}
  }

  type ULinkGetPayload<S extends boolean | null | undefined | ULinkDefaultArgs> = $Result.GetResult<Prisma.$ULinkPayload, S>

  type ULinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ULinkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ULinkCountAggregateInputType | true
    }

  export interface ULinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ULink'], meta: { name: 'ULink' } }
    /**
     * Find zero or one ULink that matches the filter.
     * @param {ULinkFindUniqueArgs} args - Arguments to find a ULink
     * @example
     * // Get one ULink
     * const uLink = await prisma.uLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ULinkFindUniqueArgs>(args: SelectSubset<T, ULinkFindUniqueArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ULink that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ULinkFindUniqueOrThrowArgs} args - Arguments to find a ULink
     * @example
     * // Get one ULink
     * const uLink = await prisma.uLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ULinkFindUniqueOrThrowArgs>(args: SelectSubset<T, ULinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ULink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkFindFirstArgs} args - Arguments to find a ULink
     * @example
     * // Get one ULink
     * const uLink = await prisma.uLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ULinkFindFirstArgs>(args?: SelectSubset<T, ULinkFindFirstArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ULink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkFindFirstOrThrowArgs} args - Arguments to find a ULink
     * @example
     * // Get one ULink
     * const uLink = await prisma.uLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ULinkFindFirstOrThrowArgs>(args?: SelectSubset<T, ULinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ULinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ULinks
     * const uLinks = await prisma.uLink.findMany()
     * 
     * // Get first 10 ULinks
     * const uLinks = await prisma.uLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uLinkWithIdOnly = await prisma.uLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ULinkFindManyArgs>(args?: SelectSubset<T, ULinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ULink.
     * @param {ULinkCreateArgs} args - Arguments to create a ULink.
     * @example
     * // Create one ULink
     * const ULink = await prisma.uLink.create({
     *   data: {
     *     // ... data to create a ULink
     *   }
     * })
     * 
     */
    create<T extends ULinkCreateArgs>(args: SelectSubset<T, ULinkCreateArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ULinks.
     * @param {ULinkCreateManyArgs} args - Arguments to create many ULinks.
     * @example
     * // Create many ULinks
     * const uLink = await prisma.uLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ULinkCreateManyArgs>(args?: SelectSubset<T, ULinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ULink.
     * @param {ULinkDeleteArgs} args - Arguments to delete one ULink.
     * @example
     * // Delete one ULink
     * const ULink = await prisma.uLink.delete({
     *   where: {
     *     // ... filter to delete one ULink
     *   }
     * })
     * 
     */
    delete<T extends ULinkDeleteArgs>(args: SelectSubset<T, ULinkDeleteArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ULink.
     * @param {ULinkUpdateArgs} args - Arguments to update one ULink.
     * @example
     * // Update one ULink
     * const uLink = await prisma.uLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ULinkUpdateArgs>(args: SelectSubset<T, ULinkUpdateArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ULinks.
     * @param {ULinkDeleteManyArgs} args - Arguments to filter ULinks to delete.
     * @example
     * // Delete a few ULinks
     * const { count } = await prisma.uLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ULinkDeleteManyArgs>(args?: SelectSubset<T, ULinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ULinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ULinks
     * const uLink = await prisma.uLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ULinkUpdateManyArgs>(args: SelectSubset<T, ULinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ULink.
     * @param {ULinkUpsertArgs} args - Arguments to update or create a ULink.
     * @example
     * // Update or create a ULink
     * const uLink = await prisma.uLink.upsert({
     *   create: {
     *     // ... data to create a ULink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ULink we want to update
     *   }
     * })
     */
    upsert<T extends ULinkUpsertArgs>(args: SelectSubset<T, ULinkUpsertArgs<ExtArgs>>): Prisma__ULinkClient<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more ULinks that matches the filter.
     * @param {ULinkFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const uLink = await prisma.uLink.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: ULinkFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ULink.
     * @param {ULinkAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const uLink = await prisma.uLink.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ULinkAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ULinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkCountArgs} args - Arguments to filter ULinks to count.
     * @example
     * // Count the number of ULinks
     * const count = await prisma.uLink.count({
     *   where: {
     *     // ... the filter for the ULinks we want to count
     *   }
     * })
    **/
    count<T extends ULinkCountArgs>(
      args?: Subset<T, ULinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ULinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ULink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ULinkAggregateArgs>(args: Subset<T, ULinkAggregateArgs>): Prisma.PrismaPromise<GetULinkAggregateType<T>>

    /**
     * Group by ULink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ULinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ULinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ULinkGroupByArgs['orderBy'] }
        : { orderBy?: ULinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ULinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetULinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ULink model
   */
  readonly fields: ULinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ULink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ULinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ULink model
   */ 
  interface ULinkFieldRefs {
    readonly id: FieldRef<"ULink", 'String'>
    readonly link: FieldRef<"ULink", 'String'>
    readonly content: FieldRef<"ULink", 'String'>
    readonly authorId: FieldRef<"ULink", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ULink findUnique
   */
  export type ULinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * Filter, which ULink to fetch.
     */
    where: ULinkWhereUniqueInput
  }

  /**
   * ULink findUniqueOrThrow
   */
  export type ULinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * Filter, which ULink to fetch.
     */
    where: ULinkWhereUniqueInput
  }

  /**
   * ULink findFirst
   */
  export type ULinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * Filter, which ULink to fetch.
     */
    where?: ULinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ULinks to fetch.
     */
    orderBy?: ULinkOrderByWithRelationInput | ULinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ULinks.
     */
    cursor?: ULinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ULinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ULinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ULinks.
     */
    distinct?: ULinkScalarFieldEnum | ULinkScalarFieldEnum[]
  }

  /**
   * ULink findFirstOrThrow
   */
  export type ULinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * Filter, which ULink to fetch.
     */
    where?: ULinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ULinks to fetch.
     */
    orderBy?: ULinkOrderByWithRelationInput | ULinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ULinks.
     */
    cursor?: ULinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ULinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ULinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ULinks.
     */
    distinct?: ULinkScalarFieldEnum | ULinkScalarFieldEnum[]
  }

  /**
   * ULink findMany
   */
  export type ULinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * Filter, which ULinks to fetch.
     */
    where?: ULinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ULinks to fetch.
     */
    orderBy?: ULinkOrderByWithRelationInput | ULinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ULinks.
     */
    cursor?: ULinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ULinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ULinks.
     */
    skip?: number
    distinct?: ULinkScalarFieldEnum | ULinkScalarFieldEnum[]
  }

  /**
   * ULink create
   */
  export type ULinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * The data needed to create a ULink.
     */
    data: XOR<ULinkCreateInput, ULinkUncheckedCreateInput>
  }

  /**
   * ULink createMany
   */
  export type ULinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ULinks.
     */
    data: ULinkCreateManyInput | ULinkCreateManyInput[]
  }

  /**
   * ULink update
   */
  export type ULinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * The data needed to update a ULink.
     */
    data: XOR<ULinkUpdateInput, ULinkUncheckedUpdateInput>
    /**
     * Choose, which ULink to update.
     */
    where: ULinkWhereUniqueInput
  }

  /**
   * ULink updateMany
   */
  export type ULinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ULinks.
     */
    data: XOR<ULinkUpdateManyMutationInput, ULinkUncheckedUpdateManyInput>
    /**
     * Filter which ULinks to update
     */
    where?: ULinkWhereInput
  }

  /**
   * ULink upsert
   */
  export type ULinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * The filter to search for the ULink to update in case it exists.
     */
    where: ULinkWhereUniqueInput
    /**
     * In case the ULink found by the `where` argument doesn't exist, create a new ULink with this data.
     */
    create: XOR<ULinkCreateInput, ULinkUncheckedCreateInput>
    /**
     * In case the ULink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ULinkUpdateInput, ULinkUncheckedUpdateInput>
  }

  /**
   * ULink delete
   */
  export type ULinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    /**
     * Filter which ULink to delete.
     */
    where: ULinkWhereUniqueInput
  }

  /**
   * ULink deleteMany
   */
  export type ULinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ULinks to delete
     */
    where?: ULinkWhereInput
  }

  /**
   * ULink findRaw
   */
  export type ULinkFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ULink aggregateRaw
   */
  export type ULinkAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ULink without action
   */
  export type ULinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
  }


  /**
   * Model LmTmLnk
   */

  export type AggregateLmTmLnk = {
    _count: LmTmLnkCountAggregateOutputType | null
    _min: LmTmLnkMinAggregateOutputType | null
    _max: LmTmLnkMaxAggregateOutputType | null
  }

  export type LmTmLnkMinAggregateOutputType = {
    id: string | null
    link: string | null
    content: string | null
    xdate: Date | null
  }

  export type LmTmLnkMaxAggregateOutputType = {
    id: string | null
    link: string | null
    content: string | null
    xdate: Date | null
  }

  export type LmTmLnkCountAggregateOutputType = {
    id: number
    link: number
    content: number
    xdate: number
    _all: number
  }


  export type LmTmLnkMinAggregateInputType = {
    id?: true
    link?: true
    content?: true
    xdate?: true
  }

  export type LmTmLnkMaxAggregateInputType = {
    id?: true
    link?: true
    content?: true
    xdate?: true
  }

  export type LmTmLnkCountAggregateInputType = {
    id?: true
    link?: true
    content?: true
    xdate?: true
    _all?: true
  }

  export type LmTmLnkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LmTmLnk to aggregate.
     */
    where?: LmTmLnkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LmTmLnks to fetch.
     */
    orderBy?: LmTmLnkOrderByWithRelationInput | LmTmLnkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LmTmLnkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LmTmLnks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LmTmLnks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LmTmLnks
    **/
    _count?: true | LmTmLnkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LmTmLnkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LmTmLnkMaxAggregateInputType
  }

  export type GetLmTmLnkAggregateType<T extends LmTmLnkAggregateArgs> = {
        [P in keyof T & keyof AggregateLmTmLnk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLmTmLnk[P]>
      : GetScalarType<T[P], AggregateLmTmLnk[P]>
  }




  export type LmTmLnkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LmTmLnkWhereInput
    orderBy?: LmTmLnkOrderByWithAggregationInput | LmTmLnkOrderByWithAggregationInput[]
    by: LmTmLnkScalarFieldEnum[] | LmTmLnkScalarFieldEnum
    having?: LmTmLnkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LmTmLnkCountAggregateInputType | true
    _min?: LmTmLnkMinAggregateInputType
    _max?: LmTmLnkMaxAggregateInputType
  }

  export type LmTmLnkGroupByOutputType = {
    id: string
    link: string
    content: string | null
    xdate: Date
    _count: LmTmLnkCountAggregateOutputType | null
    _min: LmTmLnkMinAggregateOutputType | null
    _max: LmTmLnkMaxAggregateOutputType | null
  }

  type GetLmTmLnkGroupByPayload<T extends LmTmLnkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LmTmLnkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LmTmLnkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LmTmLnkGroupByOutputType[P]>
            : GetScalarType<T[P], LmTmLnkGroupByOutputType[P]>
        }
      >
    >


  export type LmTmLnkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    link?: boolean
    content?: boolean
    xdate?: boolean
  }, ExtArgs["result"]["lmTmLnk"]>


  export type LmTmLnkSelectScalar = {
    id?: boolean
    link?: boolean
    content?: boolean
    xdate?: boolean
  }


  export type $LmTmLnkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LmTmLnk"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      link: string
      content: string | null
      xdate: Date
    }, ExtArgs["result"]["lmTmLnk"]>
    composites: {}
  }

  type LmTmLnkGetPayload<S extends boolean | null | undefined | LmTmLnkDefaultArgs> = $Result.GetResult<Prisma.$LmTmLnkPayload, S>

  type LmTmLnkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LmTmLnkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LmTmLnkCountAggregateInputType | true
    }

  export interface LmTmLnkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LmTmLnk'], meta: { name: 'LmTmLnk' } }
    /**
     * Find zero or one LmTmLnk that matches the filter.
     * @param {LmTmLnkFindUniqueArgs} args - Arguments to find a LmTmLnk
     * @example
     * // Get one LmTmLnk
     * const lmTmLnk = await prisma.lmTmLnk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LmTmLnkFindUniqueArgs>(args: SelectSubset<T, LmTmLnkFindUniqueArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LmTmLnk that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LmTmLnkFindUniqueOrThrowArgs} args - Arguments to find a LmTmLnk
     * @example
     * // Get one LmTmLnk
     * const lmTmLnk = await prisma.lmTmLnk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LmTmLnkFindUniqueOrThrowArgs>(args: SelectSubset<T, LmTmLnkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LmTmLnk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkFindFirstArgs} args - Arguments to find a LmTmLnk
     * @example
     * // Get one LmTmLnk
     * const lmTmLnk = await prisma.lmTmLnk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LmTmLnkFindFirstArgs>(args?: SelectSubset<T, LmTmLnkFindFirstArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LmTmLnk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkFindFirstOrThrowArgs} args - Arguments to find a LmTmLnk
     * @example
     * // Get one LmTmLnk
     * const lmTmLnk = await prisma.lmTmLnk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LmTmLnkFindFirstOrThrowArgs>(args?: SelectSubset<T, LmTmLnkFindFirstOrThrowArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LmTmLnks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LmTmLnks
     * const lmTmLnks = await prisma.lmTmLnk.findMany()
     * 
     * // Get first 10 LmTmLnks
     * const lmTmLnks = await prisma.lmTmLnk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lmTmLnkWithIdOnly = await prisma.lmTmLnk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LmTmLnkFindManyArgs>(args?: SelectSubset<T, LmTmLnkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LmTmLnk.
     * @param {LmTmLnkCreateArgs} args - Arguments to create a LmTmLnk.
     * @example
     * // Create one LmTmLnk
     * const LmTmLnk = await prisma.lmTmLnk.create({
     *   data: {
     *     // ... data to create a LmTmLnk
     *   }
     * })
     * 
     */
    create<T extends LmTmLnkCreateArgs>(args: SelectSubset<T, LmTmLnkCreateArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LmTmLnks.
     * @param {LmTmLnkCreateManyArgs} args - Arguments to create many LmTmLnks.
     * @example
     * // Create many LmTmLnks
     * const lmTmLnk = await prisma.lmTmLnk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LmTmLnkCreateManyArgs>(args?: SelectSubset<T, LmTmLnkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LmTmLnk.
     * @param {LmTmLnkDeleteArgs} args - Arguments to delete one LmTmLnk.
     * @example
     * // Delete one LmTmLnk
     * const LmTmLnk = await prisma.lmTmLnk.delete({
     *   where: {
     *     // ... filter to delete one LmTmLnk
     *   }
     * })
     * 
     */
    delete<T extends LmTmLnkDeleteArgs>(args: SelectSubset<T, LmTmLnkDeleteArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LmTmLnk.
     * @param {LmTmLnkUpdateArgs} args - Arguments to update one LmTmLnk.
     * @example
     * // Update one LmTmLnk
     * const lmTmLnk = await prisma.lmTmLnk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LmTmLnkUpdateArgs>(args: SelectSubset<T, LmTmLnkUpdateArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LmTmLnks.
     * @param {LmTmLnkDeleteManyArgs} args - Arguments to filter LmTmLnks to delete.
     * @example
     * // Delete a few LmTmLnks
     * const { count } = await prisma.lmTmLnk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LmTmLnkDeleteManyArgs>(args?: SelectSubset<T, LmTmLnkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LmTmLnks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LmTmLnks
     * const lmTmLnk = await prisma.lmTmLnk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LmTmLnkUpdateManyArgs>(args: SelectSubset<T, LmTmLnkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LmTmLnk.
     * @param {LmTmLnkUpsertArgs} args - Arguments to update or create a LmTmLnk.
     * @example
     * // Update or create a LmTmLnk
     * const lmTmLnk = await prisma.lmTmLnk.upsert({
     *   create: {
     *     // ... data to create a LmTmLnk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LmTmLnk we want to update
     *   }
     * })
     */
    upsert<T extends LmTmLnkUpsertArgs>(args: SelectSubset<T, LmTmLnkUpsertArgs<ExtArgs>>): Prisma__LmTmLnkClient<$Result.GetResult<Prisma.$LmTmLnkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more LmTmLnks that matches the filter.
     * @param {LmTmLnkFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lmTmLnk = await prisma.lmTmLnk.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: LmTmLnkFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a LmTmLnk.
     * @param {LmTmLnkAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lmTmLnk = await prisma.lmTmLnk.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LmTmLnkAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of LmTmLnks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkCountArgs} args - Arguments to filter LmTmLnks to count.
     * @example
     * // Count the number of LmTmLnks
     * const count = await prisma.lmTmLnk.count({
     *   where: {
     *     // ... the filter for the LmTmLnks we want to count
     *   }
     * })
    **/
    count<T extends LmTmLnkCountArgs>(
      args?: Subset<T, LmTmLnkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LmTmLnkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LmTmLnk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LmTmLnkAggregateArgs>(args: Subset<T, LmTmLnkAggregateArgs>): Prisma.PrismaPromise<GetLmTmLnkAggregateType<T>>

    /**
     * Group by LmTmLnk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LmTmLnkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LmTmLnkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LmTmLnkGroupByArgs['orderBy'] }
        : { orderBy?: LmTmLnkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LmTmLnkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLmTmLnkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LmTmLnk model
   */
  readonly fields: LmTmLnkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LmTmLnk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LmTmLnkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LmTmLnk model
   */ 
  interface LmTmLnkFieldRefs {
    readonly id: FieldRef<"LmTmLnk", 'String'>
    readonly link: FieldRef<"LmTmLnk", 'String'>
    readonly content: FieldRef<"LmTmLnk", 'String'>
    readonly xdate: FieldRef<"LmTmLnk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LmTmLnk findUnique
   */
  export type LmTmLnkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * Filter, which LmTmLnk to fetch.
     */
    where: LmTmLnkWhereUniqueInput
  }

  /**
   * LmTmLnk findUniqueOrThrow
   */
  export type LmTmLnkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * Filter, which LmTmLnk to fetch.
     */
    where: LmTmLnkWhereUniqueInput
  }

  /**
   * LmTmLnk findFirst
   */
  export type LmTmLnkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * Filter, which LmTmLnk to fetch.
     */
    where?: LmTmLnkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LmTmLnks to fetch.
     */
    orderBy?: LmTmLnkOrderByWithRelationInput | LmTmLnkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LmTmLnks.
     */
    cursor?: LmTmLnkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LmTmLnks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LmTmLnks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LmTmLnks.
     */
    distinct?: LmTmLnkScalarFieldEnum | LmTmLnkScalarFieldEnum[]
  }

  /**
   * LmTmLnk findFirstOrThrow
   */
  export type LmTmLnkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * Filter, which LmTmLnk to fetch.
     */
    where?: LmTmLnkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LmTmLnks to fetch.
     */
    orderBy?: LmTmLnkOrderByWithRelationInput | LmTmLnkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LmTmLnks.
     */
    cursor?: LmTmLnkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LmTmLnks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LmTmLnks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LmTmLnks.
     */
    distinct?: LmTmLnkScalarFieldEnum | LmTmLnkScalarFieldEnum[]
  }

  /**
   * LmTmLnk findMany
   */
  export type LmTmLnkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * Filter, which LmTmLnks to fetch.
     */
    where?: LmTmLnkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LmTmLnks to fetch.
     */
    orderBy?: LmTmLnkOrderByWithRelationInput | LmTmLnkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LmTmLnks.
     */
    cursor?: LmTmLnkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LmTmLnks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LmTmLnks.
     */
    skip?: number
    distinct?: LmTmLnkScalarFieldEnum | LmTmLnkScalarFieldEnum[]
  }

  /**
   * LmTmLnk create
   */
  export type LmTmLnkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * The data needed to create a LmTmLnk.
     */
    data: XOR<LmTmLnkCreateInput, LmTmLnkUncheckedCreateInput>
  }

  /**
   * LmTmLnk createMany
   */
  export type LmTmLnkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LmTmLnks.
     */
    data: LmTmLnkCreateManyInput | LmTmLnkCreateManyInput[]
  }

  /**
   * LmTmLnk update
   */
  export type LmTmLnkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * The data needed to update a LmTmLnk.
     */
    data: XOR<LmTmLnkUpdateInput, LmTmLnkUncheckedUpdateInput>
    /**
     * Choose, which LmTmLnk to update.
     */
    where: LmTmLnkWhereUniqueInput
  }

  /**
   * LmTmLnk updateMany
   */
  export type LmTmLnkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LmTmLnks.
     */
    data: XOR<LmTmLnkUpdateManyMutationInput, LmTmLnkUncheckedUpdateManyInput>
    /**
     * Filter which LmTmLnks to update
     */
    where?: LmTmLnkWhereInput
  }

  /**
   * LmTmLnk upsert
   */
  export type LmTmLnkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * The filter to search for the LmTmLnk to update in case it exists.
     */
    where: LmTmLnkWhereUniqueInput
    /**
     * In case the LmTmLnk found by the `where` argument doesn't exist, create a new LmTmLnk with this data.
     */
    create: XOR<LmTmLnkCreateInput, LmTmLnkUncheckedCreateInput>
    /**
     * In case the LmTmLnk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LmTmLnkUpdateInput, LmTmLnkUncheckedUpdateInput>
  }

  /**
   * LmTmLnk delete
   */
  export type LmTmLnkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
    /**
     * Filter which LmTmLnk to delete.
     */
    where: LmTmLnkWhereUniqueInput
  }

  /**
   * LmTmLnk deleteMany
   */
  export type LmTmLnkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LmTmLnks to delete
     */
    where?: LmTmLnkWhereInput
  }

  /**
   * LmTmLnk findRaw
   */
  export type LmTmLnkFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LmTmLnk aggregateRaw
   */
  export type LmTmLnkAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LmTmLnk without action
   */
  export type LmTmLnkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LmTmLnk
     */
    select?: LmTmLnkSelect<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    status: $Enums.ustatus | null
    verify: $Enums.uverify | null
    xcode: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    status: $Enums.ustatus | null
    verify: $Enums.uverify | null
    xcode: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    status: number
    verify: number
    xcode: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    status?: true
    verify?: true
    xcode?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    status?: true
    verify?: true
    xcode?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    status?: true
    verify?: true
    xcode?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    status: $Enums.ustatus
    verify: $Enums.uverify
    xcode: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    status?: boolean
    verify?: boolean
    xcode?: boolean
    address?: boolean | AddressDefaultArgs<ExtArgs>
    links?: boolean | User$linksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    status?: boolean
    verify?: boolean
    xcode?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | User$linksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      links: Prisma.$ULinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      status: $Enums.ustatus
      verify: $Enums.uverify
      xcode: string | null
    }, ExtArgs["result"]["user"]>
    composites: {
      address: Prisma.$AddressPayload | null
    }
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    links<T extends User$linksArgs<ExtArgs> = {}>(args?: Subset<T, User$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ULinkPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'ustatus'>
    readonly verify: FieldRef<"User", 'uverify'>
    readonly xcode: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.links
   */
  export type User$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ULink
     */
    select?: ULinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ULinkInclude<ExtArgs> | null
    where?: ULinkWhereInput
    orderBy?: ULinkOrderByWithRelationInput | ULinkOrderByWithRelationInput[]
    cursor?: ULinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ULinkScalarFieldEnum | ULinkScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const ULinkScalarFieldEnum: {
    id: 'id',
    link: 'link',
    content: 'content',
    authorId: 'authorId'
  };

  export type ULinkScalarFieldEnum = (typeof ULinkScalarFieldEnum)[keyof typeof ULinkScalarFieldEnum]


  export const LmTmLnkScalarFieldEnum: {
    id: 'id',
    link: 'link',
    content: 'content',
    xdate: 'xdate'
  };

  export type LmTmLnkScalarFieldEnum = (typeof LmTmLnkScalarFieldEnum)[keyof typeof LmTmLnkScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    status: 'status',
    verify: 'verify',
    xcode: 'xcode'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ustatus'
   */
  export type EnumustatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ustatus'>
    


  /**
   * Reference to a field of type 'ustatus[]'
   */
  export type ListEnumustatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ustatus[]'>
    


  /**
   * Reference to a field of type 'uverify'
   */
  export type EnumuverifyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'uverify'>
    


  /**
   * Reference to a field of type 'uverify[]'
   */
  export type ListEnumuverifyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'uverify[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ULinkWhereInput = {
    AND?: ULinkWhereInput | ULinkWhereInput[]
    OR?: ULinkWhereInput[]
    NOT?: ULinkWhereInput | ULinkWhereInput[]
    id?: StringFilter<"ULink"> | string
    link?: StringFilter<"ULink"> | string
    content?: StringFilter<"ULink"> | string
    authorId?: StringFilter<"ULink"> | string
    author?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ULinkOrderByWithRelationInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
  }

  export type ULinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ULinkWhereInput | ULinkWhereInput[]
    OR?: ULinkWhereInput[]
    NOT?: ULinkWhereInput | ULinkWhereInput[]
    link?: StringFilter<"ULink"> | string
    content?: StringFilter<"ULink"> | string
    authorId?: StringFilter<"ULink"> | string
    author?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ULinkOrderByWithAggregationInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    _count?: ULinkCountOrderByAggregateInput
    _max?: ULinkMaxOrderByAggregateInput
    _min?: ULinkMinOrderByAggregateInput
  }

  export type ULinkScalarWhereWithAggregatesInput = {
    AND?: ULinkScalarWhereWithAggregatesInput | ULinkScalarWhereWithAggregatesInput[]
    OR?: ULinkScalarWhereWithAggregatesInput[]
    NOT?: ULinkScalarWhereWithAggregatesInput | ULinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ULink"> | string
    link?: StringWithAggregatesFilter<"ULink"> | string
    content?: StringWithAggregatesFilter<"ULink"> | string
    authorId?: StringWithAggregatesFilter<"ULink"> | string
  }

  export type LmTmLnkWhereInput = {
    AND?: LmTmLnkWhereInput | LmTmLnkWhereInput[]
    OR?: LmTmLnkWhereInput[]
    NOT?: LmTmLnkWhereInput | LmTmLnkWhereInput[]
    id?: StringFilter<"LmTmLnk"> | string
    link?: StringFilter<"LmTmLnk"> | string
    content?: StringNullableFilter<"LmTmLnk"> | string | null
    xdate?: DateTimeFilter<"LmTmLnk"> | Date | string
  }

  export type LmTmLnkOrderByWithRelationInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    xdate?: SortOrder
  }

  export type LmTmLnkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LmTmLnkWhereInput | LmTmLnkWhereInput[]
    OR?: LmTmLnkWhereInput[]
    NOT?: LmTmLnkWhereInput | LmTmLnkWhereInput[]
    link?: StringFilter<"LmTmLnk"> | string
    content?: StringNullableFilter<"LmTmLnk"> | string | null
    xdate?: DateTimeFilter<"LmTmLnk"> | Date | string
  }, "id">

  export type LmTmLnkOrderByWithAggregationInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    xdate?: SortOrder
    _count?: LmTmLnkCountOrderByAggregateInput
    _max?: LmTmLnkMaxOrderByAggregateInput
    _min?: LmTmLnkMinOrderByAggregateInput
  }

  export type LmTmLnkScalarWhereWithAggregatesInput = {
    AND?: LmTmLnkScalarWhereWithAggregatesInput | LmTmLnkScalarWhereWithAggregatesInput[]
    OR?: LmTmLnkScalarWhereWithAggregatesInput[]
    NOT?: LmTmLnkScalarWhereWithAggregatesInput | LmTmLnkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LmTmLnk"> | string
    link?: StringWithAggregatesFilter<"LmTmLnk"> | string
    content?: StringNullableWithAggregatesFilter<"LmTmLnk"> | string | null
    xdate?: DateTimeWithAggregatesFilter<"LmTmLnk"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    status?: EnumustatusFilter<"User"> | $Enums.ustatus
    verify?: EnumuverifyFilter<"User"> | $Enums.uverify
    xcode?: StringNullableFilter<"User"> | string | null
    address?: XOR<AddressNullableCompositeFilter, AddressObjectEqualityInput> | null
    links?: ULinkListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    verify?: SortOrder
    xcode?: SortOrder
    address?: AddressOrderByInput
    links?: ULinkOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    status?: EnumustatusFilter<"User"> | $Enums.ustatus
    verify?: EnumuverifyFilter<"User"> | $Enums.uverify
    xcode?: StringNullableFilter<"User"> | string | null
    address?: XOR<AddressNullableCompositeFilter, AddressObjectEqualityInput> | null
    links?: ULinkListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    verify?: SortOrder
    xcode?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    status?: EnumustatusWithAggregatesFilter<"User"> | $Enums.ustatus
    verify?: EnumuverifyWithAggregatesFilter<"User"> | $Enums.uverify
    xcode?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ULinkCreateInput = {
    id?: string
    link: string
    content: string
    author: UserCreateNestedOneWithoutLinksInput
  }

  export type ULinkUncheckedCreateInput = {
    id?: string
    link: string
    content: string
    authorId: string
  }

  export type ULinkUpdateInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutLinksNestedInput
  }

  export type ULinkUncheckedUpdateInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type ULinkCreateManyInput = {
    id?: string
    link: string
    content: string
    authorId: string
  }

  export type ULinkUpdateManyMutationInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ULinkUncheckedUpdateManyInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type LmTmLnkCreateInput = {
    id?: string
    link: string
    content?: string | null
    xdate?: Date | string
  }

  export type LmTmLnkUncheckedCreateInput = {
    id?: string
    link: string
    content?: string | null
    xdate?: Date | string
  }

  export type LmTmLnkUpdateInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    xdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LmTmLnkUncheckedUpdateInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    xdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LmTmLnkCreateManyInput = {
    id?: string
    link: string
    content?: string | null
    xdate?: Date | string
  }

  export type LmTmLnkUpdateManyMutationInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    xdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LmTmLnkUncheckedUpdateManyInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    xdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    status?: $Enums.ustatus
    verify?: $Enums.uverify
    xcode?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    links?: ULinkCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    status?: $Enums.ustatus
    verify?: $Enums.uverify
    xcode?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
    links?: ULinkUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumustatusFieldUpdateOperationsInput | $Enums.ustatus
    verify?: EnumuverifyFieldUpdateOperationsInput | $Enums.uverify
    xcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    links?: ULinkUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumustatusFieldUpdateOperationsInput | $Enums.ustatus
    verify?: EnumuverifyFieldUpdateOperationsInput | $Enums.uverify
    xcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
    links?: ULinkUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    status?: $Enums.ustatus
    verify?: $Enums.uverify
    xcode?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumustatusFieldUpdateOperationsInput | $Enums.ustatus
    verify?: EnumuverifyFieldUpdateOperationsInput | $Enums.uverify
    xcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumustatusFieldUpdateOperationsInput | $Enums.ustatus
    verify?: EnumuverifyFieldUpdateOperationsInput | $Enums.uverify
    xcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ULinkCountOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
  }

  export type ULinkMaxOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
  }

  export type ULinkMinOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LmTmLnkCountOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    xdate?: SortOrder
  }

  export type LmTmLnkMaxOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    xdate?: SortOrder
  }

  export type LmTmLnkMinOrderByAggregateInput = {
    id?: SortOrder
    link?: SortOrder
    content?: SortOrder
    xdate?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumustatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ustatus | EnumustatusFieldRefInput<$PrismaModel>
    in?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    not?: NestedEnumustatusFilter<$PrismaModel> | $Enums.ustatus
  }

  export type EnumuverifyFilter<$PrismaModel = never> = {
    equals?: $Enums.uverify | EnumuverifyFieldRefInput<$PrismaModel>
    in?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    notIn?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    not?: NestedEnumuverifyFilter<$PrismaModel> | $Enums.uverify
  }

  export type AddressNullableCompositeFilter = {
    equals?: AddressObjectEqualityInput | null
    is?: AddressWhereInput | null
    isNot?: AddressWhereInput | null
    isSet?: boolean
  }

  export type AddressObjectEqualityInput = {
    street: string
    city: string
    state: string
    zip: string
  }

  export type ULinkListRelationFilter = {
    every?: ULinkWhereInput
    some?: ULinkWhereInput
    none?: ULinkWhereInput
  }

  export type AddressOrderByInput = {
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type ULinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    verify?: SortOrder
    xcode?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    verify?: SortOrder
    xcode?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    verify?: SortOrder
    xcode?: SortOrder
  }

  export type EnumustatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ustatus | EnumustatusFieldRefInput<$PrismaModel>
    in?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    not?: NestedEnumustatusWithAggregatesFilter<$PrismaModel> | $Enums.ustatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumustatusFilter<$PrismaModel>
    _max?: NestedEnumustatusFilter<$PrismaModel>
  }

  export type EnumuverifyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.uverify | EnumuverifyFieldRefInput<$PrismaModel>
    in?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    notIn?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    not?: NestedEnumuverifyWithAggregatesFilter<$PrismaModel> | $Enums.uverify
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuverifyFilter<$PrismaModel>
    _max?: NestedEnumuverifyFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutLinksInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    upsert?: UserUpsertWithoutLinksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLinksInput, UserUpdateWithoutLinksInput>, UserUncheckedUpdateWithoutLinksInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AddressNullableCreateEnvelopeInput = {
    set?: AddressCreateInput | null
  }

  export type AddressCreateInput = {
    street: string
    city: string
    state: string
    zip: string
  }

  export type ULinkCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ULinkCreateWithoutAuthorInput, ULinkUncheckedCreateWithoutAuthorInput> | ULinkCreateWithoutAuthorInput[] | ULinkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ULinkCreateOrConnectWithoutAuthorInput | ULinkCreateOrConnectWithoutAuthorInput[]
    createMany?: ULinkCreateManyAuthorInputEnvelope
    connect?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
  }

  export type ULinkUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ULinkCreateWithoutAuthorInput, ULinkUncheckedCreateWithoutAuthorInput> | ULinkCreateWithoutAuthorInput[] | ULinkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ULinkCreateOrConnectWithoutAuthorInput | ULinkCreateOrConnectWithoutAuthorInput[]
    createMany?: ULinkCreateManyAuthorInputEnvelope
    connect?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
  }

  export type EnumustatusFieldUpdateOperationsInput = {
    set?: $Enums.ustatus
  }

  export type EnumuverifyFieldUpdateOperationsInput = {
    set?: $Enums.uverify
  }

  export type AddressNullableUpdateEnvelopeInput = {
    set?: AddressCreateInput | null
    upsert?: AddressUpsertInput
    unset?: boolean
  }

  export type ULinkUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ULinkCreateWithoutAuthorInput, ULinkUncheckedCreateWithoutAuthorInput> | ULinkCreateWithoutAuthorInput[] | ULinkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ULinkCreateOrConnectWithoutAuthorInput | ULinkCreateOrConnectWithoutAuthorInput[]
    upsert?: ULinkUpsertWithWhereUniqueWithoutAuthorInput | ULinkUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ULinkCreateManyAuthorInputEnvelope
    set?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    disconnect?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    delete?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    connect?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    update?: ULinkUpdateWithWhereUniqueWithoutAuthorInput | ULinkUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ULinkUpdateManyWithWhereWithoutAuthorInput | ULinkUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ULinkScalarWhereInput | ULinkScalarWhereInput[]
  }

  export type ULinkUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ULinkCreateWithoutAuthorInput, ULinkUncheckedCreateWithoutAuthorInput> | ULinkCreateWithoutAuthorInput[] | ULinkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ULinkCreateOrConnectWithoutAuthorInput | ULinkCreateOrConnectWithoutAuthorInput[]
    upsert?: ULinkUpsertWithWhereUniqueWithoutAuthorInput | ULinkUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ULinkCreateManyAuthorInputEnvelope
    set?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    disconnect?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    delete?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    connect?: ULinkWhereUniqueInput | ULinkWhereUniqueInput[]
    update?: ULinkUpdateWithWhereUniqueWithoutAuthorInput | ULinkUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ULinkUpdateManyWithWhereWithoutAuthorInput | ULinkUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ULinkScalarWhereInput | ULinkScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumustatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ustatus | EnumustatusFieldRefInput<$PrismaModel>
    in?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    not?: NestedEnumustatusFilter<$PrismaModel> | $Enums.ustatus
  }

  export type NestedEnumuverifyFilter<$PrismaModel = never> = {
    equals?: $Enums.uverify | EnumuverifyFieldRefInput<$PrismaModel>
    in?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    notIn?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    not?: NestedEnumuverifyFilter<$PrismaModel> | $Enums.uverify
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    street?: StringFilter<"Address"> | string
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    zip?: StringFilter<"Address"> | string
  }

  export type NestedEnumustatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ustatus | EnumustatusFieldRefInput<$PrismaModel>
    in?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ustatus[] | ListEnumustatusFieldRefInput<$PrismaModel>
    not?: NestedEnumustatusWithAggregatesFilter<$PrismaModel> | $Enums.ustatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumustatusFilter<$PrismaModel>
    _max?: NestedEnumustatusFilter<$PrismaModel>
  }

  export type NestedEnumuverifyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.uverify | EnumuverifyFieldRefInput<$PrismaModel>
    in?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    notIn?: $Enums.uverify[] | ListEnumuverifyFieldRefInput<$PrismaModel>
    not?: NestedEnumuverifyWithAggregatesFilter<$PrismaModel> | $Enums.uverify
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuverifyFilter<$PrismaModel>
    _max?: NestedEnumuverifyFilter<$PrismaModel>
  }

  export type UserCreateWithoutLinksInput = {
    id?: string
    email: string
    name: string
    password: string
    status?: $Enums.ustatus
    verify?: $Enums.uverify
    xcode?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserUncheckedCreateWithoutLinksInput = {
    id?: string
    email: string
    name: string
    password: string
    status?: $Enums.ustatus
    verify?: $Enums.uverify
    xcode?: string | null
    address?: XOR<AddressNullableCreateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserCreateOrConnectWithoutLinksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
  }

  export type UserUpsertWithoutLinksInput = {
    update: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLinksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
  }

  export type UserUpdateWithoutLinksInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumustatusFieldUpdateOperationsInput | $Enums.ustatus
    verify?: EnumuverifyFieldUpdateOperationsInput | $Enums.uverify
    xcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
  }

  export type UserUncheckedUpdateWithoutLinksInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumustatusFieldUpdateOperationsInput | $Enums.ustatus
    verify?: EnumuverifyFieldUpdateOperationsInput | $Enums.uverify
    xcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: XOR<AddressNullableUpdateEnvelopeInput, AddressCreateInput> | null
  }

  export type ULinkCreateWithoutAuthorInput = {
    id?: string
    link: string
    content: string
  }

  export type ULinkUncheckedCreateWithoutAuthorInput = {
    id?: string
    link: string
    content: string
  }

  export type ULinkCreateOrConnectWithoutAuthorInput = {
    where: ULinkWhereUniqueInput
    create: XOR<ULinkCreateWithoutAuthorInput, ULinkUncheckedCreateWithoutAuthorInput>
  }

  export type ULinkCreateManyAuthorInputEnvelope = {
    data: ULinkCreateManyAuthorInput | ULinkCreateManyAuthorInput[]
  }

  export type AddressUpsertInput = {
    set: AddressCreateInput | null
    update: AddressUpdateInput
  }

  export type ULinkUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ULinkWhereUniqueInput
    update: XOR<ULinkUpdateWithoutAuthorInput, ULinkUncheckedUpdateWithoutAuthorInput>
    create: XOR<ULinkCreateWithoutAuthorInput, ULinkUncheckedCreateWithoutAuthorInput>
  }

  export type ULinkUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ULinkWhereUniqueInput
    data: XOR<ULinkUpdateWithoutAuthorInput, ULinkUncheckedUpdateWithoutAuthorInput>
  }

  export type ULinkUpdateManyWithWhereWithoutAuthorInput = {
    where: ULinkScalarWhereInput
    data: XOR<ULinkUpdateManyMutationInput, ULinkUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ULinkScalarWhereInput = {
    AND?: ULinkScalarWhereInput | ULinkScalarWhereInput[]
    OR?: ULinkScalarWhereInput[]
    NOT?: ULinkScalarWhereInput | ULinkScalarWhereInput[]
    id?: StringFilter<"ULink"> | string
    link?: StringFilter<"ULink"> | string
    content?: StringFilter<"ULink"> | string
    authorId?: StringFilter<"ULink"> | string
  }

  export type ULinkCreateManyAuthorInput = {
    id?: string
    link: string
    content: string
  }

  export type AddressUpdateInput = {
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type ULinkUpdateWithoutAuthorInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ULinkUncheckedUpdateWithoutAuthorInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ULinkUncheckedUpdateManyWithoutAuthorInput = {
    link?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AddressDefaultArgs instead
     */
    export type AddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AddressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ULinkDefaultArgs instead
     */
    export type ULinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ULinkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LmTmLnkDefaultArgs instead
     */
    export type LmTmLnkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LmTmLnkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}