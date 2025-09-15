/**
 * Navigation Script for Waitless Menu
 * 
 * This script handles the section navigation functionality for the Waitless Menu application.
 * It provides smooth scrolling to sections, highlights the active section in the navigation bar,
 * and automatically scrolls the navigation bar to keep the active section visible.
 */

/**
 * Interface for section boundaries used in scroll calculations
 */
interface SectionBoundary {
  top: number;       // Top position of the section in pixels
  bottom: number;    // Bottom boundary of the section in pixels
  section: Element;  // Reference to the section DOM element
  navItem: Element;  // Reference to the navigation item that corresponds to this section
}

/**
 * Initialize the navigation functionality
 * This function is the main entry point and should be called when the DOM is loaded
 */
export function initializeNavigation(): void {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Get references to key elements
    const navigationContainer = document.querySelector('.overflow-x-auto');
    const sectionNavItems = document.querySelectorAll('.section-nav-item');
    
    // Create a mapping between navigation items and their target sections
    const sectionElements = Array.from(sectionNavItems).map(item => {
      const targetId = item.getAttribute('data-section-target');
      return {
        navItem: item,
        section: document.getElementById(targetId || '')
      };
    }).filter(item => item.section); // Filter out any items where the section wasn't found
    
    // Add click event listeners to section navigation items
    sectionNavItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-section-target');
        if (targetId) {
          scrollToSection(targetId);
          // Also scroll the navigation to center this item
          scrollNavToItem(item);
        }
      });
    });
    
    // Add scroll event listener to update active section
    window.addEventListener('scroll', updateActiveSection);
    
    // Initialize active section on page load
    // Wait a bit to ensure all elements are properly rendered
    setTimeout(updateActiveSection, 100);
    
    /**
     * Scrolls the page to the specified section with smooth behavior
     * @param sectionId - The ID of the section to scroll to
     */
    function scrollToSection(sectionId: string): void {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    /**
     * Scrolls the navigation bar horizontally to center the active item
     * @param navItem - The navigation item element to center in the view
     */
    function scrollNavToItem(navItem: Element): void {
      if (!navigationContainer) return;
      
      const navRect = navigationContainer.getBoundingClientRect();
      const itemRect = navItem.getBoundingClientRect();
      
      // Calculate the scroll position to center the item in the navigation
      const scrollLeft = itemRect.left + itemRect.width / 2 - navRect.left - navRect.width / 2;
      
      // Scroll the navigation container horizontally with smooth behavior
      navigationContainer.scrollTo({
        left: navigationContainer.scrollLeft + scrollLeft,
        behavior: 'smooth'
      });
    }
    
    /**
     * Updates the active section based on the current scroll position
     * This function handles:
     * 1. Determining which section is currently in view
     * 2. Updating the active state of navigation items
     * 3. Scrolling the navigation to show the active item
     */
    function updateActiveSection(): void {
      // Get current scroll position with some offset for better UX
      const scrollPosition = window.scrollY + 100;
      
      // Calculate section boundaries including all items until the next section
      const sectionBoundaries: SectionBoundary[] = [];
      
      // First, get all section elements in the document
      const allSectionElements = Array.from(document.querySelectorAll('[id^="section-"]'));
      
      // Calculate the boundaries for each section
      for (let i = 0; i < allSectionElements.length; i++) {
        const currentSection = allSectionElements[i];
        const nextSection = allSectionElements[i + 1] || null;
        
        const sectionTop = (currentSection as HTMLElement).offsetTop;
        
        // If this is the last section, use the bottom of the page as the boundary
        // Otherwise, use the top of the next section as the boundary
        const sectionBottom = nextSection 
          ? (nextSection as HTMLElement).offsetTop 
          : document.body.scrollHeight;
        
        // Find the matching navigation item
        const sectionId = currentSection.id;
        const matchingNavItem = Array.from(sectionNavItems).find(item => 
          item.getAttribute('data-section-target') === sectionId
        );
        
        if (matchingNavItem) {
          sectionBoundaries.push({
            top: sectionTop,
            bottom: sectionBottom,
            section: currentSection,
            navItem: matchingNavItem
          });
        }
      }
      
      // Find the current section in view based on the calculated boundaries
      let currentSection: Element | null = null;
      let activeNavItem: Element | null = null;
      
      for (const boundary of sectionBoundaries) {
        if (scrollPosition >= boundary.top && scrollPosition < boundary.bottom) {
          currentSection = boundary.section;
          activeNavItem = boundary.navItem;
          break;
        }
      }
      
      // Edge case: If we're before the first section, highlight the first one
      if (!currentSection && sectionBoundaries.length > 0) {
        const firstBoundary = sectionBoundaries[0];
        if (scrollPosition < firstBoundary.top) {
          currentSection = firstBoundary.section;
          activeNavItem = firstBoundary.navItem;
        }
      }
      
      // Edge case: If we're after the last section, highlight the last one
      if (!currentSection && sectionBoundaries.length > 0) {
        const lastBoundary = sectionBoundaries[sectionBoundaries.length - 1];
        if (scrollPosition >= lastBoundary.bottom) {
          currentSection = lastBoundary.section;
          activeNavItem = lastBoundary.navItem;
        }
      }
      
      // Update active class on navigation items
      sectionElements.forEach(({ navItem, section }) => {
        if (section === currentSection) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      });
      
      // Scroll the navigation to show the active item
      if (activeNavItem) {
        scrollNavToItem(activeNavItem);
      }
    }
  });
}

// Auto-initialize the navigation when this script is loaded
initializeNavigation();