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
                idRessource: i,
                titre: 'Titre',
                typePresentation: 'Type présentation',
                nomEditeur: 'Nom éditeur',
                description: 'Description',
                lien: i % 2 === 0 ? '' : 'https://www.youtube.com/channel/UCPithPDiY2KKp3EwgbhVXiw/featured',
                backgroundImageUrl: i % 2 === 0 ? 'http://memoire.ciclic.fr/themes/ciclic/images/logo-memoire.png' : 'https://lycees.netocentre.fr/files/esupLecture/autres_ressources/images/ScienceOnTourne.jpg',
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
