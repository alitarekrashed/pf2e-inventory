import { Equipment } from "@pf2e-inventory/shared"
import { NextFunction, Request, Response } from "express"

export const ITEMS: Equipment[] = [
  {
    id: "1",
    category: "Adventuring Gear",
    name: "alchemist's lab",
    level: 0,
    bulk: 6,
    description: "You need an alchemist’s lab to Craft alchemical items during downtime.",
    price: [{ value: 15, type: "sp" }],
    hands: "2",
  },
  {
    id: "2",
    category: "Adventuring Gear",
    name: "expanded alchemist's lab",
    level: 3,
    bulk: 6,
    description:
      "You need an alchemist’s lab to Craft alchemical items during downtime. An expanded alchemist's lab gives a +1 item bonus to Crafting checks to create alchemical items.",
    price: [{ value: 55, type: "gp" }],
    hands: "2",
  },
  {
    id: "3",
    category: "Adventuring Gear",
    name: "alchemist's toolkit",
    level: 0,
    bulk: 1,
    description:
      "This mobile collection of vials and chemicals can be used for simple alchemical tasks. If you wear your alchemist's toolkit, you can draw and replace them as part of the action that uses them.",
    price: [{ value: 3, type: "gp" }],
    hands: "1 or 2",
  },
  {
    id: "4",
    category: "Adventuring Gear",
    name: "artisan's tookit",
    level: 0,
    bulk: 2,
    description:
      "You need this toolkit to create item sfrom raw materials with the Craft skill. Different sets are needed for different work, as determined by the GM; for example, a blacksmith's tookit differes from a woodworker's toolkit. If you wear your artisan's toolkit, you can draw and replace it as part of the action that uses it.",
    price: [{ value: 4, type: "gp" }],
    hands: "1 or 2",
  },
  {
    id: "5",
    category: "Adventuring Gear",
    name: "sterling artisan's tookit",
    level: 3,
    bulk: 2,
    description:
      "You need this toolkit to create item sfrom raw materials with the Craft skill. A sterling artisan's toolkit gives you a +1 item bonus to the check. Different sets are needed for different work, as determined by the GM; for example, a blacksmith's tookit differes from a woodworker's toolkit. If you wear your artisan's toolkit, you can draw and replace it as part of the action that uses it.",
    price: [{ value: 50, type: "gp" }],
    hands: "1 or 2",
  },
]

export const getEquipment = async (req: Request, res: Response, next: NextFunction) => {
  res.send(ITEMS)
}
