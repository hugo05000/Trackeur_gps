# Suivi GPS de Voilier en Mer

Cette application IoT permet le suivi en temps réel des voiliers afin de prévenir les vols et améliorer la sécurité des embarcations. Basée sur un capteur GPS connecté à la plateforme Orange Live Objects, elle assure une surveillance constante et alerte automatiquement les propriétaires en cas de déplacement suspect. L'application a été réalisé dans le cadre de mon Master 2 MIAGE à l'université Aix-Marseille.

---

## Problématiques traitées

- **Vols et disparitions fréquents d'embarcations**
- **Absence d'une solution fiable et abordable pour surveiller les bateaux**
- **Nécessité d'une détection rapide et d'une alerte en cas de mouvement suspect ou sortie de zone définie**

---

## Architecture technique du projet

<b>L'architecture technique est celle que nous présenterons lors de notre présentation orale pour illustrer des cas d'usage et non celle que traite l'application.</b>

### Couche Physique
- Capteur GPS installé directement sur le voilier.
- Alimenté par batterie intégrée ou via la batterie externe du bateau.
- Transmission des données de positionnement GPS en temps réel via réseau **LoRaWAN**.

### Couche Transport
- Transmission fiable des données via réseau **LoRaWAN**.
- Envoi périodique toutes les **10 minutes** des coordonnées GPS vers Orange Live Objects.

### Couche Traitement & Stockage
- Collecte et stockage sécurisé des positions GPS sur la plateforme **Orange Live Objects**.
- Analyse et comparaison continue avec les positions précédentes pour détecter les anomalies.
- Stockage d'un historique détaillé de navigation accessible en temps réel.

### Couche Application
- Affichage intuitif des positions actuelles et historiques sur une carte interactive.
- Envoi automatique d’alertes immédiates par **email ou SMS** en cas de déplacement suspect ou sortie de zone autorisée.
- Consultation simple et rapide des historiques de déplacements du voilier.

---

## Mise en place
Pour configurer le projet, créez et configurez un fichier 'config.js' basé sur l'exemple 'config.exemple.js' avec les bonnes valeurs.
Pensez bien à configurer la limite de récupération de données dans la variable deviceEUI