export class Season {
  id: string //Kürzel
  name: string //Name der Season
  short: string //Kürzel das für Platzbedarf angezeigt wird

  constructor(id: string, name: string, short: string) {
    this.id = id
    this.name = name
    this.short = short
  }
}
