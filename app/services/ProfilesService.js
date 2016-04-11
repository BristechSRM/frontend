const profiles = [
    {
        id: '4e843d4b-b425-4780-9b0a-84cab5faf140',
        forename: 'Chris',
        surname: 'Smith',
        rating: 5,
        handles: [
            {
                type: 'email',
                id: 'csmith@email.com',
            },
        ],
    },
    {
        id: '7627b8f9-d002-423a-8242-bf5c64388661',
        forename: 'David',
        surname: 'Wybourn',
        rating: 3,
        handles: [
            {
                type: 'email',
                id: 'dwybourn@email.com',
            },
            {
                type: 'twitter',
                id: 'dwybourn',
            },
            {
                type: 'phone',
                id: '01234567890',
            },
        ],
    },
];

class ProfilesService {

    getProfile(id) {
        return new Promise((resolve, reject) => {
            const selectedProfile = profiles.find(profile => profile.id === id);
            if (selectedProfile) {
                resolve(selectedProfile);
                return;
            }
            reject({
                message: 'Profile not found',
                errors: [
                    {
                        resource: `/profiles/${id}`,
                        code: '404',
                        message: 'Not found',
                    },
                ],
            });
        });
    }
}

export default new ProfilesService();
