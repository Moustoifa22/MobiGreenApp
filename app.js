// ========================================
// Données des Stands Mobi Green Interactif
// ========================================
// =============================================
// ITINERAIRE NARRATIF - Point A -> CESI
// =============================================

// Coordonnees cles du voyage
const ITINERAIRE = {
  depart:  [48.68223767249223, 6.190326552770215],   // CNAM Nancy, 3 Bd des Aiguillettes
  arrivee: [48.65149495004919, 6.132876511821123],   // NB Tech
  waypoints: [
    [48.68223767249223, 6.190326552770215],  // Départ exact
    [48.68490809931854, 6.187172274932828],  // Place des Vosges
    [48.66594504722162, 6.165814038585626],  // Vélodrome
    [48.65149495004919, 6.132876511821123]   // NB Tech
  ]
};

// Textes narratifs affiches a chaque transition (modales story)
const STORY_TEXTS = {
    intro: {
        emoji: '🚴',
        titre: 'Mobi\'Green avec Léo',
        texte: 'Salut ! Moi c\'est Léo, cycliste aguerri. Je vais t\'escorter pour ton trajet vers le Technopôle. À chaque étape, réponds bien pour obtenir un chiffre du cadenas de ton vélo !'
    },
    stand1_open: {
        emoji: '🏫',
        titre: 'Stand 1 : Départ du CNAM',
        texte: 'C\'est ici que tout commence. Pour sortir du quartier des Aiguillettes, voyons si tu connais les bases du partage de trajet.'
    },
    stand1_done: {
        emoji: '🔓',
        titre: 'Premier chiffre obtenu !',
        texte: 'Excellent début. Léo note le chiffre « 7 » pour toi.'
    },
    stand2_open: {
        emoji: '🦆',
        titre: 'Stand 2 : Place des Vosges',
        texte: 'Un carrefour historique et névralgique. Sais-tu pourquoi on encourage le covélo\'tage ici ?'
    },
    stand2_done: {
        emoji: '🔓',
        titre: 'Deuxième chiffre !',
        texte: 'Tu maîtrises le sujet. Le chiffre « 4 » est à toi.'
    },
    stand3_open: { // Le Vélodrome
        emoji: '🐟',
        titre: 'Stand 3 : Le Vélodrome',
        texte: 'On approche du plateau. Ici, on s\'occupe de la technique. La sécurité des batteries, c\'est primordial, non ?'
    },
    stand3_done: {
        emoji: '🔓',
        titre: 'Troisième chiffre !',
        texte: 'Sécurité validée. Léo te donne le chiffre « 2 ».'
    },
    stand4_open: {
        emoji: '🏁',
        titre: 'Stand 4 : NB Tech Brabois',
        texte: 'Bravo, tu as grimpé jusqu\'au Technopôle ! Un dernier quiz sur les bornes de recharge avant de libérer le vélo.'
    },
    stand4_done: {
        emoji: '🏁',
        titre: 'Mission Accomplie !',
        texte: 'Le dernier chiffre est le « 9 ». Tu as tous les éléments pour ouvrir le cadenas !'
    }
};

