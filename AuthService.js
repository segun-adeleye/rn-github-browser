import buffer, { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        return cb(err);
      }

      if (!val) {
        return cb();
      }

      let zippedObject = _.fromPairs(val);
      if (!zippedObject[authKey]) {
        return cb();
      }

      let authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObject[authKey]
        },
        user: JSON.parse(zippedObject[userKey])
      }
      return cb(null, authInfo);
    })
  }

  login(creds, cb) {
    let b = new Buffer(creds.username + ':' + creds.password);
    let encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw {
        badCredentials: response.status == '401',
        unknownError: response.status != '401'
      }
    })
    .then(response => response.json())
    .then(results => {
      AsyncStorage.multiSet([
        [authKey, encodedAuth],
        [userKey, JSON.stringify(results)]
      ], err => {
        if (err) {
          throw err;
        }
        return cb({success: true});
      });
    })
    .catch(err => cb(err));
  }
}

module.exports = new AuthService();
