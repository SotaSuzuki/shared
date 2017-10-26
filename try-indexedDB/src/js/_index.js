var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

console.log(indexedDB) // => IDBFactory {}

// Open the database
var open = indexedDB.open('MyDatabase', 1)

console.log(open) // => IDBOpenDBRequest { many }

// Create the schema
open.onupgradeneeded = function () {
  var db = open.result
  var store = db.createObjectStore('MyObjectStore', { keyPath: 'id' })
  var index = store.createIndex('NameIndex', ['name.last', 'name.first'])
}

open.onsuccess = function () {
  // console.log(open.result)
  var db = open.result
  var tx = db.transaction('MyObjectStore', 'readwrite')
  console.log(tx)

}

// open.onsuccess = function () {
//   var db = open.result
//   var tx = db.transaction('MyObjectStore', 'readwrite')
//   var store = tx.objectStore('MyObjectStore')
//   var index = store.index('NameIndex')

//   store.put({ id: 123, name: { first: 'John', last: 'Doe' }, age: 20 })
//   store.put({ id: 456, name: { first: 'Pole', last: 'Eque' }, age: 21 })

//   var getJohn = store.get(123)
//   var getPole = index.get(['Eque', 'Pole'])

//   getJohn.onsuccess = function () {
//     console.log(getJohn.result.name.first)
//   }

//   getPole.onsuccess = function () {
//     console.log(getPole.result.name.first)
//   }

//   tx.oncomplete = function () {
//     db.close()
//   }
// }
