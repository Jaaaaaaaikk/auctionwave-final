import axios from 'axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip the guard on the server side to avoid unnecessary redirects during SSR
  if (process.server) return;

  try {
    // Perform the API call to check authentication and get the user type
    const { data: authData } = await axios.get('/api/check-token');

    // Check if the user is not logged in
    if (!authData.isLoggedIn) {
      if (to.path !== '/homepage') {
        return navigateTo('/homepage'); // Redirect to homepage if not authenticated
      }
    } else {
      const { userType } = authData;

      // Handle logged-in users and route them based on their userType
      if (to.path === '/homepage' || to.path === '/bidder') {
        if (userType === 'Bidder' && to.path !== '/bidder/bidderdashboard') {
          return navigateTo('/bidder/bidderdashboard', { replace: true }); // Redirect Bidder to their dashboard
        } else if (userType === 'Auctioneer' && to.path !== '/auctioneer/auctioneerdashboard') {
          return navigateTo('/auctioneer/auctioneerdashboard', { replace: true }); // Redirect Auctioneer to their dashboard
        }
        else if (userType === 'admin' && to.path !== '/admin/admindashboard') {
          return navigateTo('/admin/admindashboard', { replace: true }); // Redirect Admin to their dashboard
        }

      }

      // Prevent access to Bidder routes if the user is not a Bidder
      if (to.path.startsWith('/bidder') && userType !== 'Bidder') {
        return navigateTo('/homepage');
      }

      // Prevent access to Auctioneer routes if the user is not an Auctioneer
      if (to.path.startsWith('/auctioneer') && userType !== 'Auctioneer') {
        return navigateTo('/homepage');
      }

      // Prevent access to Bidder routes if the user is not a Bidder
      if (to.path.startsWith('/admin') && userType !== 'admin') {
        return navigateTo('/homepage');
      }
    }
  } catch (error) {
    // Handle errors by redirecting to the homepage if something goes wrong
    console.error('Error checking authentication:', error);
    if (to.path !== '/homepage') {
      return navigateTo('/homepage');
    }
  }
});
