import { query } from './_generated/server';

/**
 * Get current user info from Clerk identity
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return {
      userId: identity.subject,
      email: identity.email,
      name: identity.name,
    };
  },
});

