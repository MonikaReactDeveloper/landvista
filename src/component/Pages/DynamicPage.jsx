import { useParams, useLocation } from "react-router-dom";
import { pages } from "../../data/pages";
import Breadcrumbs from "../homePage/Breadcrumbs";
import PageRenderer from "../PageRenderer";



export default function DynamicPage() {
  const { slug } = useParams();
  const location = useLocation();

  // Detect main category (services, insights, etc.)
  const category = location.pathname.split("/")[1];

  const page = pages[category]?.[slug];

  return (
    <>
      <Breadcrumbs />
      <PageRenderer page={page} />
    </>
  );
}