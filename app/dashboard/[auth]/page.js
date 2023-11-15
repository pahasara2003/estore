import ProfileTitle from "../../components/ProfileTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProfileDialog from "@/components/react/ProfileDialog";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Page = async (params) => {
  const User = jwt.verify(
    params.params.auth.split("%22")[0],
    process.env.SECRET
  );
  const data = await prisma.userTable.findMany({
    where: {
      id: User.user,
    },
  });
  const Data = await data[0];
  prisma.$disconnect();

  return (
    <>
      {Data && (
        <div className="max-w-[700px] m-auto min-h-[90vh]">
          <ProfileTitle name={Data.FirstName} />
          <h1 className="text-[1.2rem] font-bold text-center py-3 pt-5">
            Billing Details
          </h1>
          <div className="max-w-[600px] m-auto px-3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Last Name</AccordionTrigger>
                <AccordionContent>{Data.LastName}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Email Address</AccordionTrigger>
                <AccordionContent>{Data.EMAIL}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Telephone</AccordionTrigger>
                <AccordionContent>{Data.TEL}</AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Personal Address</AccordionTrigger>
                <AccordionContent>{Data.ADDR}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Postal Code</AccordionTrigger>
                <AccordionContent>{Data.POSTCODE}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <ProfileDialog data={Data} />
        </div>
      )}
    </>
  );
};

export default Page;