const stands = [
    {
        id: 1,
        emoji: "🏫",
        title: "CNAM Nancy",
        theme_label: "Mobilité Partagée",
        description: "Bienvenue ! Nous commençons notre trajet. Sur ce Technopôle, 20 000 personnes se déplacent chaque jour. Pour obtenir le 1er chiffre, réponds à cette question sur l'état des lieux.",
        badge: '🛡️ Gardien de l\'Eau',
        theme: 'theme-stand-1',
        coords: [48.68223767249223, 6.190326552770215],
        question_quiz: "Quelle est la part d'autosolisme (seul en voiture) vers le Technopôle ?",
        options_reponse: ["45 %", "73 %", "95 %"],
        bonne_reponse: 1,
        chiffre_secret: "7"
    },
    {
        id: 2,
        emoji: "🦆",
        title: "Place des Vosges",
        theme_label: "Impact Environnemental",
        description: "Un carrefour symbolique. Les chiffres environnementaux sont alarmants. Sais-tu quel est l'impact réel des trajets sur ce territoire ?",
        badge: '🧩 Expert Écosystème',
        theme: 'theme-stand-2',
        coords: [48.68490809931854, 6.187172274932828],
        question_quiz: "Quelle quantité de CO2 les déplacements domicile-travail génèrent-ils par an sur le Technopôle ?",
        options_reponse: ["1 500 tonnes", "9 800 tonnes", "50 000 tonnes"],
        bonne_reponse: 1,
        chiffre_secret: "4"
    },
    {
        id: 3,
        emoji: "🐟",
        title: "Le Vélodrome",
        theme_label: "Technique & Sécurité",
        description: "On approche du plateau. La sécurité des batteries est critique. Quelle norme encadre nos armoires de recharge ?",
        badge: '⚡ Maître Énergie',
        theme: 'theme-stand-3',
        coords: [48.66594504722162, 6.165814038585626],
        question_quiz: "Quelle norme allemande encadre la sécurité thermique des armoires de recharge de batteries ?",
        options_reponse: ["NFC 15-100", "VDMA 24994", "EN 50604-1"],
        bonne_reponse: 1,
        chiffre_secret: "2"
    },
    {
        id: 4,
        emoji: "🏁",
        title: "NB Tech",
        theme_label: "Infrastructure Urbaine",
        description: "Destination finale ! Notre système de recharge est conçu pour minimiser l'empreinte carbone. Dernière question avant d'ouvrir le cadenas.",
        badge: '🏆 Champion Mobi Green',
        theme: 'theme-stand-4',
        coords: [48.65149495004919, 6.132876511821123],
        question_quiz: "Quel type d'alimentation le système de recharge Mobi'Green intègre-t-il pour être écoresponsable ?",
        options_reponse: ["100% réseau EDF", "Hybride solaire + réseau", "Éolien uniquement"],
        bonne_reponse: 1,
        chiffre_secret: "9"
    }
];

// ========================================
// Gestion de l'Application avec POO
// ========================================
class MobiGreenManager {
    constructor() {
        this.currentStandIndex = 0;
        this.selectedOptionIndex = null;
        this.collectedDigits = [null, null, null, null];
        this.gameState = { step: 0, maxStep: 4, locked: false };
        this.introPending = false;
        this.validateBtn = document.getElementById('validateBtn');
        this.btnText = document.getElementById('btnText');
        this.btnSpinner = document.getElementById('btnSpinner');
        this.standTitleElement = document.getElementById('standTitle');
        this.standDescriptionElement = document.getElementById('standDescription');
        this.progressContainer = document.getElementById('progressStepsContainer');
        this.linearProgressBar = document.getElementById('linearProgressBar');
        this.notificationContainer = document.getElementById('notification-container');
        this.contentCard = document.getElementById('contentCard'); // The main card for glassmorphism/shake
        this.actionZone = document.getElementById('actionZone'); // To hide on final screen
        
        // Quiz Elements
        this.quizQuestion = document.getElementById('quizQuestion');
        this.quizOptions = document.getElementById('quizOptions');
        this.feedbackMsg = document.getElementById('feedbackMsg');
        this.progressLabel = document.getElementById('progressLabel');

        // Map properties
        this.map = null;
        this.marker = null;
        // Tracés et couches de l'itinéraire
        this.backgroundRouteLayer = null; // Tracé global gris
        this.progressRouteLayer = null;   // Tracé vert (progression)
        this.itineraireSegments = [];      // Pour la compatibilité/nettoyage
        this.cesiMarker = null;
        this.departMarker = null;
        this.covelotageMarkers = [];
        this.irveMarkers = [];
        this.routeSegmentsCache = [];
        this.routeBuildPromise = null;
        this.routeReady = false;
        this.fullRouteCoords = [];
        this.fullRouteReady = false;
        this.standRouteIndices = [];
        this.battery = 100;
        this.coloredSegments = [];
        this.reliefMarkers = [];

        // Audio assets (Sons système légers)
        this.successSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        this.errorSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');

        this.init();
        this.renderProgressSteps();
        this.initMap();
        this.attachEventListeners();
        this.displayCurrentStand();
    }

