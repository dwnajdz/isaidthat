import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { Listing } from "@/components/startups/Listing";

/**
 * Generates a SQL wildcard pattern for querying based on the provided string.
 * If the string includes 'All', returns '%%' to match any result.
 * Otherwise, returns a pattern that matches any result containing the provided string.
 * @param {string} searchString - The string used to generate the SQL wildcard pattern.
 * @returns {string} - The SQL wildcard pattern for the given search criteria.
 */
function generateSQLWildcardPattern(searchString: string | null): string {
  if (searchString === null || searchString === undefined) return "%%";

  if (searchString.includes('Wszystkie') || searchString.includes('Liczba')) {
    // Return '%%' to match any result when 'Wszystkie' is provided.
    return "%%";
  } else {
    // Return a pattern that matches any result containing the provided string.
    return `%${searchString}%`;
  }
}

export default async function Search({
  searchParams,
}: {
  searchParams: any
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const extractMinMax = (param: string, defaultValue: number[]) => [
    Number(searchParams?.[param]?.[0] ?? defaultValue[0]),
    Number(searchParams?.[param]?.[1] ?? defaultValue[1]),
  ];

  const [minProfit, maxProfit] = extractMinMax('m_profit', [0, 100000]);
  const [minPrice, maxPrice] = extractMinMax('asking_price', [0, 100000]);

  const { data: queryResults, error } = await supabase
    .from('startups')
    .select('*')
    .ilike('industry', generateSQLWildcardPattern(searchParams['industry[name]']))
    .ilike('business_type', generateSQLWildcardPattern(searchParams['business_type[name]']))
    .like('n_employees', generateSQLWildcardPattern(searchParams['n_employees[name]']))
    .ilike('n_users', generateSQLWildcardPattern(searchParams['n_users[name]']))
    .gte('monthly_profit', minProfit)
    .lte('monthly_profit', maxProfit)
    .gte('asking_price', minPrice)
    .lte('asking_price', maxPrice)
    .order('id', { ascending: false });

  if (error) {
    console.log(error);
    return <p className="p-24 text-red">Some error occurred could not fetch data.</p>;
  }

  // perform search operation by taking parameters and send back results with job listing page 
  return (
    <section className="w-full max-w-[85rem] mx-auto py-24">
      <Listing searchParams={searchParams} startupList={queryResults} />
    </section>
  );
}
