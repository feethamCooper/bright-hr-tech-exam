import { API_QUERIES, BRIGHT_HR_API_BASE } from "./constants";

export const mockGetAbsenceResponse = [
  {
    id: 0,
    startDate: "2022-05-28T04:39:06.470Z",
    days: 9,
    absenceType: "SICKNESS",
    employee: {
      firstName: "Rahaf",
      lastName: "Deckard",
      id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
    },
    approved: true,
  },
];

export const mockGetConflictResponse = { conflicts: false };

export const mockBrightHrAPi = () => {
  // @ts-ignore
  fetchMock.mockIf(
    /^https?:\/\/front-end-kata.brighthr.workers.dev\/api.*$/,
    // @ts-ignore
    (req) => {
      if (req.url.includes(`/${API_QUERIES.ABSENCES}`)) {
        return Promise.resolve({
          status: 200,
          body: JSON.stringify(mockGetAbsenceResponse),
        });
      } else if (
        req.url.includes(
          `/${API_QUERIES.CONFLICT}/${mockGetAbsenceResponse[0].id}`
        )
      ) {
        return Promise.resolve({
          status: 200,
          body: JSON.stringify(mockGetConflictResponse),
        });
      }
    }
  );
};
