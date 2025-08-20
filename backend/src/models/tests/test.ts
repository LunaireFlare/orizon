// import { Interest } from '../associations.js';

// const allInterests = Interest.findAll();

// // const newInterest = Interest.create({
// //     name: 'Test'
// // });

// console.log(allInterests);

import { sequelize } from '../../database/sequelize/client.js'

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connexion à PostgreSQL OK !");
    } catch (err) {
        console.error("Impossible de se connecter :", err);
    }
})();