import { FilterQuery, Query } from 'mongoose';

// Function to apply search
const applySearch = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
  searchableFields: string[]
): Query<T[], T> => {
  const searchTerm = query?.searchTerm as string;
  if (searchTerm) {
    modelQuery = modelQuery.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>
      ),
    });
  }
  return modelQuery;
};

// Function to apply filtering
const applyFilter = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>
): Query<T[], T> => {
  const queryObj = { ...query };
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);
  return modelQuery.find(queryObj as FilterQuery<T>);
};

// Function to apply sorting
const applySort = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>
): Query<T[], T> => {
  const sort = (query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
  return modelQuery.sort(sort);
};

// Function to apply pagination
const applyPagination = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>
): Query<T[], T> => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  return modelQuery.skip(skip).limit(limit);
};

// Function to apply field selection
const applyFields = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>
): Query<T[], T> => {
  const fields = (query?.fields as string)?.split(',')?.join(' ') || '-__v';
  return modelQuery.select(fields);
};

// Function to calculate total documents and pages
const countTotal = async <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>
) => {
  const totalQueries = modelQuery.getFilter();
  const total = await modelQuery.model.countDocuments(totalQueries);
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const totalPage = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPage,
  };
};

// Example usage
const buildQuery = async <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
  searchableFields: string[]
) => {
  modelQuery = applySearch(modelQuery, query, searchableFields);
  modelQuery = applyFilter(modelQuery, query);
  modelQuery = applySort(modelQuery, query);
  modelQuery = applyPagination(modelQuery, query);
  modelQuery = applyFields(modelQuery, query);

  const totalStats = await countTotal(modelQuery, query);

  return {
    query: modelQuery,
    totalStats,
  };
};

export {
  applySearch,
  applyFilter,
  applySort,
  applyPagination,
  applyFields,
  countTotal,
  buildQuery,
};
