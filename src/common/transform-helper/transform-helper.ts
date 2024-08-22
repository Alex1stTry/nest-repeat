export class TransformHelper {
  public static trim({ value }: { value: string }) {
    return value ? value.trim() : value;
  }

  public static toLowerCase({ value }: { value: string }) {
    return value ? value.toLowerCase() : value;
  }
}
