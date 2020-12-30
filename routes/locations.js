const { query } = require('express');
const app = require('express');
const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');

/**
 * @swagger
 * definitions:
 *   provinces:
 *     required:          
 *       - province_id
 *       - province_name
 *     properties:
 *       province_id:
 *         type: string
 *       province_name:
 *         type: string
 */ 

/**
 * @swagger
 * definitions:
 *   districts:
 *     required:          
 *       - district_id
 *       - district_name
 *     properties:
 *       district_id:
 *         type: string
 *       district_name:
 *         type: string
 */ 

 /**
 * @swagger
 * definitions:
 *   sectors:
 *     required:          
 *       - sector_id
 *       - sector_name
 *     properties:
 *       sector_id:
 *         type: string
 *       sector_name:
 *         type: string
 */ 

 
 /**
 * @swagger
 * definitions:
 *   villages:
 *     required:          
 *       - village_id
 *       - village_name
 *     properties:
 *       village_id:
 *         type: string
 *       village_name:
 *         type: string
 */ 

/**
 * @swagger
 * definitions:
 *   cells:
 *     required:          
 *       - cell_id
 *       - cell_name
 *     properties:
 *       cell_id:
 *         type: string
 *       cell_name:
 *         type: string
 */ 

Router.get('/getProvinces/',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_provinces",(err,rows,fields)=>{
        if(!err){
            
            
            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({success:true, data: rows })
            }

        }
        else{
            throw err;
        }
    })
})
 /**
 * @swagger
 * /api/v1/locations/getProvinces/:
 *   get:
 *     tags:
 *       - locations
 *     description: Get all locations
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getProvincesById/:province_id',(req,res)=>{
    const validation = new Validator(req.body, {
        province_id: 'required'
    });

    if(!validation){
        return res.status(422).send(validation.errors);
    }
    let province_id = req.params.province_id;
    if(!province_id){
        return res.status(400).send({success: false, message: "bad request"});
    }
    dbConnection.query("SELECT * FROM dms_provinces WHERE province_id = ?",[province_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })
        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({success: false,message: 'province not found'})
            }
            else{
                 return res.status(200).send({success: true, data: rows[0] })
            }

            // return res.status
        }

    })
})
 /**
 * @swagger
 * /api/v1/locations/getProvincesById/{province_id}:
 *   get:
 *     tags:
 *       - locations
 *     description: Get a province by id
 *     parameters:
 *      - name: "province_id"
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
// Router.post('/uploadHighRiskZonesImages'/(req,res) =>{

// })
Router.get('/getDistricts/',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_districts",(err,rows,fields)=>{
        if(!err){
            // res.send(rows);
            
            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({success: true, data: rows })
            }

        }
        else{
            throw err;
        }
    })
})
/**
 * @swagger
 * /api/v1/locations/getDistricts/:
 *   get:
 *     tags:
 *       - locations
 *     description: Get all districts
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getDistrictById/:district_id',(req,res)=>{
    let district_id = req.params.district_id;
    dbConnection.query("SELECT * FROM dms_districts WHERE district_id = ?",[district_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })
        }
        else if(!error) {
             console.log(rows.length);
             console.log(district_id);
            if(rows.length === 0){

                return res.status(404).send({success: false,message: 'district not found'})
                
            }
            else{
                 return res.status(200).send({success:true, data: rows[0] })
            }

            // return res.status
        }

    })
})
 /**
 * @swagger
 * /api/v1/locations/getDistrictById/{district_id}:
 *   get:
 *     tags:
 *       - locations
 *     description: Get a district by id
 *     parameters:
 *      - name: "district_id"
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getDistrictsByProvince/:province_id',(req,res)=>{
    let province_id = req.params.province_id;
    dbConnection.query("SELECT * FROM dms_districts WHERE province_id = ?",[province_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'No districts with that province id not found'})
                
            }
            else{
                 return res.status(200).send({success:true, data: rows })
            }

            // return res.status
        }

    })
})
/**
 * @swagger
 * /api/v1/locations/getDistrictsByProvince/{province_id}:
 *   get:
 *     tags:
 *       - locations
 *     description: Get a province by id
 *     parameters:
 *      - name: "province_id"
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getSectors',(req,res) => {
    dbConnection.query("SELECT * FROM dms_sectors",(err,rows,fields)=>{
        if(!err){
           
            
            if(rows.length === 0){

                return res.status(404).send({success: false , message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({success: true, data: rows })
            }

        }
        else{
            throw err;
        }
    })
})
/**
 * @swagger
 * /api/v1/locations/getSectors/:
 *   get:
 *     tags:
 *       - locations
 *     description: Get all sectors
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getSectorById/:sector_id',(req,res)=>{
    let sector_id = req.params.sector_id;
    dbConnection.query("SELECT * FROM dms_sectors WHERE sector_id = ?",[sector_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'sector not found'})
                
            }
            else{
                 return res.status(200).send({success: true, data: rows[0] })
            }

            // return res.status
        }

    })
})
/**
 * @swagger
 * /api/v1/locations/getSectorById/{sector_id}:
 *   get:
 *     tags:
 *       - locations
 *     description: Get a sector by id
 *     parameters:
 *      - name: "sector_id"
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getSectorsByDistricts/:district_id',(req,res)=>{
    let district_id = req.params.district_id;
    dbConnection.query("SELECT * FROM dms_sectors WHERE district_id = ?",[district_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({ success: false, message: 'No sectors with that district id not found'})
                
            }
            else{
                 return res.status(200).send({success: true, data: rows })
            }

            // return res.status
        }

    })
})
/**
 * @swagger
 * /api/v1/locations/getSectorsByDistricts/{district_id}:
 *   get:
 *     tags:
 *       - locations
 *     description: Get a district by id
 *     parameters:
 *      - name: "district_id"
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getCells',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_cells",(err,rows,fields)=>{
        if(!err){
           
            
            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({success: true, data: rows})
            }

        }
        else{
            throw err;
        }
    })
})
/**
 * @swagger
 * /api/v1/locations/getCells/:
 *   get:
 *     tags:
 *       - locations
 *     description: Get all cells
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getCellById/:cell_id',(req,res)=>{
    let cell_id = req.params.cell_id;
    dbConnection.query("SELECT * FROM dms_cells WHERE cell_id = ?",[cell_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {
             console.log(rows.length);

            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'cell not found'})
                
            }
            else{
                 return res.status(200).send({success: true, data: rows[0] })
            }

            // return res.status
        }

    })
})
/**
* @swagger
* /api/v1/locations/getCellById/{cell_id}:
*   get:
*     tags:
*       - locations
*     description: Get a cell by id
*     parameters:
*      - name: "cell_id"
*        in: path
*        required: true
*     responses:
*       200:
*         description: OK
*       404:
*         description: Not found
*       500:
*         description: Internal Server error
*/
Router.get('/getCellsBySectors/:sector_id',(req,res)=>{
    let sector_id = req.params.sector_id;
    dbConnection.query("SELECT * FROM dms_cells WHERE sector_id = ?",[sector_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({success:false, message: 'No cells with that sector id not found'})
                
            }
            else{
                 return res.status(200).send({success: true, data: rows })
            }

            // return res.status
        }

    })
})
/**
* @swagger
* /api/v1/locations/getCellsBySectors/{sector_id}:
*   get:
*     tags:
*       - locations
*     description: Get a sector by id
*     parameters:
*      - name: "sector_id"
*        in: path
*        required: true
*     responses:
*       200:
*         description: OK
*       404:
*         description: Not found
*       500:
*         description: Internal Server error
*/
Router.get('/getVillages',(req,res) => {
    dbConnection.query("SELECT * FROM dms_villages LIMIT 10",(err,rows,fields)=>{
        try {
            if(!err){
        
            
                if(rows.length === 0){
    
                    return res.status(404).send({success: false, message: 'No records found in the found'})
                }
                else{
                     return res.status(200).send({success: true,data: rows })
                }
    
            }
            else{
                throw err;
            }
        } catch (error) {
            return res.status(500).send({success: false, data: "internal server error"});
        }

    })
})
/**
 * @swagger
 * /api/v1/locations/getVillages/:
 *   get:
 *     tags:
 *       - locations
 *     description: Get all villages
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
Router.get('/getVillageById/:village_id',(req,res)=>{
    try {
        let village_id = req.params.village_id;
        dbConnection.query("SELECT * FROM dms_villages WHERE village_id = ?",[village_id],(error,rows,fields)=>{
            if(error){
                return res.status(400).send({ data: rows[0], message: 'Bad request' })
    
            }
            else if(!error) {
                 console.log(rows.length);
    
                if(rows.length === 0){
    
                    return res.status(404).send({success: false, message: 'village not found'})
                    
                }
                else{
                     return res.status(200).send({success: true, data: rows[0] })
                }
    
                // return res.status
            }
    
        })
    }

    catch (error) {
        return res.send({success:false, data: "internal server error"})
    }
})
/**
* @swagger
* /api/v1/locations/getVillageById/{village_id}:
*   get:
*     tags:
*       - locations
*     description: Get a village by id
*     parameters:
*      - name: "village_id"
*        in: path
*        required: true
*     responses:
*       200:
*         description: OK
*       404:
*         description: Not found
*       500:
*         description: Internal Server error
*/
Router.get('/getVillagesByCells/:cell_id',(req,res)=>{
    let cell_id = req.params.cell_id;
    dbConnection.query("SELECT * FROM dms_villages WHERE cell_id = ?",[cell_id],(error,rows,fields)=>{
        if(error){
            return res.status(400).send({ data: rows[0], message: 'Bad request' })

        }
        else if(!error) {;

            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'No villages with that cell id not found'})
                
            }
            else{
                 return res.status(200).send({success: true, data: rows })
            }

            // return res.status
        }

    })
})
/**
* @swagger
* /api/v1/locations/getVillagesByCells/{cell_id}:
*   get:
*     tags:
*       - locations
*     description: Get a all villages  by cell id
*     parameters:
*      - name: "cell_id"
*        in: path
*        required: true
*     responses:
*       200:
*         description: OK
*       404:
*         description: Not found
*       500:
*         description: Internal Server error
*/

Router.get('/getAllLocations/',(req,res)=>{
    dbConnection.query("SELECT * FROM dms_provinces JOIN dms_districts ON (dms_districts.province_id = dms_provinces.province_id) JOIN dms_sectors ON (dms_sectors.district_id = dms_districts.district_id) JOIN dms_cells ON (dms_cells.sector_id = dms_sectors.sector_id) JOIN dms_villages ON (dms_villages.cell_id = dms_cells.cell_id)",(err,rows,fields)=>{
        if(!err){
            
            
            if(rows.length === 0){

                return res.status(404).send({success: false, message: 'No records found in the found'})
            }
            else{
                 return res.status(200).send({success:true, data: rows })
            }

        }
        else{
            throw err;
        }
    })
})
 /**
 * @swagger
 * /api/v1/locations/getAllLocations/:
 *   get:
 *     tags:
 *       - locations
 *     description: Get all locations
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
module.exports = Router;