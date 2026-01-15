
export const sanitizeUser = (user: any ) => {
    const {password, salt, ...safeData} = user
    return safeData;
}