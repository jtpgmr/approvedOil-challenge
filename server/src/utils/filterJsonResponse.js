import _ from "lodash";

const filterObject = (mongoDoc, omitDataArray) => {
  const filteredResponse = _.omit(mongoDoc.toObject(), omitDataArray)

  return filteredResponse
}

const filterArrayOfObjects = (mongoObj, omitDataArray) => {
  const filteredResponse =  mongoObj.map(doc => {
      return _.omit(doc.toObject(), omitDataArray)
  })

  return filteredResponse
}

export { filterObject, filterArrayOfObjects }