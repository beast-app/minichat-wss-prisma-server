function user(parent, args, context) {
  return context.prisma.user({
    id: parent.id,
  }).user();
}

module.exports = {
  user,
}
