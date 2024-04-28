import Link from "next/link";
import { MdHome } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CustomBreadcrumb({
  firstBread,
  breads,
  lastBreadName,
}: {
  firstBread: { link: string; name: string };
  breads?: { link: string; name: string }[];
  lastBreadName: string;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <div className="flex items-center gap-x-1">
            <MdHome />
            <Link href={firstBread.link} className="hover:text-black">
              {firstBread.name}
            </Link>
          </div>
        </BreadcrumbItem>
        {breads &&
          breads.map((item: any, i: number) => (
            <div key={i} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={item.link} className="hover:text-black ml-2">
                  {item.name}
                </Link>
              </BreadcrumbItem>
            </div>
          ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{lastBreadName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
