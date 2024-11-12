import { Weapon } from '@/components/typescript/classes/weapon'

export const weapons = [
  {
    name: 'Pistol',
    imagePath:
      'https://patrickgalbraith.github.io/zombicide-card-database/img/cards/equipment/1/pistol.jpg',
    dices: 1,
    isMeele: false,
    hit: 4,
  } as Weapon,
  {
    name: 'Nailbat',
    imagePath:
      'https://patrickgalbraith.github.io/zombicide-card-database/img/cards/equipment/2/nailbat.jpg',
    dices: 2,
    isMeele: true,
    hit: 3,
  } as Weapon,
  {
    name: 'Betty',
    imagePath:
      'https://patrickgalbraith.github.io/zombicide-card-database/img/cards/equipment/3/betty.jpg',
    dices: 7,
    hit: 4,
  } as Weapon,
]
