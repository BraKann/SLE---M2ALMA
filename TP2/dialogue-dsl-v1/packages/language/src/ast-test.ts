import { AstUtils } from "langium"
import { ArbreDialogue, Noeud, Choix } from "./generated/ast.js"

function creerNoeud(nom: string, texte: string): Noeud {
  return {
    $type: "Noeud",
    $container: undefined!,
    nom,
    replique: { $type: "Replique", $container: undefined!, texte },
    choix: []
  }
}

function creerChoix(texte: string, cible: Noeud): Choix {
  return {
    $type: "Choix",
    $container: undefined!,
    texte,
    cible: { $refText: undefined!, ref: cible }
  }
}

const line1 = creerNoeud("line1", "You don't look like you're from around here")
const line2 = creerNoeud("line2", "Oh really? Then you must know Mr. Bowler.")
const line3 = creerNoeud("line3", "Newton, eh? I heard there's trouble brewing down there.")
const line4 = creerNoeud("line4", "You liar! There ain't no Mr. Bowler, I made him up!")
const line5 = creerNoeud("line5", "Don't you worry about it. Say, do you have something to eat? I'm starving.")

line1.choix.push(
  creerChoix("I've lived here all my life!", line2),
  creerChoix("I came here from Newton.", line3)
)
line2.choix.push(
  creerChoix("Mr. Bowler is a good friend of mine!", line4),
  creerChoix("Who?", line5)
)
line3.choix.push(
  creerChoix("I haven't heard about any trouble.", line5),
  creerChoix("Did I say Newton? I'm actually from Springville.", line2)
)

const racine: ArbreDialogue = {
  $type: "ArbreDialogue",
  nom: "bowler",
  nomPNJ: "PNJ",
  depart: { $refText: undefined!, ref: line1 },
  noeuds: [line1, line2, line3, line4, line5]
}

AstUtils.linkContentToContainer(racine, { deep: true })

console.log("AST construit") // breakpoint 