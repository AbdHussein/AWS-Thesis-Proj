var knex = require('knex')({
    client: 'mysql',
    connection: {
      //host : '18.158.238.175',
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'xTown',
    },
  });
const bcrypt = require('bcrypt');

const dataFile = require('../client/src/data/data.json').data;
// var category = {}
// dataFile.map(async (item) => {
//     if(!item.categories){
//         if(phones)
//         category[item.categories] = true
//     }
// });
dataFile.map(async (item) => {    
    const location = JSON.stringify({lat: item.lat, lng: item.lng});
    var categoryID = 0;
    if(item.categories === 'phones'){
        categoryID = 1;
    } else if (item.categories === 'FMCG'){
        categoryID = 2;
    }else if(item.categories === 'resturant'){
        categoryID = 3;
    }
    if(item.username !== 'no data'){
       try{
        await knex('User').insert({
            username: item.username,
            email: item.email,
            password: await bcrypt.hash('123456', 10),
            roleID: 2,
            payService: null,
            mobile: item.phone,
            serviceName: item.service_name,
            location: location,
            address: item.Address,
            avatar: "avatar",
            cover: "cover",
            video: "video",
            description: "description",
            workingHours: "workingHours",
            categoryID: categoryID,
            token: null,
        });
       }catch(err){
        console.log(err);
       }
    }    
})