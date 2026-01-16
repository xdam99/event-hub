// N'est pas encore utilisé car on ne lit pas encore les données de l'utilisateur
// Dans un UseCase, ça arrivera après avec getProfile
export const sanitizeUser = (user: any ) => {
    const {password, salt, ...safeData} = user
    return safeData;
}