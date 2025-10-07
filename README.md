# Projet participatif - Voiture

Ce projet permet de visualiser l’avancement d’un projet participatif sous forme d’une **voiture interactive**.
Chaque pièce de la voiture peut être financée par un ou plusieurs participants. Une page HTML est générée automatiquement à partir d’un fichier CSV décrivant l’état des pièces.

L’affichage se fait sous la forme :

* d’une **image de fond** (voiture.png) représentant la voiture,
* d'une **image calque** SVG qui représente les pièces de la voiture,
* de **boîtes interactives** positionnées autour de l’image, reliées aux pièces correspondantes,
* de codes couleurs indiquant l’état des pièces :

  * **Rouge** : disponible (non achetée)
  * **Orange** : partiellement achetée
  * **Vert** : totalement achetée

Un clic sur une boîte affiche les informations détaillées (progression, noms des acheteurs et image de la pièce).

---

## Arborescence du projet

```
/projet
   /data
      donnees.csv          # fichier de données
   /dist
      index.html            # fichier HTML généré automatiquement
   /static
      pieces.svg           # image svg qui sert de calque aux pièces
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
* Un navigateur pour ouvrir `dist/index.html`.

---

## Structure du fichier `donnees.csv`

Le fichier contient une ligne par pièce avec la structure suivante :

```
Piece;NombreTotal;NombreAchete;Acheteurs;Position;SVGType;image
```

* **Piece** : nom de la pièce (ex: `Pneu`)
* **NombreTotal** : nombre total d’éléments pour cette pièce (ex: `4` pour les pneus)
* **NombreAchete** : nombre déjà achetés (ex: `2`)
* **Acheteurs** : liste séparée par des virgules des acheteurs (ex: `Alice,Bob`)
* **Position** : emplacement de la boîte (`haut`, `bas`, `gauche`, `droite`)
* **SVGType** : le nom de la piece dans le fichier SVG (calque)
* **image** : le lien vers une image pour illustration

### Exemple

```
Piece;NombreTotal;NombreAchete;Acheteurs;Position;SVGType;image
Support pour Smartphone;1;2;Éric,Manon;haut;support-smartphone;https://cdn.helloasso.com/img/photos/items/shops/718d2czbz5l._ac_ul375_sr375%20375_-e0f77c36224a49348d7bf0eee5c76403.jpg;
Twingo;100;0;;haut;;https://cdn.helloasso.com/img/photos/items/shops/twingo-8f910bd913b042c187afae1031e11ab2.png
```

---

## Génération de la page

1. Ouvre PowerShell dans le dossier `/`.

2. Lance le script de génération :

   ```powershell
   ./build.ps1
   ```

3. Le script :

   * lit `data/donnees.csv`
   * applique les données au modèle `static/template.html`
   * génère le fichier final dans `dist/index.html`

4. Ouvre `dist/index..html` dans ton navigateur.

---

## Auteur

Projet développé comme démonstrateur participatif.
Génération automatisée en PowerShell + rendu interactif en HTML/CSS/JavaScript.
