import prisma from "@/lib/prisma";

export function getAll(search: string) {
  const numeric = parseInt(search);
  const or: any[] = [];

  if (search) {
    or.push({
      name: {
        contains: search,
        mode: "insensitive",
      },
    });

    if (!isNaN(numeric)) {
      or.push({ number: numeric });
    }
  }

  return prisma.player.findMany({
    where: {
      OR: or.length > 0 ? or : undefined,
    },
    orderBy: { name: "asc" },
  });
}

export const create = (data: { name: string; number: number }) => {
  return prisma.player.create({ data });
};

export const update = (id: string, data: { name: string; number: number }) => {
  return prisma.player.update({
    where: { id },
    data,
  });
};

export function remove(id: string) {
  return prisma.player.delete({ where: { id } });
}
