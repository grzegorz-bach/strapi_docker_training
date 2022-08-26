const { faker } = require("@faker-js/faker");

module.exports = {
  categories: async (strapi, ammount) => {
    console.error("***SEEDING CATEGORIES***\n");
    Array(ammount)
      .fill("")
      .forEach(() => {
        strapi.entityService.create(
          "api::category.category",
          {
            data: {
              name: faker.commerce.department(),
            },
          }
        );
      });
  },
  products: (strapi, ammount) => {
    console.error("***SEEDING PRODUCTS***\n");
    strapi.entityService.findMany("api::category.category").then(categories => {
      Array(ammount)
      .fill("")
      .forEach((_, i) => {
        strapi.entityService.create("api::product.product", {
          data: {
            name: faker.commerce.productName(),
            code: `STRP-${String(i).padStart(4, 0)}`,
            price: Number(faker.commerce.price(1, 1000, 2)),
            category:
              categories[Math.floor(Math.random() * (categories.length - 1))],
          },
        });
      });
    })
  }
};
