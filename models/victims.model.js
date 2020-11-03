module.exports = (sequelize, Sequelize) => {
    const Victim = sequelize.define("dms_victims", {
      victim_pin: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.BOOLEAN
      },
      gender: {
        type: Sequelize.STRING 
      },
      age: {
        type: Sequelize.INTEGER
      },
      marital_status: {
        type: Sequelize.STRING
      },
      profile_picture: {
        type: Sequelize.STRING
      },
      family_members: {
        type: Sequelize.STRING
      },
      primary_phone_number: {
        type: Sequelize.INTEGER
      },
      secondary_phone_number: {
        type: Sequelize.INTEGER
      },
      national_id: {
        type: Sequelize.INTEGER
      },
      is_employed: {
        type: Sequelize.STRING
      },
      ikiciro_ubudehe: {
        type: Sequelize.STRING
      },
      isibo: {
        type : Sequelize.STRING
      },
      village_id: {
        type: Sequelize.STRING
      },
      cell_id: {
        type: Sequelize.STRING
      },
      sector_id: {
        type: Sequelize.STRING
      },
      district_id: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
  };