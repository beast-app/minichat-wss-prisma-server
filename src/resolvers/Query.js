const { APP_SECRET, getUserId } = require('../utils');

async function messages(parent, args, context) {
  // Authentication permissions
  getUserId(context);
  // TODO: Filter by conversation/chatroom
  const messages = await context.prisma.messages({
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });
  return messages;
}

module.exports = {
  messages,
}
