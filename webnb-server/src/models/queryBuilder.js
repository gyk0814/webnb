const DEFAULT_LIMIT = 20;
const DEFAULT_PAGE = 1;

const createSqlFilterQuery = async (
  categoryId,
  locationId,
  minPrice,
  maxPrice,
  sortBy,
  limit = DEFAULT_LIMIT,
  page = DEFAULT_PAGE
) => {
  const getByCategory = async (categoryId) => {
    return `category_id = ${categoryId}`;
  };
  const getByLocation = async (locationId) => {
    return `location_id  = ${locationId}`;
  };
  const ordering = async (sortBy) => {
    switch (sortBy) {
      case "priceASC":
        return `ORDER BY r.price ASC, r.id ASC`;
      case "priceDESC":
        return `ORDER BY r.price DESC, r.id ASC`;
      case "newest":
        return `ORDER BY r.created_at DESC, r.id ASC`;
      default:
        return `ORDER BY r.id`;
    }
  };
  const pagination = async (limit, page) => {
    const offset = (page - 1) * limit;
    return `LIMIT ${limit} OFFSET ${offset}`;
  };

  const priceRange = async (minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) return `r.price>=0`;

    if (minPrice === 0) return `(r.price>=0 AND r.price<${maxPrice})`;

    return `(r.price>=${minPrice} AND r.price<${maxPrice})`;
  };

  let whereQuery = `where `;
  if (categoryId && locationId) {
    const categoryQuery = await getByCategory(categoryId);
    const locationQuery = await getByLocation(locationId);
    whereQuery += categoryQuery + " AND " + locationQuery + " AND ";
  } else if (categoryId) {
    const categoryQuery = await getByCategory(categoryId);
    whereQuery += categoryQuery + " AND ";
  } else if (locationId) {
    const locationQuery = await getByLocation(locationId);
    whereQuery += locationQuery + " AND ";
  }

  const orderingQuery = await ordering(sortBy);
  const priceRangeQuery = await priceRange(minPrice, maxPrice);
  const pageQuery = await pagination(limit, page);

  return { whereQuery, orderingQuery, priceRangeQuery, pageQuery };
};

module.exports = {
  createSqlFilterQuery,
};
