import Filter from './Filter'
import ResetFilters from './ResetFilters'

class Listing {
  routerBase = '#jwif-listing?'

  constructor(element) {
    this.element = element
    this.container = this.element.querySelector('.jwif-listing__jobs')
    this.filters = this.element.querySelectorAll('.jwif-listing__filter')
    this.config = {
      ...this.getDataAttrs()
    }


    /**
     * Check if the URL has params and overwrite config if necessary
     */
    const urlParams = this.parseURL()

    if (urlParams) {
      Object.keys(urlParams).forEach(k => {
        this.config[k] = urlParams[k]
      })

      this.setDataAttrs()
      this.removeAll()
      this.load()
    }

     /**
     * Initialize pagination if it exists
     */
    if (this.config.totalPages > 1) {
      this.loadMoreEl = this.element.querySelector('.jwif-listing__more--button')
      this.loadMoreEl.addEventListener('click', this.loadMore)
    }


    /**
     * Initialize filters if they exist
     */
    if (this.filters.length) {
      this.filters = Array.prototype.map.call(this.filters, (filter)  => {
        if (filter.classList.contains('jwif-listing__filter--reset')) {
          return new ResetFilters(filter, this)
        } else {
          return new Filter(filter, this)
        }
      });
    }
  }

  /**
   * Remove all jobs from the listing. If you want to animate the remove, add a class
   * and use setTimeout for each element.
   */
  removeAll() {
    const elements = this.container.querySelectorAll('.jwif-listing__job, h2')

    Array.prototype.forEach.call(elements, (el)  => {
      el.parentNode.removeChild(el)
    })
  }

  /**
   * Load jobs with the values in this.config
   */
  load() {
    const data = {
      action: 'jwif_loadmore',
      ...this.config,
    }
    const { adminAJAX, noResultsText } = window.jwif

    const body = new FormData();

    Object.keys(data).forEach(k => {
      body.append(k, data[k])
    })

    return fetch(adminAJAX, {
      method: 'POST',
      body,
    })
      .then(r => {
        const { headers } = r
        const [total, totalPages] = [
          headers.get('X-Total'),
          headers.get('X-Total-Pages')
        ]

        this.config.total = parseInt(total, 10)
        this.config.totalPages = parseInt(totalPages, 10)

        if (this.config.total === 0) {
          const noResults = document.createElement('h2')
          noResults.classList.add('jwif-listing__jobs__none')
          noResults.innerText = noResultsText

          this.container.appendChild(noResults)
        }

        if (this.config.page >= this.config.totalPages) {
          this.hideLoadMore()
        } else {
          this.showLoadMore()
        }

        return r.text()
      })
      .then(r => {
        this.container.insertAdjacentHTML('beforeend', r)
        this.setDataAttrs()
      })
      .catch(e => {
        console.error('Something went wrong while getting more jobs', e)
      })
  }

  showLoadMore() {
    if (this.loadMoreEl) {
      this.loadMoreEl.classList.remove('hidden')
    }
  }

  hideLoadMore() {
    if (this.loadMoreEl) {
      this.loadMoreEl.classList.add('hidden')
    }
  }

  /**
   * Load the next page of jobs
   */
  loadMore = () => {
    this.config.page++

    this.loadMoreEl.classList.add('loading')
    this.load()
      .then(() => {
        this.setURL()
        this.loadMoreEl.classList.remove('loading')
      })
      .catch((e) => {
        this.loadMoreEl.classList.remove('loading')
      })
  }

  /**
   * Get this.config values from this.element
   */
  getDataAttrs() {
    return {
      region: parseInt(this.element.getAttribute('data-region'), 10),
      category: parseInt(this.element.getAttribute('data-category'), 10),
      total: parseInt(this.element.getAttribute('data-total'), 10),
      totalPages: parseInt(this.element.getAttribute('data-totalpages'), 10),
      page: parseInt(this.element.getAttribute('data-page'), 10),
      perPage: parseInt(this.element.getAttribute('data-perpage'), 10),
    }
  }

  /**
   * Write this.config to the this.element
   */
  setDataAttrs() {
    const attrs = this.config

    Object.keys(attrs).forEach(k => {
      this.element.setAttribute(`data-${k.toLowerCase()}`, attrs[k])
    })
  }

  /**
   * Set the URL from params in this.config
   */
  setURL() {
    const { category, page } = this.config

    let url = this.routerBase

    if (category !== 0) {
      url = `${url}category=${category}&`
    }

    if (page > 1) {
      url = `${url}page=${page}`
    }

    window.location.hash = url.replace(/\&+$/,'')
  }

  /**
   * Parse values from the URL.
   */
  parseURL() {
    const url = window.location.hash.replace(this.routerBase, '')

    if (url) {
      const options = url.split('&').reduce((acc, part) => {
        let [k, v] = part.split('=');

        if (k === 'page') {
          v = parseInt(v, 10)
        }

        acc[k] = v

        return acc
      }, {})

      return options
    }

    return false
  }
}

export default Listing