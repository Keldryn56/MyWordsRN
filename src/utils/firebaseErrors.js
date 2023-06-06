const firebaseErrors = [
    {
        code: "auth/email-already-exists",
        message: "Adresse e-mail déjà utilisée",
        type: "info"
    },
    {
        code: "auth/email-already-in-use",
        message: "Vous êtes déjà inscrit avec cette adresse email",
        type: "info"
    },
    {
        code: "auth/internal-error",
        message: "Erreur de connexion interne",
        type: "danger"
    },
    {
        code: "auth/invalid-credential",
        message: "Identifiants invalides",
        type: "danger"
    },
    {
        code: "auth/invalid-display-name",
        message: "Nom d'utilisateur invalide",
        type: "danger"
    },
    {
        code: "auth/invalid-email",
        message: "Le format de l'adresse email est invalide",
        type: "danger"
    },
    {
        code: "auth/invalid-password",
        message: "Le format du mot de passe est incorrect",
        type: "danger"
    },
    {
        code: "auth/operation-not-allowed",
        message: "Opération non autorisée",
        type: "danger"
    },
    {
        code: "auth/session-cookie-expired",
        message: "Session expirée, veuillez vous reconnecter",
        type: "danger"
    },
    {
        code: "auth/wrong-password",
        message: "Mot de passe incorrect",
        type: "danger"
    },
    {
        code: "auth/user-not-found",
        message: "Utilisateur introuvable",
        type: "danger"
    }
]

export const getFirebaseMessage = (code) => {

    let err = firebaseErrors.filter((el) => el.code == code )

    if(err.length == 0){
        err = [
            {
                code: "unknown-error",
                message: "Une erreur est survenue. Veuillez rééesayer ultérieurement", 
                type: "danger"
            }
        ]
    }

    return err[0] 
}