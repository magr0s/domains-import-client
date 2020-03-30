import APP_CONFIG from 'src/configs/app'

const {
  FIREBASE_API,
  API_VERSION
} = APP_CONFIG

class Utils {
  static makeURL (path) {
    return `${FIREBASE_API}/${API_VERSION}/${path}`
  }
}

export default Utils
