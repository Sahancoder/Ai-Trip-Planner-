import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getItineraryItems = query({
  args: { tripId: v.id('trips') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Verify trip belongs to user
    const trip = await ctx.db.get(args.tripId);
    if (!trip || trip.userId !== identity.subject) {
      return [];
    }

    return ctx.db
      .query('itineraryItems')
      .withIndex('by_tripId', (q) => q.eq('tripId', args.tripId))
      .order('asc')
      .collect();
  },
});

export const getItineraryByDay = query({
  args: { tripId: v.id('trips'), day: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const trip = await ctx.db.get(args.tripId);
    if (!trip || trip.userId !== identity.subject) {
      return [];
    }

    return ctx.db
      .query('itineraryItems')
      .withIndex('by_tripId_day', (q) =>
        q.eq('tripId', args.tripId).eq('day', args.day)
      )
      .order('asc')
      .collect();
  },
});

export const createItineraryItem = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const trip = await ctx.db.get(args.tripId);
    if (!trip || trip.userId !== identity.subject) {
      throw new Error('Trip not found or unauthorized');
    }

    return ctx.db.insert('itineraryItems', args);
  },
});

export const updateItineraryItem = mutation({
  args: {
    itemId: v.id('itineraryItems'),
    day: v.optional(v.number()),
    time: v.optional(v.string()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    placeId: v.optional(v.string()),
    duration: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const { itemId, ...updates } = args;
    const item = await ctx.db.get(itemId);
    if (!item) throw new Error('Item not found');

    // Verify trip belongs to user
    const trip = await ctx.db.get(item.tripId);
    if (!trip || trip.userId !== identity.subject) {
      throw new Error('Unauthorized');
    }

    await ctx.db.patch(itemId, updates);
  },
});

export const deleteItineraryItem = mutation({
  args: { itemId: v.id('itineraryItems') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error('Item not found');

    const trip = await ctx.db.get(item.tripId);
    if (!trip || trip.userId !== identity.subject) {
      throw new Error('Unauthorized');
    }

    await ctx.db.delete(args.itemId);
  },
});

