const { google } = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(
    __dirname,
    '../config/google-calendar.json'
  ),
  scopes: [
    'https://www.googleapis.com/auth/calendar',
  ],
});

exports.createReservationEvent =
  async ({
    clientName,
    vehicule,
    dateFinale,
    heureFinale,
  }) => {
    const calendar =
      google.calendar({
        version: 'v3',
        auth,
      });

    const startDate = new Date(
      `${dateFinale}T${heureFinale}:00`
    );

    const endDate = new Date(startDate);
    endDate.setHours(
      endDate.getHours() + 1
    );

    const event = {
      summary: `Essai véhicule - ${vehicule}`,
      description: `
Client : ${clientName}
Véhicule : ${vehicule}
      `,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'Africa/Tunis',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'Africa/Tunis',
      },
    };

    const response =
      await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

    return response.data;
  };
