import * as z from './base';
import { ZodUndefined } from './undefined';
import { ZodNull } from './null';
import { ZodUnion } from './union';

export interface ZodPromiseDef<T extends z.ZodTypeAny = z.ZodTypeAny> extends z.ZodTypeDef {
  t: z.ZodTypes.promise;
  type: T;
}

export class ZodPromise<T extends z.ZodTypeAny> extends z.ZodType<Promise<T['_type']>, ZodPromiseDef<T>> {
  toJSON = () => {
    return {
      t: this._def.t,
      type: this._def.type.toJSON(),
    };
  };

  optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);

  nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);

  static create = <T extends z.ZodTypeAny>(schema: T): ZodPromise<T> => {
    return new ZodPromise({
      t: z.ZodTypes.promise,
      type: schema,
    });
  };
}
