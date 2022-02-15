import { FeedModel, CreatorModel } from "../../model/model"

const joao: CreatorModel = { id: 1, name: "João da Silva" }
const adeliana: CreatorModel = { id: 2, name: "Adeliana dos Santos" }
const julia: CreatorModel = { id: 3, name: "Júlia de Mello" }

export const CREATORS = new Map<number, CreatorModel>([
  [1, joao],
  [2, adeliana],
  [3, julia],
])

export const mocked_feed: FeedModel = {
  publications: [
    {
      title: "Treino de perna top",
      date: "22/01/2022",
      workout: {
        name: "Treino 2",
        description: "3 de 12 movimentos de \n1. Agachamento\n2. Stiff",
        creator: joao,
      },
    },
    {
      title: "Treino de braço top",
      date: "23/01/2022",
      workout: {
        name: "Treino 3",
        description: "3 de 12 movimentos de \n1. Agachamento\n2. Stiff",
        creator: adeliana,
      },
    },
    {
      title: "Treino de glúteo top",
      date: "24/01/2022",
      workout: {
        name: "Treino 4",
        description: "3 de 12 movimentos de \n1. Agachamento\n2. Stiff",
        creator: julia,
      },
    },
  ],
}
