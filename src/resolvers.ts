import { getData } from "./dataSources/mongodb";

export default {
    Query: {
      testMessage: getData(),
    },
  };