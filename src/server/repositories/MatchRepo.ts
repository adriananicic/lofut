import prisma from "@/lib/prisma";

export function getAll() {
  return prisma.match.findMany({ orderBy: { date: "desc" } });
}

export function create(data: any) {
  return prisma.match.create({
    data: {
      teamA: data.teamA,
      teamB: data.teamB,
      location: data.location,
      date: new Date(data.date),
    },
  });
}

export function getOne(id: string) {
  return prisma.match.findUnique({
    where: { id },
    include: {
      events: {
        include: { player: true },
        orderBy: { minute: "asc" },
      },
    },
  });
}

export function update(id: string, data: any) {
  return prisma.match.update({
    where: { id },
    data: {
      teamA: data.teamA,
      teamB: data.teamB,
      date: new Date(data.date),
      location: data.location,
    },
  });
}
