interface Arbre {
  nom: string
  nomPNJ: string
  depart: @Noeud
  drapeaux: Drapeau[]
  noeuds: Noeud[]
}

interface Noeud {
  nom: string
  replique?: Replique
  actionsDrapeau: ActionDrapeau[]
  choix: Choix[]
  suivant?: @Noeud
}

interface Replique {
  texte: string
}

interface Choix {
  texte: string
  cible: @Noeud
  conditions: Condition[]
}

interface Drapeau {
  nom: string
}

interface ActionDrapeau {
  drapeau: @Drapeau
  etat: boolean
}

interface Condition {
  drapeau: @Drapeau
  etat: boolean
}