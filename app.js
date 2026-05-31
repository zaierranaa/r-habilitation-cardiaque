let role = localStorage.getItem("role");

if(!role){
  window.location.href = "index.html";
}

// Données du questionnaire par profil
const data = {
  patient: [
    {
      question: "Avez-vous eu des douleurs ou des gênes thoraciques cette semaine ?",
      domain: "Symptômes cardiovasculaires"
    },
    {
      question: "Avez-vous ressenti un essoufflement même au repos ou la nuit ?",
      domain: "Symptômes cardiovasculaires"
    },
    {
      question: "Etes-vous fatigué ou avez-vous peu d'énergie pour vos activités quotidiennes ?",
      domain: "Bien-être et état général"
    },
    {
      question: "Pratiquez-vous une activité physique régulière (marche, exercices) ?",
      domain: "Activité physique et autonomie"
    },
    {
      question: "Arrivez-vous à réaliser vos gestes quotidiens sans difficulté (hygiène, repas) ?",
      domain: "Activité physique et autonomie"
    },
    {
      question: "Prenez-vous régulièrement vos médicaments comme prescrit ?",
      domain: "Adhérence thérapeutique"
    },
    {
      question: "Respectez-vous les conseils diététiques (sel, liquides) ?",
      domain: "Adhérence thérapeutique"
    },
    {
      question: "Comment est votre moral et votre sommeil ?",
      domain: "Bien-être et état général"
    }
  ],

  infirmier: [
    {
      question: "Avez-vous observé des signes cliniques d'insuffisance cardiaque (œdèmes, dyspnée) ?",
      domain: "Symptômes cardiovasculaires"
    },
    {
      question: "Le patient maintient-il une activité physique adaptée à son état ?",
      domain: "Activité physique et autonomie"
    },
    {
      question: "Y a-t-il des signes de dépression ou d'anxiété chez le patient ?",
      domain: "Bien-être et état général"
    },
    {
      question: "Le patient comprend-il et respecte-t-il son plan thérapeutique ?",
      domain: "Adhérence thérapeutique"
    },
    {
      question: "Avez-vous identifié des barrières à l'adhérence thérapeutique ?",
      domain: "Adhérence thérapeutique"
    },
    {
      question: "Le patient a-t-il besoin d'un soutien psychosocial ou d'une réadaptation ?",
      domain: "Bien-être et état général"
    },
    {
      question: "Y a-t-il une bonne communication avec le patient et sa famille ?",
      domain: "Activité physique et autonomie"
    },
    {
      question: "Le suivi clinique est-il régulier et adapté aux risques identifiés ?",
      domain: "Symptômes cardiovasculaires"
    }
  ],

  famille: [
    {
      question: "Observez-vous des signes d'anxiété ou de dépression chez le patient ?",
      domain: "Bien-être et état général"
    },
    {
      question: "Le patient est-il capable de réaliser ses activités quotidiennes ?",
      domain: "Activité physique et autonomie"
    },
    {
      question: "Respecte-t-il ses rendez-vous médicaux et ses traitements ?",
      domain: "Adhérence thérapeutique"
    },
    {
      question: "Y a-t-il des symptômes alarmants (douleur thoracique, essoufflement important) ?",
      domain: "Symptômes cardiovasculaires"
    },
    {
      question: "Le patient a-t-il un mode de vie sain (alimentation, sommeil) ?",
      domain: "Adhérence thérapeutique"
    },
    {
      question: "Avez-vous des inquiétudes concernant sa santé cardiaque ?",
      domain: "Bien-être et état général"
    },
    {
      question: "Le patient accepte-t-il votre soutien et vos encouragements ?",
      domain: "Activité physique et autonomie"
    },
    {
      question: "Savez-vous quels signes d'alerte doivent vous alerter ?",
      domain: "Symptômes cardiovasculaires"
    }
  ]
};

