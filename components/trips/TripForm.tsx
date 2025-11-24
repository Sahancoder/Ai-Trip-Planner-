'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function TripForm() {
  const router = useRouter();
  const createTrip = useMutation(api.trips.createTrip);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    preferences: '',
    budget: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tripId = await createTrip({
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        destination: formData.destination || undefined,
        preferences: formData.preferences || undefined,
        budget: formData.budget || undefined,
      });

      router.push(`/dashboard/trips/${tripId}`);
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to create trip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Trip Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Input
        label="Destination"
        value={formData.destination}
        onChange={(e) =>
          setFormData({ ...formData, destination: e.target.value })
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          required
        />
        <Input
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          required
        />
      </div>
      <Input
        label="Preferences (optional)"
        value={formData.preferences}
        onChange={(e) =>
          setFormData({ ...formData, preferences: e.target.value })
        }
        placeholder="e.g., Prefer local restaurants, avoid crowds"
      />
      <Input
        label="Budget (optional)"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        placeholder="e.g., $500-1000"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Trip'}
      </Button>
    </form>
  );
}

