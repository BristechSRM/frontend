const profiles = [
    {
        id: '09aac819-5f92-42eb-a06c-c01aef5181ad',
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
        id: '2b6f60c1-9025-4e2c-bbb2-3b40a87fde75',
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
