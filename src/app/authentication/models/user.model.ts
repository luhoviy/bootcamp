interface UserModel {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  id?: number;
  photoUrl?: string;
}

export class User implements UserModel {
  constructor(
    public firstName: string,
    public email: string,
    public lastName?: string,
    public id: number = null,
    public photoUrl?: string,
    public displayName?: string
  ) {
    this.displayName = displayName || firstName + (!!lastName ? ` ${lastName}` : "");
  }

  public static getMockedUser() {
    return new User("John", "john.doe@mail.com", "Doe", 666);
  }
}
