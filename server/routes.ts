import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/resources", async (req, res) => {
    const resources = await storage.getFoodResources();
    res.json(resources);
  });

  app.get("/api/resources/:id", async (req, res) => {
    const resource = await storage.getFoodResource(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  });

  app.patch("/api/resources/:id/favorite", async (req, res) => {
    const { isFavorite } = req.body;
    const updated = await storage.updateFoodResource(req.params.id, { isFavorite });
    if (!updated) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(updated);
  });

  const httpServer = createServer(app);

  return httpServer;
}
