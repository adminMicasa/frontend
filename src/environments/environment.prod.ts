/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  micasa: {
    urlApi: 'https://serverlessmicasamed.azurewebsites.net/api',
    endpointSchools :'/courses',
    endpointenrollmentCoursesByCourseId :'/enrollmentCourses/byCourseId',
    endpointenrollmentCourses :'/enrollmentCourses',
    endpointMembers: '/members',
    endpointMunicipalities: '/selectors/municipalities',
    endpointOccupations: '/selectors/occupations',
    endpointSocialNetworks: '/selectors/social-networks',
    endpointHowKnow: '/selectors/how-know',
    endpointSteps: '/selectors/steps',
  }
};
