import { useSettingsStore } from '@/stores/settingsStore'
import { bernoulliMindestens } from '../../typescript/stochastics'
import type { Season } from './season'
import { allSeasons } from '@/stores/seasonStore'

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
  reload: boolean //Muuss diese Waffe neu laden
  supressReload: boolean //Manuelles Unterdrücken der Nachladen-Funktion
  seasons: Season[]
  killAll: boolean //Waffen die alles im Feld töten (zB Molotov)
  ultraRed: boolean //FÜr Ultrared Waffen
  disclaimer: string

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
    seasonStrings: string[],
    killAll: boolean,
    ultraRed: boolean,
    disclaimer: string,
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
    this.supressReload = false
    this.killAll = killAll
    this.ultraRed = ultraRed
    this.disclaimer = disclaimer

    this.seasons = []
    seasonStrings.forEach((seasonString) => {
      allSeasons.forEach((season) => {
        if (season.id === seasonString) this.seasons.push(season)
      })
    })
  }

  p() {
    const settings = useSettingsStore()
    let p = (6 + 1 - this.hit + settings.extraResultAll) / 6
    if (this.isMeele) p += settings.extraResultMeele / 6 //Falls Waffe Meele ist extra Meele-Würfel dazuzählen
    if (!this.isMeele) p += settings.extraResultRange / 6 //Falls Waffe Ranged ist extra Ranged-Würfel dazu zählen
    return p
  }

  calcDices() {
    const settings = useSettingsStore()
    let dices = this.dices + settings.extraDiceAll //Würfel von Waffe + Extra Würfel(Alle) dazu
    if (this.isMeele) dices += settings.extraDiceMeele //Falls Waffe Meele ist extra Meele-Würfel dazuzählen
    if (!this.isMeele) dices += settings.extraDiceRange //Falls Waffe Ranged ist extra Ranged-Würfel dazu zählen
    dices = this.useDualWielding ? dices * 2 : dices //Wenn Waffe doppelhändig geführt wird Würfel verdoppeln
    return dices
  }

  calcActions(baseActions: number) {
    //Berechnet die Anzahl an tatsächlich verfügbaren Aktionen

    if (this.reload && !this.supressReload) {
      //Fall mit Nachladen
      return Math.ceil(baseActions / 2)
    } else {
      //Fall ohne Nachladen
      return baseActions
    }
  }

  propability(baseActions: number, toKill: number): number {
    const actions = this.calcActions(baseActions)
    if (this.killAll) return 1 //Für Waffen die alles töten ist Wahrscheinlichkeit 100%

    return bernoulliMindestens(this.p(), actions * this.calcDices(), toKill)
  }

  expected(baseActions: number) {
    const actions = this.calcActions(baseActions)
    if (this.killAll) return Infinity //Für Waffen die alles töten ist Wahrscheinlichkeit 100%

    return this.p() * actions * this.calcDices()
  }

  isIncludedInSeasons(seasonsToSearch: Season[]): boolean {
    let isIncluded: boolean = false
    seasonsToSearch.forEach((season) => {
      this.seasons.forEach((thisSeason) => {
        if (season.id === thisSeason.id) isIncluded = true
      })
    })
    return isIncluded
  }
}
