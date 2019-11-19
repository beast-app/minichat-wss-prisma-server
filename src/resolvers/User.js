function profilePicture(parent, args, context) {
  return context.prisma.profilePicture({
    id: parent.id,
  }).profilePicture();
}

module.exports = {
  profilePicture,
}
