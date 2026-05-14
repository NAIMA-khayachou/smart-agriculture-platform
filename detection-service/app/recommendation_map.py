PROMPT_TEMPLATES = {
  "Apple Scab Leaf": "Feuille de pommier - symptômes, diagnostic rapide, 3 actions de traitement (produits + posologie approximative) et prévention.",
  "Apple leaf": "Feuille de pommier - diagnostic, traitements recommandés et prévention.",
  "Apple rust leaf": "Rouille du pommier - diagnostic, traitements, précautions.",
  "Bell_pepper leaf": "Feuille de poivron - diagnostic et conseils pratiques.",
  "Bell_pepper leaf spot": "Taches sur poivron - actions concrètes de traitement et prévention.",
  "Blueberry leaf": "Feuille de myrtille - diagnostic et remèdes.",
  "Cherry leaf": "Feuille de cerisier - diagnostic et mesures utiles.",
  "Corn Gray leaf spot": "Tache grise du maïs - diagnostic et traitements.",
  "Corn leaf blight": "Brûlure du maïs - diagnostic et actions.",
  "Corn rust leaf": "Rouille du maïs - diagnostic et traitement.",
  "Peach leaf": "Feuille de pêche - diagnostic, traitement, prévention.",
  "Potato leaf early blight": "Pommes de terre - mildiou précoce: actions, traitements, prévention.",
  "Potato leaf late blight": "Pommes de terre - mildiou tardif: actions, traitements, prévention.",
  "Raspberry leaf": "Feuille de framboisier - diagnostic et traitement.",
  "Soybean leaf": "Feuille de soja - diagnostic et recommandations.",
  "Soybean leaf blight": "Tâches de soja - actions pratiques.",
  "Squash Powdery mildew leaf": "Oïdium sur courge - diagnostic, traitement biologique/chimique et prévention.",
  "Strawberry leaf": "Feuille de fraise - diagnostic et remèdes.",
  "Tomato Early blight leaf": "Tomate - alternariose précoce: diagnostic, traitement et prévention.",
  "Tomato Septoria leaf spot": "Tache septorienne: diagnostic et solutions.",
  "Tomato leaf": "Feuille de tomate - diagnostic et conseils.",
  "Tomato leaf bacterial spot": "Tache bactérienne de tomate - actions et prévention.",
  "Tomato leaf late blight": "Tomate - mildiou tardif: diagnostic, traitements et prévention.",
  "Tomato leaf mosaic virus": "Virus de la mosaïque: diagnostic et mesures (contrôle biologique et prévention).",
  "Tomato leaf yellow virus": "Virus (jaunissement) : diagnostic et conseils.",
  "Tomato mold leaf": "Moisissure sur tomate - diagnostic et actions.",
  "Tomato two spotted spider mites leaf": "Tétranyques sur tomate - diagnostic, traitement acaricide/biologique et prévention.",
  "grape leaf": "Feuille de vigne - diagnostic et remèdes.",
}

DEFAULT_PROMPT = "Plante atteinte de {class_name}. Propose des actions pratiques de diagnostic, traitement et prévention, plus les précautions d'application."
PROMPT_TEMPLATES = {
  "Tomato leaf late blight": (
    "Feuilles avec mildiou tardif. Décris 3 actions pratiques : "
    "1) Diagnostic rapide (signes visibles), "
    "2) Traitement (produits recommandés + posologie approximative), "
    "3) Prévention et bonnes pratiques. Ajoute précautions d'utilisation."
  ),
  "Tomato Early blight leaf": (
    "Taches d'alternariose. Indique étapes de soin, traitements physiques/biologiques, "
    "produits et prévention."
  ),
  "Apple leaf": (
    "Feuilles de pommier — fournir diagnostic, traitements courants et prévention."
  ),
  # ... ajoutez les autres classes ici ...
}
DEFAULT_PROMPT = "Plante atteinte de {class_name}. Propose des actions pratiques de diagnostic, traitement et prévention."