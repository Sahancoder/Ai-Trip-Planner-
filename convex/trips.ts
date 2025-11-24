import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const listTrips = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return ctx.db
      .query('trips')
      .withIndex('by_userId', (q) => q.eq('userId', identity.subject))
      .order('desc')
      .collect();
  },
});

export const getTrip = query({
  args: { tripId: v.id('trips') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const trip = await ctx.db.get(args.tripId);
    if (!trip || trip.userId !== identity.subject) {
      return null;
    }

    return trip;
  },
});

export const createTrip = mutation({
  args: {
    title: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    destination: v.optional(v.string()),
    preferences: v.optional(v.string()),
    budget: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    return ctx.db.insert('trips', {
      userId: identity.subject,
      createdAt: Date.now(),
      ...args,
    });
  },
});

export const updateTrip = mutation({
  args: {
    tripId: v.id('trips'),
    title: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    destination: v.optional(v.string()),
    preferences: v.optional(v.string()),
    budget: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const { tripId, ...updates } = args;
    const trip = await ctx.db.get(tripId);
    if (!trip || trip.userId !== identity.subject) {
      throw new Error('Trip not found or unauthorized');
    }

    await ctx.db.patch(tripId, updates);
  },
});

export const deleteTrip = mutation({
  args: { tripId: v.id('trips') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const trip = await ctx.db.get(args.tripId);
    if (!trip || trip.userId !== identity.subject) {
      throw new Error('Trip not found or unauthorized');
    }

    // Also delete all itinerary items
    const items = await ctx.db
      .query('itineraryItems')
      .withIndex('by_tripId', (q) => q.eq('tripId', args.tripId))
      .collect();

    for (const item of items) {
      await ctx.db.delete(item._id);
    }

    await ctx.db.delete(args.tripId);
  },
});

