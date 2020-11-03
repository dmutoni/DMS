const { query } = require('express');
const app = require('express');
const Router = app.Router();
const dbConnection = require('../config/db.config');

Router.get('/getProvinces/',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_provinces",(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
            if(rows.length === 0){

                return res.status(404).send({message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

        }
        else{
            throw err;
        }
    })
})
Router.get('/getProvincesById/:province_id',(req,res)=>{
    let province_id = req.params.province_id;
    dbConnection.query("SELECT * FROM dms_provinces WHERE province_id = ?",[province_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({message: 'province not found'})
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

            // return res.status
        }

    })
})
Router.get('/getDistricts/',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_districts",(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
            if(rows.length === 0){

                return res.status(404).send({message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

        }
        else{
            throw err;
        }
    })
})
Router.get('/getDistrictById/:district_id',(req,res)=>{
    let district_id = req.params.district_id;
    dbConnection.query("SELECT * FROM dms_districts WHERE district_id = ?",[district_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({message: 'district not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

            // return res.status
        }

    })
})
Router.get('/getDistrictsByProvince/:province_id',(req,res)=>{
    let province_id = req.params.province_id;
    dbConnection.query("SELECT * FROM dms_districts WHERE province_id = ?",[province_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({message: 'No districts with that province id not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows })
            }

            // return res.status
        }

    })
})
Router.get('/getSectors',(req,res) => {
    dbConnection.query("SELECT * FROM dms_sectors",(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
            if(rows.length === 0){

                return res.status(404).send({message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

        }
        else{
            throw err;
        }
    })
})
Router.get('/getSectorById/:sector_id',(req,res)=>{
    let sector_id = req.params.sector_id;
    dbConnection.query("SELECT * FROM dms_sectors WHERE sector_id = ?",[sector_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({message: 'sector not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

            // return res.status
        }

    })
})
Router.get('/getSectorsByDistricts/:district_id',(req,res)=>{
    let district_id = req.params.district_id;
    dbConnection.query("SELECT * FROM dms_sectors WHERE district_id = ?",[district_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({message: 'No sectors with that district id not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows })
            }

            // return res.status
        }

    })
})
Router.get('/getCells',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_cells",(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
            if(rows.length === 0){

                return res.status(404).send({message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

        }
        else{
            throw err;
        }
    })
})
Router.get('/getCellById/:cell_id',(req,res)=>{
    let cell_id = req.params.cell_id;
    dbConnection.query("SELECT * FROM dms_cells WHERE cell_id = ?",[cell_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({message: 'cell not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

            // return res.status
        }

    })
})
Router.get('/getCellsBySectors/:sector_id',(req,res)=>{
    let sector_id = req.params.sector_id;
    dbConnection.query("SELECT * FROM dms_cells WHERE sector_id = ?",[sector_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({message: 'No cells with that sector id not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows })
            }

            // return res.status
        }

    })
})
Router.get('/getVillages',(req,res) => {
    dbConnection.query("SELECT * FROM dms_villages",(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
            if(rows.length === 0){

                return res.status(404).send({message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

        }
        else{
            throw err;
        }
    })
})
Router.get('/getVillageById/:village_id',(req,res)=>{
    let village_id = req.params.village_id;
    dbConnection.query("SELECT * FROM dms_villages WHERE village_id = ?",[village_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({message: 'village not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows[0] })
            }

            // return res.status
        }

    })
})
Router.get('/getVillagesByCells/:cell_id',(req,res)=>{
    let cell_id = req.params.cell_id;
    dbConnection.query("SELECT * FROM dms_cells WHERE cell_id = ?",[cell_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({message: 'No villages with that cell id not found'})
                
            }
            else{
                 return res.status(200).send({ data: rows })
            }

            // return res.status
        }

    })
})
module.exports = Router;