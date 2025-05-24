import prisma from "@/lib/prisma";

export function getAll(search: string) {
  return prisma.player.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: { name: "asc" },
  });
}

export function create(name: string) {
  return prisma.player.create({ data: { name } });
}

export function update(id: string, name: string) {
  return prisma.player.update({ where: { id }, data: { name } });
}

export function remove(id: string) {
  return prisma.player.delete({ where: { id } });
}
