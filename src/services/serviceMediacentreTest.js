async function getMediacentreRessources(
    ressourcesDiffusablesApiUrl,
    userInfoApiUrl
) {
    console.log(
        {
            ressourcesDiffusablesApiUrl: ressourcesDiffusablesApiUrl,
            userInfoApiUrl: userInfoApiUrl
        }
    );

    let ressources = [];

    for (let i = 0; i < 100; i++) {
        ressources.push(
            {
                idRessource: i
            }
        );
    }

    return new Promise(
        (resolve) => {
            resolve(ressources)
        }
    );
}

export { getMediacentreRessources }
