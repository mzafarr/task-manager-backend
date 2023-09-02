import express from "express";
import { ClientModel } from "../models/Client.js";
const router = express.Router();

router.get("/showClients", async (req, res) => {
    try {
      const clients = await ClientModel.find();
      if (!clients || clients.length === 0) {
        return res.status(200).json({ message: "There are no clients stored" });
      }
      return res.status(200).json({ message: "Clients successfully retrieved", clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });

export { router as clientRouter };