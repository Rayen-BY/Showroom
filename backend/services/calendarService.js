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

function formatGoogleDate(date) {
  const pad = (value) =>
    String(value).padStart(2, '0');

  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())}T` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}:` +
    `${pad(date.getSeconds())}`
  );
}

exports.createReservationEvent = async ({
  clientName,
  vehicule,
  dateFinale,
  heureFinale,
}) => {
  const calendar = google.calendar({
    version: 'v3',
    auth,
  });

  const [hours, minutes] =
    heureFinale.split(':');

  const startDate = new Date(dateFinale);

  startDate.setHours(
    Number(hours),
    Number(minutes),
    0,
    0
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
      dateTime: formatGoogleDate(startDate),
      timeZone: 'Africa/Tunis',
    },

    end: {
      dateTime: formatGoogleDate(endDate),
      timeZone: 'Africa/Tunis',
    },
  };

  const response =
    await calendar.events.insert({
      calendarId:
        'rayenbenyahmed02@gmail.com', // ton agenda
      resource: event,
    });

  return response.data;
};