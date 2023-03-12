class ApiFeatures {
    //  this.query => Product.find()
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    // case sensitive
                    $options: "i",
                }
            }
            : {}
        //  console.log(keyword)
        this.query = this.query.find({...keyword})
        return this
    }

    filter() {

        const queryCopy = {...this.queryStr}
        // console.log('before remove', queryCopy)
        // remove fields from for category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key => delete queryCopy[key])
        //   console.log('after remove', queryCopy)
        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy)
     //   console.log('before price', queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
     //   console.log('after price', queryStr)
        return this
    }

    pagination(resultPerPage) {
        const currentPage =  Number(this.queryStr.page) || 1
        const skip =  resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

module.exports = ApiFeatures