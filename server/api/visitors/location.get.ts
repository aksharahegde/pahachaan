import { getHeaders } from "h3";

import { readVisitorLocationFromHeaders } from "~~/app/utils/ablyVisitors";

export default defineEventHandler((event) => {
  return {
    location: readVisitorLocationFromHeaders(getHeaders(event)),
  };
});