// Recommandations infirmières selon le niveau de risque
const recommendations = {
  patient: {
    excellent: {
      level: "🟢 État stable - Excellent suivi",
      color: "#4caf50",
      advice: [
        "Continuez vos efforts ! Votre état s'améliore régulièrement.",
        "Maintenez votre routine de traitement et d'activité physique.",
        "Restez vigilant à tout changement : douleur thoracique, essoufflement ou fatigue anormale.",
        "Prochaine évaluation recommandée dans 1-2 mois."
      ]
    },
    bon: {
      level: "🟡 État bon - Suivi régulier recommandé",
      color: "#ff9800",
      advice: [
        "Votre état de santé est globalement satisfaisant.",
        "Renforcez progressivement votre activité physique selon les conseils de votre médecin.",
        "Assurez-vous de respecter scrupuleusement vos médicaments et votre régime alimentaire.",
        "Signalez rapidement toute nouvelle gêne à votre infirmier ou médecin.",
        "Prochaine évaluation recommandée dans 3-4 semaines."
      ]
    },
    vigilance: {
      level: "🟠 Vigilance requise - Surveillance étroite",
      color: "#ff6f00",
      advice: [
        "Votre situation nécessite une surveillance rapprochée.",
        "Consultez rapidement votre infirmier ou médecin pour une évaluation complète.",
        "Revoyez vos traitements : vérifiez que vous prenez tous vos médicaments correctement.",
        "Limitez temporairement vos activités physiques tant que votre état s'améliore.",
        "Tenez un journal de vos symptômes (fatigue, essoufflement, douleur) pour votre médecin.",
        "Prochaine évaluation recommandée dans 1-2 semaines."
      ]
    },
    critique: {
      level: "🔴 Risque élevé - Intervention urgente",
      color: "#d32f2f",
      advice: [
        "Votre état de santé nécessite une intervention rapide de votre équipe médicale.",
        "Contactez immédiatement votre médecin ou allez aux urgences si vous avez :",
        "  • Une douleur thoracique ou une pression dans la poitrine",
        "  • Un essoufflement sévère",
        "  • Une fatigue extrême ou des vertiges",
        "  • Un gonflement important des jambes ou des pieds",
        "Consultez votre infirmier dès que possible pour un suivi personnalisé.",
        "Ne tentez pas d'augmenter votre activité physique sans avis médical."
      ]
    }
  },

  infirmier: {
    excellent: {
      level: "🟢 Patient stable - Suivi de maintien",
      color: "#4caf50",
      advice: [
        "L'état clinique du patient est stable et bien contrôlé.",
        "Maintenez le suivi régulier et l'éducation thérapeutique en cours.",
        "Continuez la surveillance des signes d'aggravation.",
        "Encouragez la poursuite de l'activité physique adaptée.",
        "Réévaluation recommandée dans 4-6 semaines."
      ]
    },
    bon: {
      level: "🟡 Patient globalement stable - Suivi adapté",
      color: "#ff9800",
      advice: [
        "L'état du patient est satisfaisant avec quelques points d'amélioration.",
        "Renforcez l'éducation thérapeutique sur les domaines faibles.",
        "Optimisez le traitement pharmacologique si nécessaire.",
        "Favorisez la participation à un programme de réadaptation cardiaque.",
        "Impliquez la famille dans le soutien du patient.",
        "Réévaluation recommandée dans 2-3 semaines."
      ]
    },
    vigilance: {
      level: "🟠 Patient à risque - Surveillance accrue",
      color: "#ff6f00",
      advice: [
        "Des signes cliniques préoccupants ont été identifiés.",
        "Intensifiez la surveillance : consultations plus fréquentes (1-2x/semaine).",
        "Revoyez le plan thérapeutique avec le médecin (ajustements médicamenteux).",
        "Évaluez les barrières à l'adhérence et adaptez les conseils.",
        "Mettez en place ou renforcez le soutien psychosocial.",
        "Impliquez la famille dans la surveillance et le soutien.",
        "Organisez une coordination interdisciplinaire si nécessaire.",
        "Réévaluation recommandée dans 1 semaine."
      ]
    },
    critique: {
      level: "🔴 Patient en danger - Action urgente",
      color: "#d32f2f",
      advice: [
        "L'état clinique du patient est préoccupant et nécessite une intervention urgente.",
        "Consultez le médecin ou alertez le cardiologue immédiatement.",
        "Envisagez une hospitalisation ou une consultation urgente si nécessaire.",
        "Renforcez la surveillance clinique quotidienne ou rapprochée.",
        "Revoyez complètement le traitement et l'adhérence thérapeutique.",
        "Mettez en place un soutien psychosocial renforcé.",
        "Coordonnez avec l'équipe multidisciplinaire (cardiologue, psychologue, diététicien).",
        "Documentez tous les signes cliniques observés."
      ]
    }
  },

  famille: {
    excellent: {
      level: "🟢 Situation stable - Soutien régulier",
      color: "#4caf50",
      advice: [
        "L'état de santé du patient s'améliore bien.",
        "Continuez vos efforts de soutien et d'encouragement.",
        "Maintenez l'environnement familial stable et de soutien.",
        "Célébrez les progrès réalisés avec le patient.",
        "Restez vigilant à tout changement d'état."
      ]
    },
    bon: {
      level: "🟡 Situation satisfaisante - Suivi actif",
      color: "#ff9800",
      advice: [
        "L'état du patient est globalement bon avec une gestion adéquate.",
        "Encouragez une activité physique progressive et adaptée.",
        "Aidez le patient à suivre son régime alimentaire.",
        "Soutenez-le dans la prise régulière de ses médicaments.",
        "Maintenez une communication ouverte avec l'équipe médicale.",
        "Apprenez à reconnaître les signes d'alerte importants."
      ]
    },
    vigilance: {
      level: "🟠 Vigilance requise - Soutien renforcé",
      color: "#ff6f00",
      advice: [
        "Il y a des signes qui demandent plus d'attention et de soutien.",
        "Augmentez votre soutien émotionnel et pratique au quotidien.",
        "Assurez-vous que le patient prend correctement ses médicaments.",
        "Encouragez-le à maintenir une légère activité physique.",
        "Restez en contact régulier avec l'équipe infirmière/médicale.",
        "Aidez à la gestion du stress et des préoccupations du patient.",
        "Documentez tout changement symptomatique pour les professionnels."
      ]
    },
    critique: {
      level: "🔴 Risque élevé - Action urgente",
      color: "#d32f2f",
      advice: [
        "La situation de santé du patient est préoccupante et nécessite une action rapide.",
        "Alertez immédiatement l'infirmier ou le médecin.",
        "Appelez les secours (15/SAMU) ou allez aux urgences si :",
        "  • Douleur ou pression thoracique",
        "  • Essoufflement sévère ou au repos",
        "  • Perte de conscience ou malaise important",
        "  • Gonflement soudain des jambes ou du visage",
        "Assurez-vous de la prise régulière des médicaments.",
        "Maintenez le patient au repos si nécessaire.",
        "Restez près du patient et rassurez-le."
      ]
    }
  }
};

