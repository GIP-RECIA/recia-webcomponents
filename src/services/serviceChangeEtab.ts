import oidc from '@uportal/open-id-connect'
import axios from 'axios'

const getToken = async (userInfoApiUrl: string): Promise<string | undefined> => {
  try {
    const { encoded, decoded } = await oidc({
      userInfoApiUrl: userInfoApiUrl
    })
    return encoded
  } catch (error) {
    console.error('error: ', error)
  }
}

const getChangeEtab = async (url: string, userInfoApiUrl: string) => {
  return await axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt'
    }
  })
}

export { getChangeEtab }
