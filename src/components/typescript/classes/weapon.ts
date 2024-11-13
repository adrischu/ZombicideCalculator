import { bernoulliMindestens } from '../stochastics'

export class Weapon {
  name: string //Name der Waffe
  imagePath: string //Pfad des Kartenbildes
  range: number[] //Angriffsreichtweite
  dices: number //Anzahl der Würfel beim Angriff
  hit: number //Mindestwürfelzahl für einen Treffer
  dmg: number //Schaden bei Treffer
  isMeele: boolean //True bei Meele; false bei Range
  canOpenDoors: boolean //Kann diese Waffe Türen öffnen?
  isSilentOpeningDoors: boolean //Öffnet Türen ohne Lärm zu machen?
  isSilentAttacking: boolean //Greift an ohne Lärm zu machen?
  useDualWielding: boolean //Zeigt an ob die Waffe aktuell mit Dual Wielding benutzt wird
  reload: boolean

  constructor(
    name: string,
    range: number[],
    dices: number,
    hit: number,
    dmg: number,
    isMeele: boolean,
    canOpenDoors: boolean,
    isSilentOpeningDoors: boolean,
    isSilentAttacking: boolean,
    reload: boolean,
    imagePath: string,
  ) {
    this.name = name
    this.imagePath = imagePath
    this.range = range
    this.dices = dices
    this.hit = hit
    this.dmg = dmg
    this.isMeele = isMeele
    this.canOpenDoors = canOpenDoors
    this.isSilentOpeningDoors = isSilentOpeningDoors
    this.isSilentAttacking = isSilentAttacking
    this.useDualWielding = false
    this.reload = reload
  }

  p(extra: {
    diceAll: number
    diceMeele: number
    diceRange: number
    resultAll: number
    resultMeele: number
    resultRange: number
  }) {
    let p = (6 + 1 - this.hit + extra.resultAll) / 6
    if (this.isMeele) p += extra.resultMeele / 6 //Falls Waffe Meele ist extra Meele-Würfel dazuzählen
    if (!this.isMeele) p += extra.resultRange / 6 //Falls Waffe Ranged ist extra Ranged-Würfel dazu zählen
    return p
  }

  calcDices(extra: {
    diceAll: number
    diceMeele: number
    diceRange: number
    resultAll: number
    resultMeele: number
    resultRange: number
  }) {
    let dices = this.dices + extra.diceAll //Würfel von Waffe + Extra Würfel(Alle) dazu
    if (this.isMeele) dices += extra.diceMeele //Falls Waffe Meele ist extra Meele-Würfel dazuzählen
    if (!this.isMeele) dices += extra.diceRange //Falls Waffe Ranged ist extra Ranged-Würfel dazu zählen
    dices = this.useDualWielding ? dices * 2 : dices //Wenn Waffe doppelhändig geführt wird Würfel verdoppeln
    return dices
  }

  propability(
    actions: number,
    toKill: number,
    extra: {
      diceAll: number
      diceMeele: number
      diceRange: number
      resultAll: number
      resultMeele: number
      resultRange: number
    },
  ): number {
    return bernoulliMindestens(this.p(extra), actions * this.calcDices(extra), toKill)
  }

  expected(
    actions: number,
    extra: {
      diceAll: number
      diceMeele: number
      diceRange: number
      resultAll: number
      resultMeele: number
      resultRange: number
    },
  ) {
    return this.p(extra) * actions * this.calcDices(extra)
  }
}
