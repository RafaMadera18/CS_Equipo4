export class GuestCreateRequest {
  private readonly _fullName: string;
  private readonly _phoneNumber: string;
  private readonly _dateOfBirth: string;

  public constructor(fullName: string, phoneNumber: string, dateOfBirth: Date) {
    this._fullName = fullName;
    this._phoneNumber = phoneNumber;
    // TODO: Extract method. standardize date format
    this._dateOfBirth = new Date(dateOfBirth).toISOString().split("T")[0];
  }

  public toJSON() {
    return {
      fullName: this._fullName,
      phoneNumber: this._phoneNumber,
      dateOfBirth: this._dateOfBirth,
    };
  }

  public get fullName(): string {
    return this._fullName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get dateOfBirth(): string {
    return this._dateOfBirth;
  }
}
