import { UserInterface } from "src/interfaces/Interfaces";

export class CreateUserDto implements UserInterface {
  readonly name: string
  readonly email: string;
  readonly password: string;
  readonly role: string;
}
