export class Result<T> {
  private _value?: T; // 실질적으로 사용될 Value (Domain)

  public isSuccess: boolean; // 생성 성공
  public isFailure: boolean; // 생성 실패
  public error?: T | string; // 어떤 에러인지?

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('성공한 결과값에 에러가 포함돼있습니다.');
    }

    if (!isSuccess && !error) {
      throw new Error('실패한 결과에는 에러가 포함돼야합니다.');
    }

    // 에러가 없다면 동결상태로 객체를 생성한다.
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error(
        '에러가난 결과값은 반환이 불가능합니다. "errorValue"를 사용해주세요.',
      );
    }

    return this._value!;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
