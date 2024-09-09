export const buildSearchQuery = (searchTerm: any, fields = []) => {
    if (!searchTerm || fields.length === 0) return {};
  
    const regex = { $regex: searchTerm, $options: "i" };
    const orConditions = fields.map((field) => ({ [field]: regex }));
  
    return {
      $or: orConditions,
    };
  };
  
  export const parseQueryParams = (searchParams: any) => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const category = searchParams.get("category") || "";
    const catId = searchParams.get("catId") || "";
  
    return {
      page: page > 0 ? page : 1,
      pageSize: pageSize > 0 ? pageSize : 10,
      sortBy,
      sortOrder: sortOrder === "desc" ? -1 : 1,
      category,
      catId
    };
  };