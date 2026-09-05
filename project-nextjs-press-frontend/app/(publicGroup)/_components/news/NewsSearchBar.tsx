"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const NewsSearchBar = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const debounceDRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const handleChange = (value: string) => {
    // const params = new URLSearchParams();

    // if (value) {
    //   params.set("searchTerm", value);
    // } else {
    //   params.delete("searchTerm");
    // }

    // console.log("params", params);

    // router.replace(`${pathName}?${params.toString()}`);

    if (debounceDRef.current) {
      clearTimeout(debounceDRef.current);
    }

    debounceDRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }

      console.log("params", params);

      router.replace(`${pathName}?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        defaultValue={
          searchParams.get("searchTerm")
            ? searchParams.get("searchTerm")?.toString()
            : ""
        }
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search news..."
        className="pl-9"
      />
    </div>
  );
};

export default NewsSearchBar;
