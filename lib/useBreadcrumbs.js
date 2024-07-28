import { useRouter } from "next/router";
import { useMemo } from "react";

const useBreadcrumbs = () => {
  const router = useRouter();
  const { project_id } = router.query;

  const pathSegments = useMemo(() => {
    return router.asPath
      .split("?")[0]
      .split("/")
      .filter((segment) => segment);
  }, [router.asPath]);

  const breadcrumbs = useMemo(() => {
    return pathSegments.map((segment, index) => {
      const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const urlWithProjectId = project_id
        ? `${url}?project_id=${project_id}`
        : url;
      const label = segment.replace(/[-_]/g, " ");

      return {
        label: label.charAt(0).toUpperCase() + label.slice(1),
        url: urlWithProjectId,
      };
    });
  }, [pathSegments, project_id]);

  return [
    { label: "Home", url: project_id ? `/?project_id=${project_id}` : "/" },
    ...breadcrumbs,
  ];
};

export default useBreadcrumbs;
