# Scholar Note

Application de gestion des notes (filières, niveaux, UE, modules, évaluations, notes, bulletins).

> 🎓 **Projet réalisé dans le cadre de mon cours de Génie Logiciel.**

## Structure du dépôt

| Dossier | Contenu | Stack |
|---|---|---|
| [`frontend/`](frontend) | Interface web | Next.js, TypeScript, Tailwind CSS |
| [`backend/`](backend) | API REST | FastAPI, SQLAlchemy, Alembic |

## Fonctionnalités

- Authentification et gestion des utilisateurs (administrateur, enseignant, étudiant)
- Gestion des filières, niveaux, périodes, UE et modules
- Création d'évaluations et saisie des notes
- Génération des bulletins

Les tables sont créées automatiquement au démarrage du backend.

## Captures d'écran

### Administrateur

| Connexion | Tableau de bord |
|---|---|
| ![Connexion](docs/screenshots/01-connexion.png) | ![Tableau de bord](docs/screenshots/02-tableau-de-bord.png) |
| ![Filières](docs/screenshots/03-filieres.png) | ![Étudiants](docs/screenshots/08-etudiants.png) |
| ![Modules](docs/screenshots/06-modules.png) | ![Évaluations](docs/screenshots/10-evaluations.png) |

![Création d'un étudiant](docs/screenshots/16-creation-etudiant.png)

### Étudiant

| Mes notes | Bulletin |
|---|---|
| ![Mes notes](docs/screenshots/11-etudiant-notes.png) | ![Bulletin](docs/screenshots/12-etudiant-bulletin.png) |

![Profil](docs/screenshots/13-profil.png)

### Enseignant

| Évaluations | Saisie des notes |
|---|---|
| ![Évaluations](docs/screenshots/14-enseignant-evaluations.png) | ![Saisie des notes](docs/screenshots/15-enseignant-saisie-notes.png) |

## Lancer le projet

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # SQLite par défaut ; DATABASE_URL pour PostgreSQL
uvicorn Main:app --reload
```

### Frontend

```bash
cd frontend
cp .env.example .env.local   # NEXT_PUBLIC_API_URL = URL du backend
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).
