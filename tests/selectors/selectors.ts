export const selectors = {
    navbarElements: '.navbar-nav li',
    withText: (element: string) => `//*[text()="${element}"]`,
    elementWithId: (element: string) => `#${element}`,
    homePageCarousel: '.carousel-indicators li',
    homePageBrandNames: '.brands-name li',
    homePageProducts: '.single-products',
    withHref: (element: string) => `//*[@href="${element}"]`,
    ancestorWithClass: (className: string) => `//ancestor::div[@class="${className}"]`,
    parent: (element?: string) => element ? `//parent::${element}` : `//parent::*`,
    productOverlayOnHover: '.overlay-content',
    continueShopping: '[data-dismiss="modal"]',
    productsDescriptionInCart: '.cart_description',
    adsPopup: '.shadow-root',
    apiTestsHeading: '.panel-heading a',
    testDetailsContainer: '[id^="collapse"]',
    testDetailsItems: '.list-group-item'
}

