const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function createMessage(parent, args, context) {
  const userId = getUserId(context);
  const { username } = context.prisma.user({ id: userId });
  // TODO: Add conversation/chatroom
  return context.prisma.createMessage({
    body: args.body,
    username,
    postedBy: {
      connect: {
        id: userId,
      }
    }
  });
}

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

module.exports = {
  createMessage,
  login,
  signup,
}
