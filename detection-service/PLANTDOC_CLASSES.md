# Classes du Dataset PlantDoc

Le modèle ResNet50 est entraîné sur le dataset PlantDoc avec **27 classes** :

## 🍎 Apple (Pomme)
1. Apple Scab Leaf - Tavelure du pommier
2. Apple leaf - Feuille saine de pomme
3. Apple rust leaf - Rouille du pommier

## 🌶️ Bell Pepper (Poivron)
4. Bell_pepper leaf - Feuille saine de poivron
5. Bell_pepper leaf spot - Tache foliaire du poivron

## 🫐 Blueberry (Myrtille)
6. Blueberry leaf - Feuille saine de myrtille

## 🍒 Cherry (Cerise)
7. Cherry leaf - Feuille saine de cerisier

## 🌽 Corn (Maïs)
8. Corn Gray leaf spot - Tache grise du maïs
9. Corn leaf blight - Brûlure des feuilles de maïs
10. Corn rust leaf - Rouille du maïs

## 🍑 Peach (Pêche)
11. Peach leaf - Feuille saine de pêcher

## 🥔 Potato (Pomme de terre)
12. Potato leaf early blight - Mildiou précoce
13. Potato leaf late blight - Mildiou tardif

## 🍇 Raspberry (Framboise)
14. Raspberry leaf - Feuille saine de framboisier

## 🌱 Soybean (Soja)
15. Soybean leaf - Feuille saine de soja
16. Soybean leaf blight - Brûlure des feuilles de soja

## 🎃 Squash (Courge)
17. Squash Powdery mildew leaf - Oïdium de la courge

## 🍓 Strawberry (Fraise)
18. Strawberry leaf - Feuille saine de fraisier

## 🍅 Tomato (Tomate) - 9 classes
19. Tomato Early blight leaf - Alternariose précoce
20. Tomato Septoria leaf spot - Septoriose
21. Tomato leaf - Feuille saine de tomate
22. Tomato leaf bacterial spot - Tache bactérienne
23. Tomato leaf late blight - Mildiou tardif
24. Tomato leaf mosaic virus - Virus de la mosaïque
25. Tomato leaf yellow virus - Virus du jaunissement
26. Tomato mold leaf - Moisissure
27. Tomato two spotted spider mites leaf - Tétranyque à deux points

---

## 📊 Distribution
- **Tomate** : 9 classes (33%)
- **Maïs** : 3 classes (11%)
- **Pomme** : 3 classes (11%)
- **Autres cultures** : 12 classes (45%)

## 🔬 Utilisation
Le modèle retourne l'index de la classe (0-26) et le nom correspondant avec un score de confiance.
