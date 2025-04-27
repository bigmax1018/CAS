// src/domains/users/index.ts

import { UserController as _UserController } from './user.controller';
import { UserRepository as _userRepository } from './user.repository';

export default {
  UserController: _UserController,
  userRepository: _userRepository
};
