// maximum description of startup description
// on their profile
//
// DEFAULT value is 10k words
const MAX_DESCRIPTION_LENGTH: number = 10000;


type Task = {
  id: string;
  inserted_at: string;
  title: string;

  description?: string;
  done: boolean;
  deadline: string;

  upvotes: number;
  downvotes: number;

  // user
  owner: string | null;
  owner_name: string | null;
};

function getForm<Type>(name: string, formData: FormData): Type {
  return formData.get(name) as Type;
}


function isGoodLength(str: string | undefined, limit: number): boolean {
  if (str === undefined || str.length < limit) return true;
  return false;
}

function formToTask(formData: FormData, user_id: string | null): Task {
  const model = {
    title: getForm<string>("title", formData),
    description: getForm<string>("description", formData) ?? "",
    deadline: getForm<string>("deadline", formData),

    owner: user_id
  } as Task

  const descriptionLength: boolean = isGoodLength(model.description, MAX_DESCRIPTION_LENGTH);

  // this is checked here, because default HTML textbox limit can be omitted
  // to prevent user from inserting large amount of text into db we must check it here
  if (!descriptionLength) {
    // if user violates this we take only X text before violation
    model.description = model.description?.substring(0, MAX_DESCRIPTION_LENGTH);
  }

  return model;
}

export { formToTask };
export type { Task };
