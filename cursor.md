# ⚡ Cursor Project Workflow Guide

This project follows **GitFlow**.  
Cursor should respect this branching model when suggesting Git commands or helping with merges.

---

## 🔹 Branching Rules
- `main` → production-ready code (never commit directly).  
- `develop` → integration branch for features.  
- `feature/*` → new features, branched from `develop`.  
- `release/*` → staging branch for next production version.  
- `hotfix/*` → emergency fixes, branched from `main`.  

---

## 🔹 Workflow Example

### Start a Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/<name>
```

### Merge a Feature
```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/<name>
git push origin develop
```

### Create a Release
```bash
git checkout develop
git pull origin develop
git checkout -b release/<version>
```

### Release to Production
```bash
git checkout main
git pull origin main
git merge --no-ff release/<version>
git push origin main
git tag -a v<version> -m "Release version <version>"
git push origin v<version>
```

### Merge Release Back
```bash
git checkout develop
git pull origin develop
git merge --no-ff release/<version>
git push origin develop
```

---

## 🌳 Visual
```text
 main    ───●───────────────●───────────────●────────────▶
             ▲               ▲
             │               │
         hotfix/…        release/x.y.z
                             │
 develop ──●─────●─────●─────●──────────────●───────────▶
             \       \
              \       feature/awesome
               \
                feature/login
```

---

## 🔹 Notes for Cursor
- Always suggest **`--no-ff` merges**.  
- Always branch features from **`develop`**, not `main`.  
- Always merge releases into both `main` and `develop`.  
- Always add tags on production releases.  