// Affichage du titre
document.getElementById("title").innerText = "Questionnaire - " + role.toUpperCase();

// Génération des questions
let container = document.getElementById("questions");

data[role].forEach((item, i) => {
  container.innerHTML += `
    <div class="q">
      <label for="q${i}">${i + 1}. ${item.question}</label>
      <small class="domain">${item.domain}</small>
      <div class="input-group">
        <input type="range" id="q${i}" min="0" max="3" value="0" class="slider">
        <span id="value${i}" class="value-display">0</span>
        <span class="scale-label">/3</span>
      </div>
      <div class="slider-labels">
        <span>Non</span>
        <span>Peu</span>
        <span>Moyen</span>
        <span>Oui/Beaucoup</span>
      </div>
    </div>
  `;
});

// Mise à jour dynamique de l'affichage des valeurs
document.querySelectorAll('.slider').forEach((slider, index) => {
  slider.addEventListener('input', (e) => {
    document.getElementById(`value${index}`).textContent = e.target.value;
  });
});

// Calcul du score et affichage des recommandations
function calculate() {
  let allFilled = true;
  let total = 0;

  for (let i = 0; i < data[role].length; i++) {
    const value = document.getElementById("q" + i).value;
    if (value === "" || value === "0") {
      allFilled = false;
    }
    total += parseInt(value || 0);
  }

  if (!allFilled) {
    alert("Veuillez répondre à toutes les questions avant de voir le résultat.");
    return;
  }

  let score = Math.round((total / (data[role].length * 3)) * 100);

  let level;
  if (score >= 75) {
    level = "excellent";
  } else if (score >= 55) {
    level = "bon";
  } else if (score >= 35) {
    level = "vigilance";
  } else {
    level = "critique";
  }

  let rec = recommendations[role][level];

  let resultHTML = `
    <div class="result-card" style="border-left: 5px solid ${rec.color};">
      <h3>${rec.level}</h3>
      <p class="score">Score : <strong>${score}/100</strong></p>
      <div class="advice-section">
        <h4>Recommandations :</h4>
        <ul>
  `;

  rec.advice.forEach(advice => {
    resultHTML += `<li>${advice}</li>`;
  });

  resultHTML += `
        </ul>
      </div>
    </div>
  `;

  document.getElementById("result").innerHTML = resultHTML;
}

// Fonction pour réinitialiser le questionnaire
function reset() {
  document.querySelectorAll('.slider').forEach((slider, index) => {
    slider.value = 0;
    document.getElementById(`value${index}`).textContent = "0";
  });
  document.getElementById("result").innerHTML = "";
}
