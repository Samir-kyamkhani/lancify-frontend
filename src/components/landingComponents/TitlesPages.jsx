import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TitlesPages() {
  const locationName = useLocation().pathname;
  const pageTitle = locationName
    .split("/")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    document.title = `${pageTitle}${locationName !== "/" ? " |" : ""} Monochrome`;
  }, [pageTitle]);

  return null;
}

export default TitlesPages;
