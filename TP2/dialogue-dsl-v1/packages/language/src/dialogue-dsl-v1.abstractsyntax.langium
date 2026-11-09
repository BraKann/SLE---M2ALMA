interface ArbreDialogue {
  nom: string
  nomPNJ: string
  depart: @Noeud
  noeuds: Noeud[]
}

interface Noeud {
  nom: string
  replique?: Replique
  choix: Choix[]
  suivant?: @Noeud
}

interface Replique {
  texte: string
}

interface Choix {
  texte: string
  cible: @Noeud
}