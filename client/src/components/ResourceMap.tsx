import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { FoodResource } from '@shared/schema';
import { createCustomIcon, type ResourceType } from './MapIcons';

interface ResourceMapProps {
  resources: FoodResource[];
  center: LatLngExpression;
  zoom?: number;
  onResourceClick?: (resource: FoodResource) => void;
  selectedResourceId?: string;
}

function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export default function ResourceMap({ 
  resources, 
  center, 
  zoom = 13,
  onResourceClick,
  selectedResourceId 
}: ResourceMapProps) {
  return (
    <div className="h-full w-full relative" data-testid="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={true}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resources.map((resource) => {
          const isSelected = resource.id === selectedResourceId;
          const icon = createCustomIcon(resource.type as ResourceType, isSelected);
          
          return (
            <Marker
              key={resource.id}
              position={[parseFloat(resource.latitude), parseFloat(resource.longitude)]}
              icon={icon}
              eventHandlers={{
                click: () => onResourceClick?.(resource)
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-base">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground">{resource.type}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
