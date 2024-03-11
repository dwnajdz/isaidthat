// maximum description of startup description
// on their profile
//
// DEFAULT value is 10k words
const MAX_DESCRIPTION_LENGTH: number = 10000;


type Startup = {
  id: string;
  inserted_at: string;
  name: string;

  // not required
  tagline?: string;
  business_type?: string;
  description?: string;
  city: string;
  asking_price?: string;
  asking_price_reason?: string;
  sell_reason?: string;
  revenue_reason?: string;
  net_profit?: number;
  monthly_revenue?: string;
  monthly_profit?: string;
  industry?: string;
  n_employees?: string;
  found_year?: string;
  n_users?: string;
  website?: string;
  contact?: string;

  // user website images
  images?: string[];

  // user
  owner: string | null;
};

function getForm(name: string, formData: FormData): string {
  return formData.get(name) as string;
}


function isGoodLength(str: string | undefined, limit: number): boolean {
  if (str === undefined || str.length < limit) return true;
  return false;
}

function formToStartup(formData: FormData, user_id: string | null): Startup {
  const model = {
    name: getForm("startup_name", formData),

    asking_price: getForm("asking_price", formData) ?? undefined,
    asking_price_reason: getForm("asking_price_reason", formData) ?? undefined,
    net_profit: Number(formData.get("net_profit")) ?? 0,
    monthly_revenue: getForm("monthly_revenue", formData) ?? undefined,
    monthly_profit: getForm("monthly_profit", formData) ?? undefined,
    sell_reason: getForm("sell_reason", formData) ?? undefined,
    revenue_reason: getForm("revenue_reason", formData) ?? undefined,

    tagline: getForm("tagline", formData) ?? undefined,
    description: getForm("description", formData) ?? undefined,
    city: getForm("city", formData) ?? undefined,
    industry: getForm("industry[name]", formData) ?? undefined,
    business_type: getForm("business_type[name]", formData) ?? undefined,
    n_employees: getForm("num_employees[name]", formData) ?? undefined,
    n_users: getForm("n_users[name]", formData) ?? undefined,
    found_year: getForm("founding_year", formData) ?? undefined,
    website: getForm("website", formData) ?? undefined,
    contact: getForm("contact_url", formData) ?? undefined,

    owner: user_id
  } as Startup

  const descriptionLength: boolean = isGoodLength(model.description, MAX_DESCRIPTION_LENGTH);

  // this is checked here, because default HTML textbox limit can be omitted
  // to prevent user from inserting large amount of text into db we must check it here
  if (!descriptionLength) {
    // if user violates this we take only X text before violation
    model.description = model.description?.substring(0, MAX_DESCRIPTION_LENGTH);
  }

  return model;
}

export { formToStartup };
export type { Startup };
