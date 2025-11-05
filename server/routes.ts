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

  app.post("/api/resources", async (req, res) => {
    try {
      const resource = await storage.createFoodResource(req.body);
      res.status(201).json(resource);
    } catch (error) {
      res.status(400).json({ message: "Failed to create resource" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
