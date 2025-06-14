import { Request, Response } from "express";
import { postToMonday } from "../utils/app.utils";

export const fetchBoards = async (req: Request, res: Response) => {
  let query = `query {
    boards {
        id
        name
        }
    }`;

  try {
    const response = await postToMonday(query);

    return res
      .status(200)
      .json({ message: "Boards fetched successfully!", data: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch boards", data: null });
  }
};

export const fetchBoardItems = async (req: Request, res: Response) => {
  const { boardId } = req.params;

  let query = `query { boards (ids: ${boardId}) { items_page { cursor items { id name }}}}`;

  try {
   const response = await postToMonday(query);
    return res
      .status(200)
      .json({ message: "Board Items fetched successfully!", data: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch board items", data: null });
  }
};

export const fetchConnectedBoardItems = async (req: Request, res: Response) => {
  const { itemIds } = req.body;

  const query = `query {
    items(ids: [${itemIds.join(',')}]) {
      id
      name
      column_values {
        id
        text
        ... on BoardRelationValue {
          linked_item_ids
          linked_items {
            id
            name
          }
        }
      }
    }
  }`;
  try {
    const response = await postToMonday(query);
    return res
      .status(200)
      .json({ message: "Connected Items fetched successfully!", data: response.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch Connected items", data: null });
  }
};