    init() {
        // Chargement de l'état global persistant
        const savedState = localStorage.getItem('mobiGreenAppState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.currentStandIndex = state.currentStandIndex || 0;
            this.collectedDigits = state.collectedDigits || [null, null, null, null];
            this.battery = state.battery || 100;
            
            // Restauration visuelle des chiffres collectés
            this.collectedDigits.forEach((digit, idx) => {
                if (digit) this.revealDigit(idx, digit);
            });
        }

        this.syncGameState();

        // Modale d'introduction uniquement au premier lancement
        if (!localStorage.getItem('mobiGreenV2State')) {
            this.introPending = true;
            localStorage.setItem('mobiGreenV2State', 'initialized');
            setTimeout(async () => {
                await this.showStoryModal('intro', 'Demarrer le voyage →');
                this.introPending = false;
                if (this.currentStandIndex === 0) {
                    this.showStoryModal('stand1_open', 'Je suis pret →');
                }
            }, 800);
        }
    }

    initMap() {
        if (typeof L === 'undefined' || !document.getElementById('map')) return;
        try {
            const initialCoords = this.currentStandIndex === 0
                ? ITINERAIRE.depart
                : (stands[this.currentStandIndex]?.coords || ITINERAIRE.depart);
            this.map = L.map('map', { scrollWheelZoom: false }).setView(initialCoords, 15);

            this.tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }).addTo(this.map);

