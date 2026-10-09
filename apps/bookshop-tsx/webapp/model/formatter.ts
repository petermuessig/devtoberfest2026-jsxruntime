const formatter = {
  inputLowerThanStock(stock: number, input: number): boolean {
    if (stock === undefined || input === undefined) {
      return false;
    }
    return input < stock;
  },

  stockState(stock: number): string {
    if (stock >= 20) return "Success";
    if (stock > 0) return "Warning";
    return "Error";
  }
};

export default formatter;
