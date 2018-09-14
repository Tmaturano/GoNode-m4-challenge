'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async createAccount ({ request, response }) {
    const password = request.input('password')
    const passwordConfirmation = request.input('passwordConfirmation')

    if (password !== passwordConfirmation) {
      return response
        .status(400)
        .send({ error: { message: 'The password and passwordConfirmation must be equals' } })
    }

    const data = request.only(['username', 'email', 'password'])

    const transaction = await Database.beginTransaction()

    const user = await User.create(data, transaction)

    await transaction.commit()

    return user
  }
}

module.exports = UserController
