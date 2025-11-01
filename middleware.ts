import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
   "/api/shop-products(.*)",  // 👈 mark as public API route
  "/all-shop-products(.*)",
  '/shop-products(.*)',  
  '/about',
  '/contact',
  '/api/webhooks/clerk',
  '/alterations-and-repairs'
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
// //     // Always run for API routes
// //     '/(api|trpc)(.*)',
// //   ],
// // };



// export const config = {
//   matcher: [
//     // pages (everything except _next internal assets, images, favicon and direct static files)
//     "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",

//     // explicit protected API routes that require Clerk server helpers:
//     "/api/user/data",
//     "/api/cart",
//     "/api/cart/:path*",
//     "/api/custom-requests",        // requires auth (if you made it authenticated)
//     "/api/custom-requests/:path*",
//     "/api/shop-products/manage/:path*",
//     "/api/orders",
//     "/api/orders/:path*",
//     "/api/seller/:path*",]
// };