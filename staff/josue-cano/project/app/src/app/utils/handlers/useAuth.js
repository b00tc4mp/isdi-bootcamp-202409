import { useEffect } from "react";
import { validateSession } from "@/app/logic/auth";
import { useRouter } from "next/navigation";

export default function useAuth () {
  const router = useRouter();

  useEffect(() => {
    // Do something here...
    async function validate() {
      const response = await validateSession();

      if (!response.status) {
        router.push("/");
      }
    }

    validate();
  }, [router]);
};
