import { FormEditor } from "../form-editor";

const CreateFormPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div>
        <h1 className="text-xl font-bold mb-1">Create Form</h1>
        <p className="text-sm text-muted-foreground">
          Fill out the below form details in order to recieve testimonials.
        </p>
      </div>
      <div className="mt-6 w-full">
        <FormEditor />
      </div>
    </div>
  );
};

export default CreateFormPage;
