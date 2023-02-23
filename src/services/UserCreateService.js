const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository){
    this.userRepository = userRepository;
    // paramêtro userRepository está disponivel para a classe de forma global 
  }

  async execute({ name, email, password, isAdm }) {
  
      const checkUserExists = await this.userRepository.findByEmail(email);

      if (checkUserExists.length === 0) {
         const hashedPassword = await hash(password, 8);
         await this.userRepository.create({ name, email, password: hashedPassword, isAdm });

      } else {
         throw new AppError('Este e-mail já está cadastrado!')
      }
  }
}

module.exports = UserCreateService;