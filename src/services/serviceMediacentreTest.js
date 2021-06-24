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
                idRessource: 'id_' + i,
                titre: 'Titre',
                typePresentation: 'Type présentation',
                nomEditeur: 'Nom éditeur',
                description: 'Description',
                lien: i % 2 === 0 ? 'https://lycees.netocentre.fr/portail/api/ExternalURLStats?fname=MEMOIRECICLIC&service=http://memoire.ciclic.fr/' : 'https://www.youtube.com/channel/UCPithPDiY2KKp3EwgbhVXiw/featured',
                backgroundImageUrl: i % 2 === 0 ? 'http://memoire.ciclic.fr/themes/ciclic/images/logo-memoire.png' : 'https://lycees.netocentre.fr/files/esupLecture/autres_ressources/images/ScienceOnTourne.jpg',
                favorite: false
            }
        );
    }

    return new Promise(
        (resolve) => {
            resolve(ressources)
        }
    );
}

async function addFavorite(
    idRessource
) {
    console.log('Add to favorite: ' + idRessource)
}

async function removeFavorite(
    idRessource
) {
    console.log('Remove from favorite: ' + idRessource);
}

export { getMediacentreRessources, addFavorite, removeFavorite }