            // Marqueur de position actuelle (vélo)
            const bikeIcon = L.divIcon({
                html: '<div style="font-size:24px;">🚲</div>',
                className: 'bike-position-icon',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            this.marker = L.marker(initialCoords, { icon: bikeIcon }).addTo(this.map);
            
            // Icône de départ personnalisée (École/CNAM)
            const startIcon = L.divIcon({
                html: '<div style="font-size:24px;">🏫</div>',
                className: 'start-marker-icon',
                iconSize: [30, 30],
                iconAnchor: [15, 25]
            });
            L.marker(ITINERAIRE.depart, { icon: startIcon }).addTo(this.map).bindPopup('Départ : CNAM Nancy');

            // Placement immédiat du drapeau d'arrivée au CESI
            const arrivalIcon = L.divIcon({
                html: '<div style="font-size:24px;">🏁</div>',
                className: 'arrival-icon',
                iconSize: [30, 30],
                iconAnchor: [5, 25]
            });
            L.marker(ITINERAIRE.arrivee, { icon: arrivalIcon }).addTo(this.map)
             .bindPopup('<b>Objectif Final :</b> NB Tech (Autoconsommation Solaire)');
            
            // Emoji Canard (Place des Vosges) - Permanent
            const duckIcon = L.divIcon({
                html: '<div style="font-size:24px;">🦆</div>',
                className: 'duck-marker-icon',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            L.marker([48.68490809931854, 6.187172274932828], { icon: duckIcon }).addTo(this.map).bindPopup('Place des Vosges (Pêche aux canards)');

            // Emoji Poisson (Le Vélodrome) - Permanent
            const fishIcon = L.divIcon({
                html: '<div style="font-size:24px;">🐟</div>',
                className: 'fish-marker-icon',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            L.marker([48.66594504722162, 6.165814038585626], { icon: fishIcon }).addTo(this.map).bindPopup('Le Vélodrome (Puzzle Poisson)');

            // Auto-resize map when window changes
            window.addEventListener('resize', () => this.map.invalidateSize());
            // Initialisation du moteur de calcul d'itinéraire
            this.buildRoutingControl();
        } catch (e) {
            console.error("Map initialization failed", e);
        }
    }

    buildRoutingControl() {
        if (typeof L === 'undefined' || typeof L.Routing === 'undefined' || !this.map) return;
        try {
            const waypoints = ITINERAIRE.waypoints.map(p => L.latLng(p[0], p[1]));
            this.routingControl = L.Routing.control({
                waypoints,
                router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                createMarker: () => null,
                addWaypoints: false,
                fitSelectedRoute: false,
                showAlternatives: false,
                show: false, // Ajouté pour masquer le panneau d'instructions
                lineOptions: { styles: [{ opacity: 0 }] } // On cache le tracé par défaut
            }).addTo(this.map);

            this.routingControl.on('routesfound', (e) => {
                try {
                    const route = e.routes && e.routes[0];
                    if (!route) return;
                    const coords = route.coordinates || route.geometry?.coordinates || [];
                    // Normalize coordinates to [lat, lng]
                    const normalized = coords.map(c => {
                        if (c && typeof c.lat === 'number' && typeof c.lng === 'number') return [c.lat, c.lng];
                        if (Array.isArray(c) && c.length >= 2 && typeof c[0] === 'number' && typeof c[1] === 'number') {
                            // Heuristic: if first value magnitude > 90, it's likely longitude -> [lng,lat]
                            if (Math.abs(c[0]) > 90) return [c[1], c[0]]; // [lng,lat] -> [lat,lng]
                            return [c[0], c[1]]; // already [lat,lng]
                        }
                        return null;
                    }).filter(Boolean);

                    if (normalized.length > 2) {
                        this.fullRouteCoords = normalized;
                        this.fullRouteReady = true;

                        // 1. Placement mathématique des stands sur le tracé réel (10%, 40%, 70%, 100%)
                        this.placeStandsOnRoute(normalized);

                        // Nettoyage des tracés et marqueurs précédents
                        this.coloredSegments.forEach(s => this.map.removeLayer(s));
                        this.reliefMarkers.forEach(m => this.map.removeLayer(m));
                        if (this.backgroundRouteLayer) this.map.removeLayer(this.backgroundRouteLayer);
                        this.coloredSegments = [];
                        this.reliefMarkers = [];

                        // Indices clés pour les segments de relief
                        const velodromeIndex = this.standRouteIndices[2];
                        const nbTechIndex = this.standRouteIndices[3];
                        
                        // Calcul de l'index pour le sommet de la côte (Plateau de Brabois)
                        let plateauIndex = velodromeIndex;
                        let minD = Infinity;
                        const plateauCoords = [48.6569435775509, 6.15510495809904];
                        normalized.forEach((p, idx) => {
                            const d = Math.abs(p[0] - plateauCoords[0]) + Math.abs(p[1] - plateauCoords[1]);
                            if (d < minD) { minD = d; plateauIndex = idx; }
                        });

                        // Segment 1 — Plat (VERT) : CNAM -> Vélodrome
                        this.coloredSegments.push(L.polyline(normalized.slice(0, velodromeIndex + 1), {
                            color: '#10b981',
                            weight: 10, // Plus épais
                            opacity: 0.9
                        }).addTo(this.map));

                        // Segment 2 — Montée Brabois (ROUGE) : Vélodrome -> Sommet
                        const redSegment = L.polyline(normalized.slice(velodromeIndex, plateauIndex + 1), {
                            color: '#ef4444',
                            weight: 12, // Encore plus épais pour la "cicatrice"
                            opacity: 0.9,
                            className: 'cicatrice-rouge'
                        }).addTo(this.map);

                        redSegment.bindTooltip("⚠️ Montée Brabois — 8% à 14% (Assistance MAX)", {
                            permanent: true,
                            direction: 'top',
                            className: 'relief-tooltip'
                        });
                        this.coloredSegments.push(redSegment);

                        // Segment 3 — Plateau (VERT) : Sommet -> NB Tech
                        this.coloredSegments.push(L.polyline(normalized.slice(plateauIndex, nbTechIndex + 1), {
                            color: '#10b981',
                            weight: 10,
                            opacity: 0.9
                        }).addTo(this.map));

                        // 3. Cadrage automatique sur l'ensemble du tracé
                        const fullBounds = L.latLngBounds(normalized);
                        this.map.fitBounds(fullBounds, { padding: [50, 50] });
                    } else {
                        console.warn('Routing machine returned no normalized coords', coords.length);
                    }
                } catch (err) { console.warn('routesfound handler error', err); }
            });
        } catch (err) { console.warn('buildRoutingControl error', err); }
    }

    /**
     * Calcule et place les stands aux ratios demandés sur le tracé réel
     */
    placeStandsOnRoute(coords) {
        stands.forEach((stand, i) => {
            // Trouver le point le plus proche sur le tracé OSRM pour chaque coordonnée de stand définie
            let minDistance = Infinity;
            let bestIndex = 0;

            coords.forEach((point, index) => {
                const dist = Math.abs(point[0] - stand.coords[0]) + Math.abs(point[1] - stand.coords[1]);
                if (dist < minDistance) {
                    minDistance = dist;
                    bestIndex = index;
                }
            });

            this.standRouteIndices[i] = bestIndex;
        });

        this.updateMapLocation();
    }

    updateMapLocation() {
        if (!this.map || !this.marker) return;
        const stand = stands[this.currentStandIndex];
        if (!stand || !stand.coords) return;

        // flyTo crée une animation de vol fluide vers la destination
        this.map.flyTo(stand.coords, 15, {
            animate: true,
            duration: 1.5 // Durée du voyage en secondes
        });
        this.marker.setLatLng(stand.coords).bindPopup(`<b>Stand ${stand.id}</b>: ${stand.title}`).openPopup();

        // Gestion du grossissement du vélo et de la batterie
        const bikeElement = this.marker.getElement();
        if (bikeElement) {
            if (this.currentStandIndex === 3) { // Arrivée après la zone rouge
                bikeElement.classList.add('bike-climbing');
                this.updateBatteryUI(30); // Chute brutale pour la montée
            } else if (this.currentStandIndex === 2) {
                bikeElement.classList.remove('bike-climbing');
                this.updateBatteryUI(80); // Consommation normale
            } else {
                bikeElement.classList.remove('bike-climbing');
            }
        }

        this.standDescriptionElement.innerHTML = stand.description;
    }

    syncGameState() {
        this.gameState.step = Math.min(this.currentStandIndex, this.gameState.maxStep);
        this.gameState.locked = Boolean(this.validateBtn?.disabled);
    }

    updateBatteryUI(value) {
        this.battery = value;
        document.getElementById('batteryPercentage').textContent = `${value}%`;
        document.getElementById('batteryBar').style.width = `${value}%`;
        this.saveProgress();
    }

    saveProgress() {
        const state = {
            currentStandIndex: this.currentStandIndex,
            collectedDigits: this.collectedDigits,
            battery: this.battery
        };
        localStorage.setItem('mobiGreenAppState', JSON.stringify(state));
    }

    activateCovelotage() {
        if (!this.map || this.covelotageMarkers.length > 0) return;
        const riders = [
            [48.6522, 6.1399],
            [48.6529, 6.1388],
            [48.6536, 6.1377]
        ];

        this.covelotageMarkers = riders.map((coords) => {
            const icon = L.divIcon({
                className: '',
                html: '<div style="font-size:18px">🚴</div>',
                iconSize: [20, 20]
            });
            return L.marker(coords, { icon }).addTo(this.map).bindPopup('Coveloteur actif');
        });
    }

    activateIrve() {
        if (!this.map || this.irveMarkers.length > 0) return;
        const stations = [
            [48.6525, 6.1356],
            [48.6518, 6.1347]
        ];

        this.irveMarkers = stations.map((coords) => {
            const icon = L.divIcon({
                className: '',
                html: '<div style="font-size:18px">🔋</div>',
                iconSize: [20, 20]
            });
            return L.marker(coords, { icon }).addTo(this.map).bindPopup('Borne IRVE securisee');
        });
    }

    restoreNarrativeMapLayers() {
        if (this.currentStandIndex >= 2) this.activateCovelotage();
        if (this.currentStandIndex >= 3) this.activateIrve();
    }

    renderProgressSteps() {
        if (!this.progressContainer) return;

        this.progressContainer.innerHTML = '';
        stands.forEach((_, index) => {
            const step = document.createElement('div');
            step.className = 'progress-step w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ease-in-out';
            step.dataset.index = index;
            step.textContent = index + 1;
            this.progressContainer.appendChild(step);
        });
    }

    attachEventListeners() {
        this.validateBtn.addEventListener('click', () => this.verifyQuizAnswer());
        
        // Final Modal logic
        const openLockBtn = document.getElementById('openLockBtn');
        if (openLockBtn) openLockBtn.addEventListener('click', () => this.verifyFinalCode());
        
        // Auto-focus final inputs
        const inputs = document.querySelectorAll('.cadenas-input');
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value && index < 3) inputs[index+1].focus();
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) inputs[index-1].focus();
            });
        });
    }

    renderQuiz(stand) {
        this.quizQuestion.textContent = stand.question_quiz;
        this.quizOptions.innerHTML = '';
        this.selectedOptionIndex = null;
        this.validateBtn.disabled = true;
        this.feedbackMsg.classList.add('hidden');

        stand.options_reponse.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.innerHTML = `
                <span class="quiz-option-letter">${String.fromCharCode(65 + index)}</span>
                <span>${option}</span>
            `;
            btn.onclick = () => this.selectOption(index);
            this.quizOptions.appendChild(btn);
        });
    }

    selectOption(index) {
        this.selectedOptionIndex = index;
        const buttons = this.quizOptions.querySelectorAll('.quiz-option');
        buttons.forEach((btn, i) => {
            btn.classList.toggle('selected', i === index);
        });
        this.validateBtn.disabled = false;
    }

    async verifyQuizAnswer() {
        const stand = stands[this.currentStandIndex];
        if (this.selectedOptionIndex === stand.bonne_reponse) {
            if (navigator.vibrate) navigator.vibrate(40); // Petite vibration de succès
            this.onCorrectAnswer(stand);
        } else {
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // Vibration d'erreur
            this.onWrongAnswer(stand);
        }
    }

    async onCorrectAnswer(stand) {
        this.playSuccessSound();
        this.triggerConfetti();
        
        // Feedback visuel sur les boutons
        const buttons = this.quizOptions.querySelectorAll('.quiz-option');
        buttons[this.selectedOptionIndex].classList.add('correct');
        buttons.forEach(b => b.disabled = true);
        
        this.revealDigit(this.currentStandIndex, stand.chiffre_secret);
        this.collectedDigits[this.currentStandIndex] = stand.chiffre_secret;
        this.saveProgress();

        const storyKey = `stand${this.currentStandIndex + 1}_done`;
        await this.showStoryModal(storyKey, 'Continuer →');

        setTimeout(() => {
            if (this.currentStandIndex < stands.length - 1) {
                this.currentStandIndex++;
                this.displayCurrentStand();
            } else {
                this.openFinalModal();
            }
        }, 800);
    }

    onWrongAnswer(stand) {
        this.errorSound.play().catch(() => {});
        this.triggerShakeAnimation();
        
        const buttons = this.quizOptions.querySelectorAll('.quiz-option');
        buttons[this.selectedOptionIndex].classList.add('wrong');
        buttons[stand.bonne_reponse].classList.add('correct');
        buttons.forEach(b => b.disabled = true);
        
        this.feedbackMsg.textContent = "Léo te conseille de bien relire la question. Réessaie dans un instant !";
        this.feedbackMsg.className = "rounded-xl px-4 py-3 text-sm font-medium mb-4 bg-red-500/20 text-red-300 block";

        setTimeout(() => {
            this.renderQuiz(stand);
        }, 2500);
    }

    playSuccessSound() {
        if (this.successSound) {
            this.successSound.currentTime = 0;
            this.successSound.play().catch(() => {});
        }
    }

    revealDigit(index, digit) {
        // Update header display
        const headerEl = document.getElementById(`digit-${index}`);
        if (headerEl) {
            headerEl.textContent = digit;
            headerEl.classList.add('revealed');
        }

        // Update Inventory Display
        const slot = document.getElementById(`slot-${index}`);
        if (slot) {
            slot.classList.add('filled');
            slot.innerHTML = `<span class="inventory-digit">${digit}</span>`;
        }
    }

    setLoading(isLoading) {
        this.validateBtn.disabled = isLoading;
        if (isLoading) {
            this.btnText.classList.add('opacity-0');
            this.btnSpinner.classList.remove('hidden');
        } else {
            this.btnText.classList.remove('opacity-0');
            this.btnSpinner.classList.add('hidden');
        }
    }

    openFinalModal() {
        const modal = document.getElementById('finalModal');
        modal.classList.remove('hidden');
        
        // Pré-remplir avec les chiffres collectés
        this.collectedDigits.forEach((digit, idx) => {
            if (digit) document.getElementById(`finalInput${idx}`).value = digit;
        });
    }

    verifyFinalCode() {
        const inputCode = [0,1,2,3].map(i => document.getElementById(`finalInput${i}`).value).join('');
        const correctCode = stands.map(s => s.chiffre_secret).join('');
        
        const feedback = document.getElementById('finalFeedback');
        const box = document.querySelector('#finalModal .glassmorphism');

        if (inputCode === correctCode) {
            if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
            this.successSound.play().catch(() => {});
            this.triggerConfetti();
            feedback.textContent = "Code validé ! Génération du bilan énergétique...";
            feedback.className = "rounded-xl px-4 py-3 text-sm font-medium mb-4 bg-emerald-500/20 text-emerald-300 block";
            
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 }
            });

            setTimeout(() => {
                document.getElementById('finalModal').classList.add('hidden');
                document.getElementById('victoryModal').classList.remove('hidden');
                // Deuxième salve de confettis pour le dashboard
                confetti({
                    particleCount: 50,
                    scalar: 1.2,
                    colors: ['#10b981', '#ffffff']
                });
            }, 2500);
        } else {
            this.errorSound.play().catch(() => {});
            box.classList.add('shake-animation');
            feedback.textContent = "Le cadenas résiste... Es-tu sûr des chiffres de Léo ?";
            feedback.className = "rounded-xl px-4 py-3 text-sm font-medium mb-4 bg-red-500/20 text-red-300 block";
            
            const inputs = document.querySelectorAll('.cadenas-input');
            inputs.forEach(i => i.classList.add('error'));
            
            setTimeout(() => {
                box.classList.remove('shake-animation');
                inputs.forEach(i => i.classList.remove('error'));
            }, 600);
        }
    }

    // Les méthodes ci-dessous sont conservées et adaptées selon les règles

    showStoryModal(storyKey, btnLabel = 'Commencer →') {
        const data = STORY_TEXTS[storyKey];
        if (!data) return;

        document.getElementById('storyEmoji').textContent = data.emoji;
        document.getElementById('storyTitle').textContent = data.titre;
        document.getElementById('storyText').textContent = data.texte;
        document.getElementById('storyCloseBtn').textContent = btnLabel;

        const modal = document.getElementById('storyModal');
        if (!modal) return;

        // Reinitialiser l'animation
        const box = document.getElementById('storyModalBox');
        box.classList.remove('animate-story-in');
        void box.offsetWidth;
        box.classList.add('animate-story-in');

        modal.classList.remove('hidden');

        // Bouton fermeture - resolution unique via Promise
        return new Promise((resolve) => {
            const btn = document.getElementById('storyCloseBtn');
            const handler = () => {
                modal.classList.add('hidden');
                btn.removeEventListener('click', handler);
                resolve();
            };
            btn.addEventListener('click', handler);
        });
    }

    displayCurrentStand() {
        if (this.currentStandIndex >= stands.length) {
            this.showFinalState();
            return;
        }

        const stand = stands[this.currentStandIndex];

        // Animation de transition (Slide Out)
        this.contentCard.classList.add('content-fade-out');

        setTimeout(() => {
            // Mise à jour Thème et Contenu
            document.body.className = `bg-slate-950 text-slate-100 ${stand.theme}`;
            this.standTitleElement.textContent = `Stand ${stand.id}: ${stand.title}`;
            this.standDescriptionElement.textContent = stand.description;
            this.syncGameState();

            this.updateProgressIndicator();
            this.updateLinearProgressBar();
            
            this.progressLabel.textContent = `${this.currentStandIndex} / ${stands.length} stands complétés`;
            
            this.renderQuiz(stand);
            this.updateMapLocation();

            // Afficher la modale narrative d'ouverture du stand
            const storyKeys = ['stand1_open', 'stand2_open', 'stand3_open', 'stand4_open'];
            const storyKey = storyKeys[this.currentStandIndex];
            if (storyKey && !(this.currentStandIndex === 0 && this.introPending)) {
                // Pause allongée (3.5s) pour laisser le flyTo se terminer avant d'afficher la modale
                setTimeout(() => this.showStoryModal(storyKey, 'Je suis pret →'), 3500);
            }
            this.hideHint();

            // Animation de transition (Slide In)
            this.contentCard.classList.remove('content-fade-out');
            this.contentCard.classList.add('content-fade-in');

            requestAnimationFrame(() => {
                this.contentCard.classList.add('content-visible');
                this.contentCard.classList.remove('content-fade-in');
                if (this.map) this.map.invalidateSize();
            });
        }, 400);
    }

    animateCounter(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            element.innerText = Math.floor(progress * (end - start) + start) + "%";
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    updateProgressIndicator() {
        const progressSteps = this.progressContainer.querySelectorAll('.progress-step');
        const isFinished = this.currentStandIndex >= stands.length; // Check if all stands are completed

        progressSteps.forEach((step, index) => {
            step.classList.remove('bg-emerald-700', 'opacity-60', 'bg-white', 'text-emerald-600', 'completed');

            if (index < this.currentStandIndex) {
                // Completed steps
                step.classList.add('bg-white', 'text-emerald-600', 'completed');
                step.classList.remove('active-step');
                step.innerHTML = '✓';
            } else if (index === this.currentStandIndex && !isFinished) {
                // Current step (if not finished)
                step.classList.add('bg-white', 'active-step');
                step.innerHTML = String(index + 1);
            } else if (isFinished) {
                // All steps completed, mark all with checkmark
                step.classList.add('bg-white', 'text-emerald-600', 'completed');
                step.innerHTML = '✓';
            } else {
                // Future steps
                step.classList.add('bg-emerald-700', 'text-white', 'opacity-60');
                step.innerHTML = String(index + 1);
            }
        });
    }

    updateLinearProgressBar() {
        if (!this.linearProgressBar) return;
        const progress = (this.currentStandIndex / stands.length) * 100;
        this.linearProgressBar.style.width = `${progress}%`;
    }

    showMessage(message, type) {
        const notification = document.createElement('div');
        notification.className = `px-8 py-5 rounded-2xl text-white font-bold text-xl shadow-2xl notification-anim pointer-events-auto ${
            type === 'success' ? 'bg-emerald-600/95' : 'bg-red-500/95'
        }`;
        notification.textContent = message;

        this.notificationContainer.appendChild(notification);

        // Durée allongée à 6 secondes pour permettre au jury de lire tranquillement
        setTimeout(() => {
            notification.style.transition = 'all 0.5s ease';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 500);
        }, 6000);
    }

    triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    triggerShakeAnimation() {
        this.contentCard.classList.add('shake-animation', 'border-error');
        setTimeout(() => {
            this.contentCard.classList.remove('shake-animation', 'border-error');
        }, 600); // Match animation duration
    }

    showHint() {
        const hintContainer = document.getElementById('hintContainer');
        const hintText = document.getElementById('hintText');
        if (hintContainer && hintText) {
            hintText.textContent = stands[this.currentStandIndex].hint;
            hintContainer.classList.remove('hidden');
            hintContainer.classList.add('badge-item'); // Reuse popIn animation
        }
    }

    hideHint() {
        const hintContainer = document.getElementById('hintContainer');
        if (hintContainer) {
            hintContainer.classList.add('hidden');
        }
    }

    resetProgress() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser la progression ? Cela effacera votre avancement.')) {
            localStorage.clear();
            window.location.reload();
        }
    }
}


// ========================================
// Initialisation de l'Application
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    window.mobiGreenApp = new MobiGreenManager();
    window.resetMobiGreenProgress = () => window.mobiGreenApp.resetProgress();

    const installAppBtn = document.getElementById('installAppBtn');
    let deferredInstallPrompt = null;

    const hideInstallButton = () => {
        if (installAppBtn) installAppBtn.classList.add('hidden');
    };

    const showInstallButton = () => {
        if (installAppBtn) installAppBtn.classList.remove('hidden');
    };

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        hideInstallButton();
    }

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        hideInstallButton();
    });

    if (installAppBtn) {
        installAppBtn.addEventListener('click', async () => {
            if (!deferredInstallPrompt) return;

            deferredInstallPrompt.prompt();
            await deferredInstallPrompt.userChoice.catch(() => null);
            deferredInstallPrompt = null;
            hideInstallButton();
        });
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js').catch((error) => {
                console.warn('Service Worker registration failed:', error);
            });
        });
    }
});