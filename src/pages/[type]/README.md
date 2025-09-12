# Dynamic Routing for Waitless Menu

This directory implements a dynamic routing system that consolidates the previously separate `/v` and `/qr` routes into a single dynamic route structure.

## Route Structure

- `/[type]/[identifier]` - Main menu view
  - `type`: Either 'v' (vanity URL) or 'qr' (QR code)
  - `identifier`: 
    - For 'v' routes: The custom path for the restaurant
    - For 'qr' routes: The account ID of the restaurant

- `/[type]/[identifier]/[page]` - Specific page view
  - `page`: The ID of the specific menu page to display

## How It Works

1. The route captures the `type` parameter to determine whether to use the vanity URL or QR code lookup method
2. Based on the `type`, it uses the appropriate fetch function:
   - `fetchMenuByPath` for 'v' routes
   - `fetchMenu` for 'qr' routes
3. The Menu component receives the appropriate props based on the route type

This approach reduces code duplication and makes the routing system more maintainable.
