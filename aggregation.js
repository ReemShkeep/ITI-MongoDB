const users = [
  { name: 'abc-egypt', country: 'Egypt', score: 15, bonus: 1 },
  { name: 'abc-uk', country: 'UK', score: 30, bonus: 2 },
  { name: 'abc-france', country: 'France', score: 10, bonus: 4 },
  { name: 'abc-usa', country: 'USA', score: 11, bonus: 6 },
  { name: 'abc-egypt', country: 'Egypt', score: 8, bonus: 3 },
  { name: 'abc-france', country: 'France', score: 7, bonus: 2 },
  { name: 'abc-france', country: 'France', score: 40, bonus: 15 },
  { name: 'abc-uk', country: 'UK', score: 5, bonus: 6 },
  { name: 'abc-usa', country: 'USA', score: 3, bonus: 8 },
  { name: 'abc-egypt', country: 'Egypt', score: 6, bonus: 9 },
]
db.users.insertMany(users);

const countries = [
  { _id: 'Egypt', continent: 'Africa' },
  { _id: 'USA', continent: 'North America' },
  { _id: 'UK', continent: 'Europe' },
  { _id: 'France', continent: 'Europe' },
]
db.countries.insertMany(countries);

{ name: 'abc-egypt', country: 'Egypt', score: 15, bonus: 1, myField: [{ _id: 'Egypt', continent: 'Africa' }] }

for (let usersIndex = 0; usersIndex < users.length; usersIndex++) {
  // 1. lookup another collection 'countries'
  for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
    // 2. If you found that users[index].country === countries[i]._id
    if (users[usersIndex].country === countries[countryIndex]._id) {
      // 3. push this document in a new field named 'myField'
      users[usersIndex].myField.push(countries[countryIndex])
    }
  }
}


db.users.find({}, {})

// var count = 0;
// var avg = 0;
// for (let i = 0; cursor.hasNext(); i++) {
//   // Accumulation
//  var d = document;
//   count = count + (document.score + document.bonus);
//  calculate avg;
// }

db.users.aggregate([
  {
    $group: {
      _id: '$country', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group.
      count: {
        $count: {}
      } 
    }
  }
])

db.users.aggregate([
  {
    $group: {
      _id: '$country', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group.
      scoreAvg: {
        $avg: '$score'
      } 
    }
  }
])

db.users.aggregate([
  {
    $group: {
      _id: '$country', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group.
      nameInFirstDocumentInGroup: {
        $first: '$name'
      } 
    }
  }
])

db.users.aggregate([
  {
    $group: {
      _id: '$country', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group.
      totalScore: {
        $sum: { $add: ['$score', '$bonus'] } // Think of it as add(valueOfScore, valueOfBonus) for this document.
      },
      avgScore: {
        $avg: '$score'
      }
    }
  },
  {
    $project: {
      // Show or hide fields from the input documents.
      // Transform data in the input documents.
      avgScore: { $round: ['$avgScore', 2] },
    }
  }
])

db.users.aggregate([
  {
    $group: {
      _id: '$country', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group.
      totalScore: {
        $sum: { $add: ['$score', '$bonus'] } // Think of it as add(valueOfScore, valueOfBonus) for this document.
      },
      avgScore: {
        $avg: '$score'
      }
    }
  },
  {
    $addFields: {
      // Show or hide fields from the input documents.
      // Transform data in the input documents.
      avgScore: { $round: ['$avgScore', 2] },
    }
  }
])

// Keep all documents in one group.
db.users.aggregate([
  {
    $group: {
      _id: 'null', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group. 
      count: {
        $avg: '$score'
      }
    }
  }
])

db.users.aggregate([
  {
    $group: {
      _id: '$country', // This is the field to group by its values. $country is an expression.
      // Accumulation operation to execute on each group.
      totalScore: {
        $sum: { $add: ['$score', '$bonus'] } // Think of it as add(valueOfScore, valueOfBonus) for this document.
      },
      avgScore: {
        $avg: '$score'
      }
    }
  },
  {
    $addFields: {
      // Show or hide fields from the input documents.
      // Transform data in the input documents.
      avgScore: { $round: ['$avgScore', 2] },
    }
  },
  {
    $sort: {
      avgScore: -1
    }
  },
  {
    $skip: 1
  },
  {
    $limit: 1
  }
])

db.users.aggregate([
  {
    $lookup: {
      from: 'countries',
      localField: 'country',
      foreignField: '_id',
      as: 'countries'
    }
  },
  {
    $project: {
      // continent = first(countries) // = countries[0]
      // arrayElemAt(countries, 0)
      continent: {
        $getField: {
          input: { $first: '$countries' },
          field: 'continent'
        }
      },
      name: 1
    }
  }
])

// const continent = getField({
//   input: first(countries),
//   field: 'continent'
// });
// continent: {
//   $getField: {
//     input: { $first: '$countries' },
//     field: 'continent'
//   }
// }


// Think of this as a function
// { <operator>: [ <argument1>, <argument2> ... ] } // output is the return of the function

// Declarative Language vs Imperative Language.
select * from table where condition groupby ;