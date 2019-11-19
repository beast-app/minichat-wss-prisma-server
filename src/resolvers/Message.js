function postedBy(parent, args, context) {
  return context.prisma.message({
    id: parent.id,
  }).postedBy();
}

module.exports = {
  postedBy,
}
