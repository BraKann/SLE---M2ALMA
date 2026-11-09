import { AstUtils } from "langium"
import { Arbre, Noeud, Choix, Drapeau, ActionDrapeau, Condition } from "./generated/ast.js"

function creerDrapeau(nom: string): Drapeau {
  return { $type: "Drapeau", $container: undefined!, nom }
}

function creerAction(drapeau: Drapeau, etat: boolean): ActionDrapeau {
  return {
    $type: "ActionDrapeau",
    $container: undefined!,
    drapeau: { $refText: undefined!, ref: drapeau },
    etat
  }
}

function creerCondition(drapeau: Drapeau, etat: boolean): Condition {
  return {
    $type: "Condition",
    $container: undefined!,
    drapeau: { $refText: undefined!, ref: drapeau },
    etat
  }
}

function creerNoeud(nom: string, texte: string, actions: ActionDrapeau[] = []): Noeud {
  return {
    $type: "Noeud",
    $container: undefined!,
    nom,
    replique: { $type: "Replique", $container: undefined!, texte },
    actionsDrapeau: actions,
    choix: []
  }
}

function creerChoix(texte: string, cible: Noeud, conditions: Condition[] = []): Choix {
  return {
    $type: "Choix",
    $container: undefined!,
    texte,
    cible: { $refText: undefined!, ref: cible },
    conditions
  }
}

// Drapeaux
const askedTime = creerDrapeau("asked_time")
const askedScene = creerDrapeau("asked_scene")
const infoLunch = creerDrapeau("info_lunch")
const infoNight = creerDrapeau("info_night")

// Noeuds
const accueil = creerNoeud("accueil", "Good day, what would you like to know?")
const heure = creerNoeud("heure", "Around 11:30, just when I was leaving for lunch.",
  [creerAction(askedTime, true), creerAction(infoLunch, true)])
const scene = creerNoeud("scene", "I remember some strange noises, but I did not see anyone because it was night.",
  [creerAction(askedScene, true), creerAction(infoNight, true)])
const porte = creerNoeud("porte", "Yes it was, but only slightly.")
const bruit = creerNoeud("bruit", "I think it was someone running, but the shoes were squeaking")
const plus = creerNoeud("plus", "Can I help you with anything else?")
const contradiction = creerNoeud("contradiction",
  "Uh, no… I mean, I probably mixed things up, and… oh it's late already, apologies inspector but I have to go, goodbye!")
const fin = creerNoeud("fin", "Of course. Let me know if I can help you with anything.")

// Menu de questions
function menu(): Choix[] {
  return [
    creerChoix("What time did you find the body?", heure, [creerCondition(askedTime, false)]),
    creerChoix("Did you see anyone leaving the crime scene?", scene, [creerCondition(askedScene, false)]),
    creerChoix("Was the door already open?", porte, [creerCondition(infoLunch, true)]),
    creerChoix("What kind of noise?", bruit, [creerCondition(infoNight, true)]),
    creerChoix("Wait, you were there at lunch AND that it was night time?", contradiction,
      [creerCondition(infoNight, true), creerCondition(infoLunch, true)]),
    creerChoix("That's all for now, thank you", fin)
  ]
}

accueil.choix.push(...menu())
plus.choix.push(...menu())

// Noeuds sans choix : pointeur suivant
heure.suivant = { $refText: undefined!, ref: plus }
scene.suivant = { $refText: undefined!, ref: plus }
porte.suivant = { $refText: undefined!, ref: plus }
bruit.suivant = { $refText: undefined!, ref: plus }

const racine: Arbre = {
  $type: "Arbre",
  nom: "temoin",
  nomPNJ: "Witness",
  depart: { $refText: undefined!, ref: accueil },
  drapeaux: [askedTime, askedScene, infoLunch, infoNight],
  noeuds: [accueil, heure, scene, porte, bruit, plus, contradiction, fin]
}

AstUtils.linkContentToContainer(racine, { deep: true })

console.log("AST V2 construit") // breakpoint 