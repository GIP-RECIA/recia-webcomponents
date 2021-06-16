import oidc from "@uportal/open-id-connect";

async function getMediacentreRessources(
    ressourcesDiffusablesApiUrl,
    userInfoApiUrl
) {
    const options = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: 'Bearer ' + (await oidc({ userInfoApiUrl: userInfoApiUrl })).encoded,
            'content-type': 'application/jwt'
        }
    };

    return await fetch(
        ressourcesDiffusablesApiUrl,
        options
    ).then(
        (response) => {
            return response.json().then(
                value => {
                    if (response.status === 200) { // OK
                        return value.payload;
                    } else if (response.status === 400) { // BAD REQUEST
                        throw new Error('HTTP Response Code: ' + response.status + '; ' + value.payload.exceptionLocalizedMessage);
                    } else {
                        throw new Error('HTTP Response Code: ' + response.status);
                    }
                },
                error => {
                    throw error;
                }
            );
        },
        error => {
            throw error;
        }
    )
}

export { getMediacentreRessources }
