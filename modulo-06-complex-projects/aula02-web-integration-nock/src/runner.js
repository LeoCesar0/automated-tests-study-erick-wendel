import axios from "axios";

export const fetchByPage = async (page, counter = 1) => {
  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/character?page=" + page
  );

  return data?.results?.slice(0, counter).map((item) => {
    return {
      id: 1,
      name: "Rick Sanchez",
      image: item.image,
    };
  });
};
