import oktaClient from '../../lib/oktaClient';

export const create = (req, res, next) => {
    if (!req.body) return res.status(400).send("Please specify body for the user");
    const newUser = {
        profile: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            login: req.body.email
        },
        credentials: {
            password: {
                value: req.body.password
            }
        }
    };
    oktaClient
        .createUser(newUser)
        .then(user => {
            res.status(201);
            res.send(user);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
}

export const listAll = async (req, res, next) => {
    try {
        const finalUsers = [];
        const users = await oktaClient.listUsers();
        await users.each(user => {
            finalUsers.push(user)
        })
        // for await (let user of oktaClient.listUsers()) {
        //     console.log(user)
        //     users.push(user);
        // }
        res.status(200).json(finalUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const _delete = async (req, res, next) => {
    try {
        const email = req.params.id;
        const user = await oktaClient.getUser(email);

        await user.deactivate();
        await user.delete();
        res.status(200).json({
            message: `User ${email} deleted`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }

}