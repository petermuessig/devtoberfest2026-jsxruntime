const cds = require('@sap/cds')

module.exports = class CatalogService extends cds.ApplicationService {
  init() {
    const { Books } = this.entities

    this.on('submitOrder', async (req) => {
      const { book, quantity } = req.data
      let { stock } = await SELECT.one`stock`.from(Books, book)
      if (stock < quantity) return req.reject(409, `${quantity} exceeds stock for book #${book}`)
      await UPDATE(Books, book).with({ stock: stock -= quantity })
      await this.emit('OrderedBook', { book, quantity, buyer: req.user.id })
      return { ID: book, stock }
    })

    return super.init()
  }
}
