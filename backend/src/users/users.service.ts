import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/users.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  asy;

  constructor(
    @Inject("USERS_REPOSITORY")
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user.
   *
   * @param createUserDto Data for creating a new user.
   * @returns Promise<User> The created user.
   * @throws Error if there's an error during the creation process.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }
  }

  /**
   * Find a user by username.
   *
   * @param username Username to search for.
   * @returns Promise<User | undefined> The found user or undefined if not found.
   * @throws Error if there's an error during the search process.
   */
  async findOne(username: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });

      if (user) {
        return user;
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }

  /**
   * Find a user by email.
   *
   * @param email Email to search for.
   * @returns Promise<User | undefined> The found user or undefined if not found.
   * @throws Error if there's an error during the search process.
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (user) {
        return user;
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }

  /**
   * Find a user by ID.
   *
   * @param id ID of the user to search for.
   * @returns Promise<Partial<User> | undefined> The found user or undefined if not found.
   * @throws Error if there's an error during the search process.
   */
  async findById(id: string): Promise<Partial<User> | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (user) {
        return user;
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }

  /**
   * Update user information only auth.
   *
   * @param id ID of the user to update.
   * @param userDto Data for updating the user.
   * @returns Promise<User> The updated user.
   * @throws NotFoundException if the user with the given ID is not found.
   * @throws Error if there's an error during the update process.
   */
  async update(id: string, userDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({
        id,
        ...userDto,
      });

      if (!user) {
        throw new NotFoundException(`There is no user under id ${id}`);
      }

      return this.userRepository.save(user);
    } catch (err) {
      throw new Error(`Error update ${err} user ${err.message}`);
    }
  }

  /**
   * Update user profile for controller.
   *
   * @param id ID of the user to update.
   * @param userDto Data for updating the user.
   * @returns Promise<User> The updated user.
   * @throws NotFoundException if the user with the given ID is not found.
   * @throws Error if there's an error during the update process.
   */
  async updateProfile(id: string, userDto: UpdateUserDto) {
    userDto["password"] = await argon2.hash(userDto["password"]);
    return await this.update(id, userDto);
  }
}
