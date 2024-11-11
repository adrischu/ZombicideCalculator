export class Weapon {
  name: string //Name der Waffe
  imagePath: string //Pfad des Kartenbildes
  //range: number[] //Angriffsreichtweite
  dices: number //Anzahl der Würfel beim Angriff
  hit: number //Mindestwürfelzahl für einen Treffer
  //dmg: number //Schaden bei Treffer
  isMeele: boolean //True bei Meele; false bei Range
  //canOpenDoors: boolean //Kann diese Waffe Türen öffnen?
  //isSilentOpeningDoors: boolean //Öffnet Türen ohne Lärm zu machen?
  //isSilentAttacking: boolean //Greift an ohne Lärm zu machen?

  constructor(
    name: string,
    imagePath: string,
    //range: number[],
    dices: number,
    hit: number,
    //dmg: number,
    isMeele: boolean,
    //canOpenDoors: boolean,
    //isSilentOpeningDoors: boolean,
    //isSilentAttacking: boolean,
  ) {
    this.name = name
    this.imagePath = imagePath
    //this.range = range
    this.dices = dices
    this.hit = hit
    //this.dmg = dmg
    this.isMeele = isMeele
    //this.canOpenDoors = canOpenDoors
    //this.isSilentOpeningDoors = isSilentOpeningDoors
    //this.isSilentAttacking = isSilentAttacking
  }
}
