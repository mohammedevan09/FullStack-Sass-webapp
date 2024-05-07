export function convertToOptions(jsonData) {
  const result = []

  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      const category = jsonData[key]

      category.forEach((item) => {
        result.push({
          value: item._id,
          label: item.title,
        })
      })
    }
  }

  return result
}
