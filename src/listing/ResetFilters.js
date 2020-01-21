import Filter from './Filter'

class ResetFilters extends Filter {
  onInit() {}

  onClick() {
    this.element.blur()

    this.listing.filters.forEach(filter => {
      filter.element.classList.remove('active')
    })

    this.listing.config.category = 0
    this.listing.setDataAttrs()
    this.listing.setURL()
    this.listing.removeAll()
    this.listing.load()
  }
}

export default ResetFilters
