# sympa

## page-sympa

### Propriétés

| Nom               |   Type   | Obligatoire |           Default            | Description                                                                                 |
| ----------------- | :------: | :---------: | :--------------------------: | ------------------------------------------------------------------------------------------- |
| `api-url`         | `String` |   `false`   | `/sympa-api/api/sympa/lists` | Url pour la récupération des listes dont l'utilisateur est abonné, éditeur, ou propriétaire |
| `timeout-default` | `number` |   `false`   |           `30000`            | Timeout (en millisecondes) pour la majorité des requêtes                                    |

## page-admin-sympa

### Propriétés

| Nom                   |   Type   | Obligatoire |                         Default                         | Description                                                                                                       |
| --------------------- | :------: | :---------: | :-----------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------- |
| `api-url-lists`       | `string` |   `false`   |           `/sympa-api/api/admin-sympa/lists`            | Url pour la récupération des listes existantes et des listes pouvant être créées                                  |
| `api-url-form-data`   | `string` |   `false`   | `/sympa-api/api/admin-sympa/createOrUpdateListFormData` | Url pour la récupération des groupes à afficher dans le formulation de création/modification de liste             |
| `api-url-tree-data`   | `string` |   `false`   |    `/sympa-api/api/admin-sympa/additionalGroupsTree`    | Url pour la récupération des groupes additionels à afficher dans le formulation de création/modification de liste |
| `api-url-create-list` | `string` |   `false`   |         `/sympa-api/api/admin-sympa/createList`         | Url pour l'envoi de requête de création de liste                                                                  |
| `api-url-update-list` | `string` |   `false`   |         `/sympa-api/api/admin-sympa/updateList`         | Url pour l'envoi de requête de modification de liste                                                              |
| `api-url-close-list`  | `string` |   `false`   |         `/sympa-api/api/admin-sympa/closeList`          | Url pour l'envoi de requête de fermeture de liste                                                                 |
| `timeout-default`     | `number` |   `false`   |                         `30000`                         | Timeout (en millisecondes) pour la majorité des requêtes                                                          |
| `timeout-sympa`       | `number` |   `false`   |                         `60000`                         | Timeout (en millisecondes) pour les requêtes à destination de sympa remote, qui peut être long à répondre'        |
