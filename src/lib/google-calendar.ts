import { GoogleCalendarEvent } from '../types';

/**
 * Service to handle Google Calendar API interactions
 */
export const GoogleCalendarService = {
  /**
   * Mock function to simulate fetching Google Calendar events.
   * In a real implementation, this would use the Google Calendar API with an OAuth token.
   */
  async fetchEvents(accessToken?: string): Promise<GoogleCalendarEvent[]> {
    if (!accessToken) {
      // Return mock data for demonstration if no real token is provided
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'g1',
              summary: 'Client Consultation: John Smith',
              start: { dateTime: new Date(Date.now() + 3600000).toISOString() }, // 1 hour from now
              end: { dateTime: new Date(Date.now() + 7200000).toISOString() },
              location: 'Virtual Meeting (Google Meet)',
              description: 'Initial consultation regarding property dispute.'
            },
            {
              id: 'g2',
              summary: 'Court Hearing: State vs. Peterson',
              start: { dateTime: new Date(Date.now() + 86400000).toISOString() }, // Tomorrow
              end: { dateTime: new Date(Date.now() + 93600000).toISOString() },
              location: 'City Court, Room 4B',
              description: 'Preliminary hearing.'
            },
            {
              id: 'g3',
              summary: 'Lunch with Legal Team',
              start: { dateTime: new Date(Date.now() + 172800000).toISOString() }, // Day after tomorrow
              end: { dateTime: new Date(Date.now() + 176400000).toISOString() },
              location: 'The Daily Bistro',
              description: 'Monthly team bonding.'
            }
          ]);
        }, 800);
      });
    }

    // Real API implementation placeholder:
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + 
        new Date().toISOString() + '&singleEvents=true&orderBy=startTime',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch Google Calendar events');
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Google Calendar Error:', error);
      throw error;
    }
  }
};