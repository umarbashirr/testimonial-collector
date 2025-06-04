import prisma from "@/lib/prisma";

import { getSession } from "../forms/actions";
import { TestimonialTable } from "./TestimonialTable";

const fetchTestimonials = async () => {
  const user = await getSession();

  if (!user) {
    return null;
  }

  const testimonials = await prisma.testimonial.findMany({
    where: {
      formRef: {
        userId: user.id,
      },
    },
    include: {
      formRef: true,
    },
  });

  return testimonials;
};

const TestimonialsArchive = async () => {
  const testimonials = await fetchTestimonials();

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold mb-1">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Here you can manage all your testimonials received
          </p>
        </div>
      </div>
      <TestimonialTable testimonials={testimonials} />
      <div>
        <code className="bg-muted p-2 rounded text-sm">
          {`<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/wall/${
            testimonials && testimonials[0].formRef.slug
          }" width="100%" height="400" frameBorder="0"></iframe>`}
        </code>
      </div>
    </div>
  );
};

export default TestimonialsArchive;
