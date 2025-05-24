export function isValidTeamName(name: string): boolean {
  return /^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,}/.test(name);
}

export function isValidPlayerName(name: string): boolean {
  return /^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,}/.test(name);
}
