const app = require('express');
const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
// let  payloadChecker = require('payload-validator');

Router.get("/",(req,res) => {
    dbConnection.query("SELECT * FROM dms_victims",(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})
Router.post("/",function (req,res){
    
    const validaition = new Validator(req.body, {
        victim_pin: 'required',
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        age: 'required|integer|minLength:1',
        marital_status: 'required',
        family_members: 'required|integer',
        primary_phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        is_employed: 'required',
        ikiciro_ubudehe: 'required',
        isibo: 'required',
        village_id: 'required',
        cell_id: 'required',
        sector_id: 'required',
        district_id: 'required',
        province_id: 'required'
    });


    validaition.check().then((matched)=>{
        if(!matched) { 
            res.status(422).send(validaition.errors);
        }
        else if(matched){
            let inserts =[
                req.body.victim_pin, 
                req.body.first_name,
                req.body.last_name, 
                req.body.gender,
                req.body.age,
                req.body.marital_status,
                req.body.profile_picture, 
                req.body.family_members, 
                req.body.primary_phone_number,
                req.body.secondary_phone_number,
                req.body.national_id,
                req.body.is_employed,
                req.body.ikiciro_ubudehe,
                req.body.isibo,
                req.body.village_id,
                req.body.cell_id,
                req.body.sector_id,
                req.body.district_id, 
                req.body.province_id
            ]
        
            let sql = "INSERT INTO dms_victims(victim_pin, first_name, last_name, gender, age, marital_status, profile_picture, family_members, primary_phone_number, secondary_phone_number, national_id, is_employed, ikiciro_ubudehe, isibo, village_id, cell_id, sector_id, district_id, province_id) VALUES (?);";
            dbConnection.query(sql,[inserts], (err, results) => {
                if (err) {
                    throw err;
                }
                else{
                    console.log(results)
                    // results.send("row inserted");
                    return res.status(201).send(results)
                    // console.log("Row inserted: "+ results.affectedRows);
                }
              });
        }

    })
})
Router.put("/",(req,res) => {
    // const validaition = new Validator(req,body, {
    //     victim_pin: 'required',
    //     first_name: 'required' ,
    //     last_name: 'required',
    //     gender: 'required',
    //     age: 'required',
    //     marital_status: 'required',
    //     family_members: 'required',
    //     primary_phone_number: 'required',
    //     national_id: 'required',
    //     is_employed: 'required',
    //     ikiciro_ubudehe: 'required',
    //     isibo: 'required',
    //     village_id: 'required',
    //     cell_id: 'required',
    //     sector_id: 'required',
    //     district_id: 'required',
    //     province_id: 'required'
    // });
    // validaition.check().then((matched)=>{
    //     if(!matched) { 
    //         res.status(422).send(validaition.errors);
    //     }
    // })
    let inserts =[
	    req.body.victim_pin, 
	    req.body.first_name,
        req.body.last_name, 
	    req.body.gender,
	    req.body.age,
	    req.body.marital_status,
	    req.body.profile_picture, 
	    req.body.family_members, 
	    req.body.primary_phone_number,
	    req.body.secondary_phone_number,
	    req.body.national_id,
	    req.body.is_employed,
	    req.body.ikiciro_ubudehe,
	    req.body.isibo,
	    req.body.village_id,
        req.body.cell_id,
	    req.body.sector_id,
	    req.body.district_id, 
        req.body.province_id
    ]


    let sql = "INSERT INTO dms_victims(victim_pin, first_name, last_name, gender, age, marital_status, profile_picture, family_members, primary_phone_number, secondary_phone_number, national_id, is_employed, ikiciro_ubudehe, isibo, village_id, cell_id, sector_id, district_id, province_id) VALUES (?);";
    dbConnection.query(sql,[inserts], (err, results) => {
        if (err) throw err;
       
        return res.status(201).json({results})
        console.log("Row inserted: "+ results.affectedRows);
      });
})
module.exports = Router;
