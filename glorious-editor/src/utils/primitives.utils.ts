export const DEFAULT_BOOLEAN = false;
export const DEFAULT_NUMBER = 0;
export const DEFAULT_OBJECT: any = {};
export const DEFAULT_STRING = '';

export function getObject(value: any, defaultValue: object = DEFAULT_OBJECT): object {
  return getValueOrDefault(value, defaultValue);
}

export function getBoolean(value: any, defaultValue: boolean = DEFAULT_BOOLEAN): boolean {
  let bool = value != null ? !!value : defaultValue;
  if (value == 'false') {
    bool = false;
  }

  return bool;
}

export function getNumber(value: any, defaultValue: number = DEFAULT_NUMBER): number {
  let num = value != null ? Number(value).valueOf() : defaultValue;
  if (Number.isNaN(num)) {
    num = defaultValue;
  }

  return num;
}

export function getString(value: any, defaultValue: string = DEFAULT_STRING): string {
  let str = value != null ? value.toString() : defaultValue;
  if(str != null && str.indexOf('[object Object') > -1) {
    str = defaultValue;
  }
  return str;
}

export function getValueOrDefault(value: any, defaultValue: any): any {
  return value != null ? value : getOrBuildDefaultValue(defaultValue);
}

export function getOrBuildDefaultValue<T>(defaultValue?: T | (() => T)): T {
  return typeof defaultValue === 'function' ? (<any>defaultValue)() : <any>defaultValue;
}

export function getValueOrNull(value: any): any {
  return getValueOrDefault(value, null);
}

export function isNullOrEmpty(value: any): boolean {
  return value == null || (value.length != null && value.length == 0);
}

export function getArray(o: any): any[] {
  const objs = o != null ? o : [];
  let array = [];

  if (Array.isArray(objs)) {
    array = objs;
  } else {
    array = [objs];
  }

  return array;
}

export function getArrayOfModels(Class: any, o: any): any[] {
  const objs = getArray(0);
  const array: any[] = [];

  objs.forEach((obj) => {
    if (hasPropertyOf(Class, obj)) {
      array.push(new Class(obj));
    }
  });

  return array;
}

export function getArrayOfStrings(o: any): string[] {
  const objs = getArray(o);
  const array: string[] = [];

  objs.forEach((obj) => {
    const val = getString(obj);
    if (val !== '') {
      array.push(val);
    }
  });

  return array;
}

export function hasPropertyOf<T>(Class: new (arg?: Partial<T>) => T, obj: any): boolean {
  if (Class == null || obj == null) {
    return false;
  }

  const model = new Class();
  const modelKeys = Object.keys(model);

  for (const key of modelKeys) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
}
