import { useParams, useLocation } from "react-router-dom";
import { pages } from "../../data/pages";
import PageRenderer from "../PageRenderer";

export default function DynamicPage() {
  const { slug } = useParams();
  const location = useLocation();

  // Detect main category (governance, about, etc.)
  const category = location.pathname.split("/")[1];

  const page = pages[category]?.[slug];

  return <PageRenderer page={page} />;
}