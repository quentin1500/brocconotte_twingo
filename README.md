# Projet participatif - Voiture

Ce projet permet de visualiser l’avancement d’un projet participatif sous forme d’une **voiture interactive**.
Chaque pièce de la voiture peut être financée par un ou plusieurs participants. Une page HTML est générée automatiquement à partir d’un fichier CSV décrivant l’état des pièces.

L’affichage se fait sous la forme :

* d’une **image de fond** (voiture.png) représentant la voiture,
* de **boîtes interactives** positionnées autour de l’image, reliées aux pièces correspondantes,
* de codes couleurs indiquant l’état des pièces :

  * **Rouge** : disponible (non achetée)
  * **Orange** : partiellement achetée
  * **Vert** : totalement achetée

Un clic sur une boîte affiche les informations détaillées (progression et noms des acheteurs).

---

## Arborescence du projet

```
/projet
   /data
      donnees.csv          # fichier de données
   /output
      page.html            # fichier HTML généré automatiquement
   /static
      style.css            # styles (couleurs, positions, effets)
      script.js            # interactions (clics, survols)
      template.html        # squelette HTML
   voiture.png             # image de la voiture
   build.ps1               # script de génération
```

---

## Pré-requis

* Windows avec **PowerShell** (aucune installation supplémentaire nécessaire).
* Un éditeur de texte ou Excel pour éditer `donnees.csv`.
* Un navigateur pour ouvrir `output/page.html`.

---

## Structure du fichier `donnees.csv`

Le fichier contient une ligne par pièce avec la structure suivante :

```
Piece;NombreTotal;NombreAchete;Acheteurs;Position
```

* **Piece** : nom de la pièce (ex: `Pneu`)
* **NombreTotal** : nombre total d’éléments pour cette pièce (ex: `4` pour les pneus)
* **NombreAchete** : nombre déjà achetés (ex: `2`)
* **Acheteurs** : liste séparée par des virgules des acheteurs (ex: `Alice,Bob`)
* **Position** : emplacement de la boîte (`haut`, `bas`, `gauche`, `droite`)

### Exemple

```
Piece;NombreTotal;NombreAchete;Acheteurs;Position
Pneu;4;2;Alice,Bob;bas
Portière gauche;1;0;;gauche
Capot;1;1;Charlie;haut
```

---

## Génération de la page

1. Ouvre PowerShell dans le dossier `/projet`.

2. Lance le script de génération :

   ```powershell
   ./build.ps1
   ```

3. Le script :

   * lit `data/donnees.csv`
   * applique les données au modèle `static/template.html`
   * génère le fichier final dans `output/page.html`

4. Ouvre `output/page.html` dans ton navigateur.

---

## Personnalisation

* **Image de fond** : remplace `voiture.png` par ton visuel.
* **Positions des boîtes** : gérées dans `style.css` par les classes `.haut`, `.bas`, `.gauche`, `.droite`.
* **Couleurs/effets visuels** : à modifier dans `style.css`.
* **Comportement au clic/survol** : dans `script.js`.

---

## Évolutions possibles

* Ajouter plus de positions personnalisées (ex: `roue-avant-gauche`, `moteur`).
* Remplacer l’alerte par une **fenêtre flottante** avec un style plus visuel.
* Intégrer une mise à jour automatique (tâche planifiée Windows pour régénérer le HTML toutes les X minutes).
* Exporter en ligne sur un hébergement web pour partager le projet.

---

## Auteur

Projet développé comme démonstrateur participatif.
Génération automatisée en PowerShell + rendu interactif en HTML/CSS/JavaScript.
