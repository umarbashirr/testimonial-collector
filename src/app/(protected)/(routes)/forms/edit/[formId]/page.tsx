import prisma from "@/lib/prisma";
import { getSession } from "../../actions";
import { FormEditor } from "../../form-editor";

const fetchFormWithID = async (id: string) => {
  const user = await getSession();

  if (!user) {
    return null;
  }

  const form = await prisma.form.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });

  return form;
};

const CreateFormPage = async ({
  params,
}: {
  params: Promise<{ formId: string }>;
}) => {
  const { formId } = await params;

  const form = await fetchFormWithID(formId);

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div>
        <h1 className="text-xl font-bold mb-1">Edit Feedback Form</h1>
        <p className="text-sm text-muted-foreground">
          Fill out the below form details in order to update the testimonial
          forms.
        </p>
      </div>
      <div className="mt-6 w-full">
        <FormEditor initialData={form} />
      </div>
    </div>
  );
};

export default CreateFormPage;
