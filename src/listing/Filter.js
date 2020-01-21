class Filter {
  constructor(element, listing) {
    this.element = element
    this.listing = listing

    this.onClick = this.onClick.bind(this)
    this.element.addEventListener('click', this.onClick)

    this.onInit()
  }

  /**
   * Get the category param from this.listing in array format
   */
  parseCategory() {
    if (this.listing.config.category === 0) {
      return []
    }

    return this.listing.config.category.split(',')
  }

  /**
   * Take categories in array format and insert them into this.listing in the proper format
   */
  serializeCategory(list = []) {
    if (!list.length) {
      this.listing.config.category = 0

      return this.listing.config.category
    }

    return list.join(',')
  }

  /**
   * Used to determine what to do if there's other types of filters in the future.
   */
  getFilterTarget() {
    const filterTarget = this.element.getAttribute(`data-filtertarget`)

    return filterTarget
  }

  /**
   * Get value from the data attr
   */
  getValue() {
    const filterTarget = this.getFilterTarget()
    const value = this.element.getAttribute(`data-${filterTarget}`)

    return value
  }

  /**
   * Initialize filter. this.listing.config may be preconfigured and contain filters.
   */
  onInit() {
    const filterTarget = this.getFilterTarget()
    const value = this.getValue()

    switch (filterTarget) {
      case 'category': {
        const categories = this.parseCategory()

        if (categories.indexOf(value) > -1) {
          this.element.classList.add('active')
        }

        break
      }

      default: {
        console.log('Unhandled filter type')
        break
      }
    }
  }

  /**
   * Click handler for the filter.
   */
  onClick() {
    const isActive = this.element.classList.contains('active')
    const filterTarget = this.getFilterTarget()
    const value = this.getValue()

    this.element.classList.toggle('active')
    this.element.blur()

    switch (filterTarget) {
      case 'category': {
        const categories = this.parseCategory()

        if (isActive) {
          // Remove data from config
          categories.splice(categories.indexOf(value), 1)
          this.listing.config.category = this.serializeCategory(categories)
        } else {
          // Activate!
          categories.push(value)
          this.listing.config.category = this.serializeCategory(categories)
        }

        break
      }

      default: {
        console.log('Unhandled filter type')
        break
      }
    }

    this.listing.config.page = 1 // Changing a filter restarts the pagination
    this.listing.hideLoadMore()
    this.listing.removeAll()
    this.listing.setDataAttrs()
    this.listing.load()
      .then(() => this.listing.setURL())
  }
}

export default Filter