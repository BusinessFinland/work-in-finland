import Listing from './listing/index'

function main() {
  const listingElements = document.querySelectorAll('.jwif-listing')

  const listings = Array.prototype.map.call(listingElements, (listing)  => {
    return new Listing(listing)
  });
}

main();