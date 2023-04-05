/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line vue/prefer-import-from-vue
import type { IfAny } from '@vue/shared';
import type { Prop } from 'vue';

type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>

type InnerRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } | { default: any }
    ? T[K] extends { default: undefined }
      ? never
      : K
    : never
}[keyof T]

type InnerOptionalKeys<T> = Exclude<keyof T, InnerRequiredKeys<T>>

type InferPropType<T> = [T] extends [null]
  ? any
  : [T] extends [{ type: null | true }]
  ? any
  : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
  ? Record<string, any>
  : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
  ? boolean
  : [T] extends [DateConstructor | { type: DateConstructor }]
  ? Date
  : [T] extends [(infer U)[] | { type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U>
    : InferPropType<U>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V
  : T

export type ExtractPublicPropTypes<O> = {
  -readonly [K in keyof Pick<O, PublicRequiredKeys<O>>]: InferPropType<O[K]>
} & {
  -readonly [K in keyof Pick<O, PublicOptionalKeys<O>>]?: InferPropType<O[K]>
}

export type ExtractInnerPropTypes<O> = {
  [K in keyof Pick<O, InnerRequiredKeys<O>>]: InferPropType<O[K]>
} & {
  [K in keyof Pick<O, InnerOptionalKeys<O>>]?: InferPropType<O[K]>
}
