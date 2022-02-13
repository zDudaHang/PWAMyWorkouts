import { FeedModel } from "./model/model"

export const mocked_feed: FeedModel = {
  publications: [
    {
      title: "Treino de perna top",
      date: "22/01/2022",
      workout: {
        name: "Treino 2",
        description: "3 de 12 movimentos de \n1. Agachamento\n2. Stiff",
        creator: {
          name: "João da Silva",
        },
      },
    },
    {
      title: "Treino de braço top",
      date: "23/01/2022",
      workout: {
        name: "Treino 3",
        description: "3 de 12 movimentos de \n1. Agachamento\n2. Stiff",
        creator: {
          name: "João da Silva",
        },
      },
    },
    {
      title: "Treino de glúteo top",
      date: "24/01/2022",
      workout: {
        name: "Treino 4",
        description: "3 de 12 movimentos de \n1. Agachamento\n2. Stiff",
        creator: {
          name: "João da Silva",
        },
      },
    },
  ],
}
