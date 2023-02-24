// mongosh "mongodb+srv://@cluster0.jbvn3.mongodb.net/m201"


const arr = db.people.find({ }).toArray();

{
  'fieldName': {
    '$operator': valueOrObject
  },
  anotherField: {
    $operator: valueOrObject
  }
}

// Equivalent
{ first_name: { $eq: 'Joseph' } }
{ first_name: 'Joseph'  }

// Query Operators
$eq
$ne
$gt
$gte
$lt
$lte

// Logical Operators

{
  $logical: [
    { fieldName: { $queryOperator: '' } },
    { fieldName: { $queryOperator: '' } },
  ]
}

db.people.count({
  $or: [
    { first_name: { $eq: 'Joseph' } },
    { num: { $ne: 15 } },
  ]
})

// Equivalent
db.people.count({
  $and: [
    { first_name: { $eq: 'Joseph' } },
    { num: { $ne: 15 } },
  ]
})
db.people.count({
  first_name: { $eq: 'Joseph' },
  num: { $ne: 15 },
})

db.people.count({
  first_name: { $not: { $eq: 'Joseph' } }
})

db.people.count({
  first_name: { $type: 'string' }
})

// Projection
{
  num: 1,
  first_name: 1
}

db.people.find({}, { last_name: 1, first_name: 1, _id: 0 })


// Equivalent
db.people.find({ interests: 'football' }) // interests === 'football' || interests.includes('football');
db.people.find({ interests: { $elemMatch: { $eq: 'football' } } })

{
  arrayField: {
    $elemMatch: {
      $operator: value
    }
  }
}

db.people.countDocuments({ interests: { $in: ['football', 'movies'] } }) 
interests.includes('football') || interests.includes('movies');

db.people.find({ relatives: { $elemMatch: {
  name: 'abc',
  age: { $gt: 5 }
} } })

db.people.find({ 'relatives.name': 'abc', 'relatives.age': 5 })

Atlas atlas-h7j5vf-shard-0 [primary] m201> db.people.countDocuments({ 'relatives.name': 'abc', 'relatives.age': 15 }) // Not necessarily both exist in the same object
92
Atlas atlas-h7j5vf-shard-0 [primary] m201> db.people.countDocuments({ relatives: { $elemMatch: { name: 'abc', age: 15 } } }) // Both conditions must be in the same object.
0
Atlas atlas-h7j5vf-shard-0 [primary] m201> 

db.users.insertMany([{ name: 'before' }, { _id: 'a', name:' b' }, { name: 'd' }], { ordered: true })
db.users.insertOne({ name: 'a' })
db.users.insertOne({ _id: 1, name: 'a' });

// Update
$set
$unset
$inc

db.users.updateOne({ field: { $queryOperator: value }}, {
  $updateOperator: {
    field: value
  } 
})

// Arrays
$push
$pull
$pop 1 / -1

db.users.updateOne({}, {
  $updateOperator: {
    field: value
  } 
})

// Nested document
db.users.updateOne({}, {
  $updateOperator: {
    'field.field': value
  } 
})

db.people.updateMany({ _id: ObjectId("57d7a122fa937f710a7d4948") }, { $set: { 'address.country': 15 } })

// Array of documents
db.users.updateOne({}, {
  $updateOperator: {
    'field.$.field': value
  } 
})

db.people.updateMany({ relatives: { $exists: true }}, { $set: { 'relatives.$.nationality': 'unknown' }})
db.people.updateMany({ relatives: { $exists: true }}, { $unset: { 'relatives.$.nationality': '' }})

// Delete
db.people.deleteOne({}, {})
db.people.deleteMany({}, {})

// Indexes
{ key: { _id: 1 }, name: '_id_' }

// Compound Index
// Order by category then by name
Astronomy:
  - a
  - b
  - c

Biology: 
  - a
  - b
  - c

// Order by first name then by last name
{ firstName: 1, lastName: 1 }
last_name: C
Ahmed:
- Ahmed
- B
- C

Belal: 
- Ahmed
- B
- C

C:

D:

E:

// Compound Index can only be used if the search fields are a prefix of the index fields.
{ firstName: 1, lastName: 1, dateOfBirth: 1, country: 1 }

// These are the prefixes the use the index
{ firstName: '' }
{ firstName: 1, lastName: 1 }
{ firstName: 1, lastName: 1, dateOfBirth: 1 }
{ firstName: 1, lastName: 1, dateOfBirth: 1, country: 1 }

// Multi-Key Index: Index on an array field
{ interests: 1 }
// Cannot create a compound index with multiple array fields
{ interests: 1, relatives: 1 } // Errors

{
  name: "text"
}


{
  description: 'asdf ads fafasd  a sdf sdfsd'
}

db.people.find({ last_name: 'adsfdsa' }).explain();


{
  arr: ['1', '2', '3']
}

{
  relatives: [{
    name: 'abc',
    age: 15,
  }]
}

db.people.find({
  arr: '2' 
}, {
  /* projection operators */
})

db.people.countDocuments({ relatives: { 
  $elemMatch: { 
    name: 'abc', 
    age: { $gte: 15 } 
  } 
} 
})

db.coll.updateOne({/* query operators */}, { /* update operators */ }, { 
  writeConcern: {
    w: 'majority'
  } // on how many nodes should I write the changes before returning acknowledged?
})
const s = db.coll.find({}, {})
s.explain();

var count = 0;
for (let i = 0; cursor.hasNext(); i++) {
  // Accumulation
  count++
}

