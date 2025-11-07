import { useEffect, useRef } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

interface AddressAutocompleteProps {
  onSelect: (address: {
    formatted: string;
    lat: number;
    lon: number;
  }) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  'data-testid'?: string;
}

export default function AddressAutocomplete({
  onSelect,
  value,
  onChange,
  placeholder = 'Start typing an address...',
  className = 'min-h-11 text-base',
  'data-testid': testId,
}: AddressAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<GeocoderAutocomplete | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    if (!apiKey) {
      console.warn('Geoapify API key not found. Address autocomplete will not work.');
      return;
    }

    // Clear any existing autocomplete
    if (autocompleteRef.current) {
      containerRef.current.innerHTML = '';
    }

    const autocomplete = new GeocoderAutocomplete(
      containerRef.current,
      apiKey,
      {
        placeholder,
        type: 'amenity',
        lang: 'en',
        filter: {
          countrycode: ['us'],
        },
        bias: {
          countrycode: ['us'],
          proximity: { lat: 42.3314, lon: -83.0458 },
        },
      }
    );

    autocomplete.on('select', (location: any) => {
      if (location?.properties) {
        const formatted = location.properties.formatted || location.properties.address_line1;
        const lat = location.properties.lat;
        const lon = location.properties.lon;

        if (formatted && lat && lon) {
          onSelect({ formatted, lat, lon });
          onChange(formatted);
        }
      }
    });

    autocomplete.on('input', (value: string) => {
      onChange(value);
    });

    // Set initial value if provided
    if (value) {
      autocomplete.setValue(value);
    }

    autocompleteRef.current = autocomplete;

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.off('select');
        autocompleteRef.current.off('input');
      }
    };
  }, [placeholder]);

  // Update value when it changes externally
  useEffect(() => {
    if (autocompleteRef.current && value !== undefined) {
      const currentValue = autocompleteRef.current.getValue();
      if (currentValue !== value) {
        autocompleteRef.current.setValue(value);
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={`geoapify-autocomplete-container ${className}`}
      data-testid={testId}
    />
  );
}
