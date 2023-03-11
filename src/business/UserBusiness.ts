// import { UserDatabase } from "../data/UserDatabase";
// import { User, UserInputDTO, UserOutputDTO } from "../models/User";
// import { InvalidParameterError } from "../error/InvalidParameterError";
// import { HashManager } from "../services/HashManager";
// import { UserDatabase } from "../database/UserDatabase";
//==============================
// import { User } from "../models/User";
// import { TokenPayload, ROLE_USER } from "../types";
// import { SignUpDTO, LoginDTO, GetAllUsersInputDTO } from "../dtos/UserDTO";
// import { HashManager } from "../services/HashManager";
// import { BadRequestError } from "../errors/BadRequestError";
// import { NotFoundError } from "../errors/NotFoundError";
// import { IdGenerator } from "../services/IdGenerator";
// import { TokenManager } from "../services/TokenManager";

// export class UserBusiness {
//   constructor(
//     private userDatabase: UserDatabase,
//     private hashManager: HashManager
//   ) {}

//   async createUser(user: UserInputDTO): Promise<UserOutputDTO> {
//     if (!user.name || !user.email || !user.password) {
//       throw new InvalidParameterError("Missing input");
//     }

//     const hashPassword = await this.hashManager.hash(user.password);

//     const newUser = new User(user.name, user.email, hashPassword);

//     const createdUser = await this.userDatabase.createUser(newUser);

//     return createdUser.toOutputDTO();
//   }

//   async getUserById(id: string): Promise<UserOutputDTO> {
//     const user = await this.userDatabase.getUserById(id);

//     if (!user) {
//       throw new InvalidParameterError("User not found");
//     }

//     return user.toOutputDTO();
//   }
// }