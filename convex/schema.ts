import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  trips: defineTable({
    userId: v.string(),
    title: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    destination: v.optional(v.string()),
    preferences: v.optional(v.string()),
    budget: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index('by_userId', ['userId']),

  itineraryItems: defineTable({
    tripId: v.id('trips'),
    day: v.number(),
    time: v.string(),
    title: v.string(),
    description: v.string(),
    location: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    placeId: v.optional(v.string()),
    duration: v.optional(v.string()),
    order: v.optional(v.number()),
  })
    .index('by_tripId', ['tripId'])
    .index('by_tripId_day', ['tripId', 'day']),
});

