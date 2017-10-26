const STORES = Object.freeze({
  USERS: 'users'
});

const TRANSACTION = Object.freeze({
  MODE: {
    READ_ONLY: 'readonly',
    READ_WRITE: 'readwrite',
    VERSION_CHANGE: 'versionchange'
  }
});

class IndexedDB {
  constructor ({ dbName, version }) {
    this.STORES = STORES
    this.TRANSACTION = TRANSACTION
    this.dbName = dbName
    this.version = version
    this.db = null
    this.open({
      error () {
        console.error('エラーだよ@initialize')
      }
    })
  }
  static hasIndexDB() {
    return 'indexedDB' in window;
  }

  // Open db
  open ({ error }) {
    const request = window.indexedDB.open(this.dbName, this.version)

    request.addEventListener('error', (err) => {
      console.error(err)
      error(err)
    }, false)

    request.addEventListener('upgradeneeded', (event) => {
      console.info('upgrade db')
      const db = event.target.result
      const os = db.createObjectStore(this.STORES.USERS, {
        autoIncrement: true
      })
      os.createIndex('name', 'name', { unique: false })
      os.createIndex('email', 'email', { unique: true })
    }, false)

    request.addEventListener('success', (event) => {
      console.info('request success')
      this.db = event.target.result
      this.db.addEventListener('error', (err) => {
        console.error(`Database error: ${err.target.errorCode}`)
      }, false)
    }, false)
  }

  // Write into the DB
  write ({ objectName, value }) {
    const transaction = this.db.transaction([objectName], this.TRANSACTION.MODE.READ_WRITE)

    transaction.addEventListener('complete', () => {
      console.info('write done')
    }, false)

    transaction.addEventListener('error', () => {
      console.error('write error@write')
    }, false)

    const os = transaction.objectStore(objectName)
    const request = os.add(value)
    request.addEventListener('success', (event) => {
      console.info('write success')
      console.info(`ID: ${event.target.result}`)
    })
  }

  // Read from the DB
  read ({ objectName, key }) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([objectName])
      const os = transaction.objectStore(objectName)
      const request = os.get(key)
      request.addEventListener('success', (event) => {
        resolve(event.target.result)
      })
      request.addEventListener('error', (event) => {
        reject(event)
      })
    })
  }
}

const data = {
  indexedDB: null
}

const funcs = {
  init () {
    if (IndexedDB.hasIndexDB()) {
      data.indexedDB = new IndexedDB({
        dbName: 'my-sample-db',
        version: 2
      })
    }
  },
  save ({ name, email }) {
    if (data.indexedDB !== null) {
      const user = { name, email }
      data.indexedDB.write({
        objectName: data.indexedDB.STORES.USERS,
        value: user
      })
    }
  },
  get (id) {
    if (data.indexedDB !== null) {
      data.indexedDB.read({
        objectName: data.indexedDB.STORES.USERS,
        key: id
      })
      .then((result) => {
        document.querySelector('#users').innerHTML = `
          <tr>
            <td>${result.name}</td>
            <td>${result.email}</td>
          </tr>
        `
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }
}

const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const saveBtn = document.querySelector('#save')
const getBtn = document.querySelector('#get-user')
const inputId = document.querySelector('#user-id')

saveBtn.addEventListener('click', () => {
  const name = nameInput.value
  const email = emailInput.value
  funcs.save({ name, email })
}, false)

getBtn.addEventListener('click', () => {
  funcs.get(Number(inputId.value))
}, false)

// Initialize
funcs.init()
